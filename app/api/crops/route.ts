import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export interface CropRecord {
  id: string;
  farmer_id: string;
  name: string;
  stage: string;
  sowing_date: string | null;
}

let memoryCrops: CropRecord[] = [
  {
    id: 'crop-paddy-01',
    farmer_id: 'farmer-001',
    name: 'Paddy (Swarna)',
    stage: 'Vegetative - Tillering',
    sowing_date: '2026-06-10',
  },
  {
    id: 'crop-mustard-02',
    farmer_id: 'farmer-001',
    name: 'Mustard (Pusa Bold)',
    stage: 'Flowering & Pod Formation',
    sowing_date: '2026-07-01',
  },
  {
    id: 'crop-wheat-03',
    farmer_id: 'farmer-002',
    name: 'Wheat (HD-2967)',
    stage: 'Grain Filling',
    sowing_date: '2026-05-20',
  },
  {
    id: 'crop-groundnut-04',
    farmer_id: 'farmer-003',
    name: 'Groundnut (TG-37A)',
    stage: 'Pod Development',
    sowing_date: '2026-06-25',
  },
  {
    id: 'crop-tomato-05',
    farmer_id: 'farmer-004',
    name: 'Tomato (Hybrid Arka Rakshak)',
    stage: 'Fruiting & Harvesting',
    sowing_date: '2026-04-15',
  }
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const farmer_id = searchParams.get('farmer_id');
    const id = searchParams.get('id');

    try {
      if (id) {
        const rows = await query<CropRecord[]>(
          'SELECT id, farmer_id, name, stage, sowing_date FROM crops WHERE id = ?',
          [id]
        );
        if (rows.length === 0) {
          return NextResponse.json({ success: false, message: 'Crop not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: rows[0], source: 'aws_rds' });
      }

      if (farmer_id) {
        const rows = await query<CropRecord[]>(
          'SELECT id, farmer_id, name, stage, sowing_date FROM crops WHERE farmer_id = ? ORDER BY sowing_date DESC',
          [farmer_id]
        );
        return NextResponse.json({ success: true, data: rows, source: 'aws_rds' });
      }

      const rows = await query<CropRecord[]>('SELECT id, farmer_id, name, stage, sowing_date FROM crops');
      return NextResponse.json({ success: true, data: rows, source: 'aws_rds' });
    } catch (dbErr) {
      console.warn('[API /api/crops] RDS query fallback:', dbErr);

      if (id) {
        const crop = memoryCrops.find(c => c.id === id);
        if (!crop) {
          return NextResponse.json({ success: false, message: 'Crop not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: crop, source: 'fallback_cache' });
      }

      if (farmer_id) {
        const crops = memoryCrops.filter(c => c.farmer_id === farmer_id);
        return NextResponse.json({ success: true, data: crops, source: 'fallback_cache' });
      }

      return NextResponse.json({ success: true, data: memoryCrops, source: 'fallback_cache' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, farmer_id, name, stage = 'Sowing', sowing_date = null } = body;

    if (!farmer_id || !name) {
      return NextResponse.json({ success: false, message: 'farmer_id and name are required fields.' }, { status: 400 });
    }

    const cropId = id || `crop-${Date.now()}`;
    const newCrop: CropRecord = {
      id: cropId,
      farmer_id,
      name,
      stage,
      sowing_date
    };

    try {
      await query(`
        INSERT INTO crops (id, farmer_id, name, stage, sowing_date)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          farmer_id = VALUES(farmer_id),
          name = VALUES(name),
          stage = VALUES(stage),
          sowing_date = VALUES(sowing_date)
      `, [newCrop.id, newCrop.farmer_id, newCrop.name, newCrop.stage, newCrop.sowing_date]);

      memoryCrops = memoryCrops.filter(c => c.id !== cropId);
      memoryCrops.unshift(newCrop);

      return NextResponse.json({ success: true, data: newCrop, source: 'aws_rds' }, { status: 201 });
    } catch (dbErr) {
      console.warn('[API POST /api/crops] RDS insert fallback:', dbErr);
      memoryCrops = memoryCrops.filter(c => c.id !== cropId);
      memoryCrops.unshift(newCrop);
      return NextResponse.json({ success: true, data: newCrop, source: 'fallback_cache' }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, stage, sowing_date } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Crop ID is required for update.' }, { status: 400 });
    }

    try {
      await query(`
        UPDATE crops 
        SET 
          name = COALESCE(?, name),
          stage = COALESCE(?, stage),
          sowing_date = COALESCE(?, sowing_date)
        WHERE id = ?
      `, [name, stage, sowing_date, id]);

      const idx = memoryCrops.findIndex(c => c.id === id);
      if (idx !== -1) {
        memoryCrops[idx] = {
          ...memoryCrops[idx],
          ...(name && { name }),
          ...(stage && { stage }),
          ...(sowing_date !== undefined && { sowing_date })
        };
      }

      return NextResponse.json({ success: true, message: 'Crop updated successfully' });
    } catch (dbErr) {
      console.warn('[API PUT /api/crops] RDS update fallback:', dbErr);
      const idx = memoryCrops.findIndex(c => c.id === id);
      if (idx !== -1) {
        memoryCrops[idx] = {
          ...memoryCrops[idx],
          ...(name && { name }),
          ...(stage && { stage }),
          ...(sowing_date !== undefined && { sowing_date })
        };
        return NextResponse.json({ success: true, message: 'Crop updated in cache' });
      }
      return NextResponse.json({ success: false, message: 'Crop not found' }, { status: 404 });
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
      return NextResponse.json({ success: false, message: 'Crop ID is required.' }, { status: 400 });
    }

    try {
      await query('DELETE FROM crops WHERE id = ?', [id]);
    } catch (dbErr) {
      console.warn('[API DELETE /api/crops] RDS delete fallback:', dbErr);
    }

    memoryCrops = memoryCrops.filter(c => c.id !== id);
    return NextResponse.json({ success: true, message: 'Crop deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
