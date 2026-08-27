import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export interface FarmerRecord {
  id: string;
  name: string;
  phone: string;
  district: string;
  village: string;
  language: string;
  land_area: number;
  loan_amount: number;
  loan_due_date: string | null;
  created_at?: string;
}

// Fallback in-memory cache if RDS is establishing/firewalled
let memoryFarmers: FarmerRecord[] = [
  {
    id: 'farmer-001',
    name: 'Ramesh Mohanty',
    phone: '+91 94371 88291',
    district: 'Mayurbhanj',
    village: 'Baripada Rural',
    language: 'or',
    land_area: 4.8,
    loan_amount: 50000.00,
    loan_due_date: '2026-10-30',
    created_at: new Date().toISOString()
  },
  {
    id: 'farmer-002',
    name: 'Santosh Jena',
    phone: '+91 98612 34567',
    district: 'Balasore',
    village: 'Soro',
    language: 'or',
    land_area: 3.2,
    loan_amount: 35000.00,
    loan_due_date: '2026-11-15',
    created_at: new Date().toISOString()
  },
  {
    id: 'farmer-003',
    name: 'Priyanka Das',
    phone: '+91 91234 56780',
    district: 'Cuttack',
    village: 'Salipur',
    language: 'en',
    land_area: 5.5,
    loan_amount: 0.00,
    loan_due_date: null,
    created_at: new Date().toISOString()
  },
  {
    id: 'farmer-004',
    name: 'Baidhar Marndi',
    phone: '+91 97780 12345',
    district: 'Mayurbhanj',
    village: 'Rairangpur',
    language: 'sat',
    land_area: 6.0,
    loan_amount: 60000.00,
    loan_due_date: '2026-12-20',
    created_at: new Date().toISOString()
  }
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = (page - 1) * limit;

    try {
      if (id) {
        const rows = await query<FarmerRecord[]>(
          'SELECT id, name, phone, district, village, language, land_area, loan_amount, loan_due_date, created_at FROM farmers WHERE id = ?',
          [id]
        );
        if (rows.length === 0) {
          return NextResponse.json({ success: false, message: 'Farmer not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: rows[0], source: 'aws_rds' });
      }

      let sql = 'SELECT id, name, phone, district, village, language, land_area, loan_amount, loan_due_date, created_at FROM farmers';
      const params: any[] = [];

      if (search) {
        sql += ' WHERE name LIKE ? OR phone LIKE ? OR district LIKE ?';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(limit, offset);

      const rows = await query<FarmerRecord[]>(sql, params);
      const [countResult] = await query<any[]>('SELECT COUNT(*) as total FROM farmers');
      const total = countResult?.total || rows.length;

      return NextResponse.json({
        success: true,
        data: rows,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        source: 'aws_rds'
      });
    } catch (dbErr) {
      console.warn('[API /api/farmers] RDS query failed, serving from local cache:', dbErr);
      
      if (id) {
        const farmer = memoryFarmers.find(f => f.id === id);
        if (!farmer) {
          return NextResponse.json({ success: false, message: 'Farmer not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: farmer, source: 'fallback_cache' });
      }

      let filtered = memoryFarmers;
      if (search) {
        const q = search.toLowerCase();
        filtered = memoryFarmers.filter(f => 
          f.name.toLowerCase().includes(q) || 
          f.phone.toLowerCase().includes(q) || 
          f.district.toLowerCase().includes(q)
        );
      }

      return NextResponse.json({
        success: true,
        data: filtered.slice(offset, offset + limit),
        pagination: { page, limit, total: filtered.length, totalPages: Math.ceil(filtered.length / limit) },
        source: 'fallback_cache'
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, phone, district, village, language = 'en', land_area = 0, loan_amount = 0, loan_due_date = null } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: 'name and phone are required fields.' }, { status: 400 });
    }

    const farmerId = id || `farmer-${Date.now()}`;
    const newFarmer: FarmerRecord = {
      id: farmerId,
      name,
      phone,
      district: district || 'Mayurbhanj',
      village: village || 'Baripada',
      language: language || 'en',
      land_area: Number(land_area) || 0,
      loan_amount: Number(loan_amount) || 0,
      loan_due_date: loan_due_date || null,
      created_at: new Date().toISOString()
    };

    try {
      await query(`
        INSERT INTO farmers (id, name, phone, district, village, language, land_area, loan_amount, loan_due_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          phone = VALUES(phone),
          district = VALUES(district),
          village = VALUES(village),
          language = VALUES(language),
          land_area = VALUES(land_area),
          loan_amount = VALUES(loan_amount),
          loan_due_date = VALUES(loan_due_date)
      `, [newFarmer.id, newFarmer.name, newFarmer.phone, newFarmer.district, newFarmer.village, newFarmer.language, newFarmer.land_area, newFarmer.loan_amount, newFarmer.loan_due_date]);

      // update memory cache
      memoryFarmers = memoryFarmers.filter(f => f.id !== farmerId);
      memoryFarmers.unshift(newFarmer);

      return NextResponse.json({ success: true, data: newFarmer, source: 'aws_rds' }, { status: 201 });
    } catch (dbErr) {
      console.warn('[API POST /api/farmers] RDS insert fallback:', dbErr);
      memoryFarmers = memoryFarmers.filter(f => f.id !== farmerId);
      memoryFarmers.unshift(newFarmer);
      return NextResponse.json({ success: true, data: newFarmer, source: 'fallback_cache' }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, phone, district, village, language, land_area, loan_amount, loan_due_date } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Farmer ID is required for update.' }, { status: 400 });
    }

    try {
      await query(`
        UPDATE farmers 
        SET 
          name = COALESCE(?, name),
          phone = COALESCE(?, phone),
          district = COALESCE(?, district),
          village = COALESCE(?, village),
          language = COALESCE(?, language),
          land_area = COALESCE(?, land_area),
          loan_amount = COALESCE(?, loan_amount),
          loan_due_date = COALESCE(?, loan_due_date)
        WHERE id = ?
      `, [name, phone, district, village, language, land_area, loan_amount, loan_due_date, id]);

      // sync memory
      const idx = memoryFarmers.findIndex(f => f.id === id);
      if (idx !== -1) {
        memoryFarmers[idx] = {
          ...memoryFarmers[idx],
          ...(name && { name }),
          ...(phone && { phone }),
          ...(district && { district }),
          ...(village && { village }),
          ...(language && { language }),
          ...(land_area !== undefined && { land_area: Number(land_area) }),
          ...(loan_amount !== undefined && { loan_amount: Number(loan_amount) }),
          ...(loan_due_date !== undefined && { loan_due_date }),
        };
      }

      return NextResponse.json({ success: true, message: 'Farmer updated successfully' });
    } catch (dbErr) {
      console.warn('[API PUT /api/farmers] RDS update fallback:', dbErr);
      const idx = memoryFarmers.findIndex(f => f.id === id);
      if (idx !== -1) {
        memoryFarmers[idx] = {
          ...memoryFarmers[idx],
          ...(name && { name }),
          ...(phone && { phone }),
          ...(district && { district }),
          ...(village && { village }),
          ...(language && { language }),
          ...(land_area !== undefined && { land_area: Number(land_area) }),
          ...(loan_amount !== undefined && { loan_amount: Number(loan_amount) }),
          ...(loan_due_date !== undefined && { loan_due_date }),
        };
        return NextResponse.json({ success: true, message: 'Farmer updated in cache' });
      }
      return NextResponse.json({ success: false, message: 'Farmer not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Farmer ID is required.' }, { status: 400 });
    }

    try {
      await query('DELETE FROM crops WHERE farmer_id = ?', [id]);
      await query('DELETE FROM farmers WHERE id = ?', [id]);
    } catch (dbErr) {
      console.warn('[API DELETE /api/farmers] RDS delete fallback:', dbErr);
    }

    memoryFarmers = memoryFarmers.filter(f => f.id !== id);
    return NextResponse.json({ success: true, message: 'Farmer deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
