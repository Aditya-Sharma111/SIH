import mysql, { Pool } from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: Pool | undefined;
}

const dbConfig = {
  host: process.env.DB_HOST || 'sih-mysql.cley86o8g8vx.eu-north-1.rds.amazonaws.com',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Suguda123',
  database: process.env.DB_NAME || 'sih',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  connectTimeout: 5000, // 5s timeout to prevent hanging
  ssl: {
    rejectUnauthorized: false
  }
};

export const pool: Pool = global._mysqlPool || mysql.createPool(dbConfig);

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = pool;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

/**
 * Initializes tables if they don't exist
 */
export async function initDatabase(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    try {
      // 1. Farmers table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS farmers (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(32) NOT NULL,
          district VARCHAR(100),
          village VARCHAR(100),
          language VARCHAR(50) DEFAULT 'en',
          land_area DECIMAL(10,2) DEFAULT 0.00,
          loan_amount DECIMAL(12,2) DEFAULT 0.00,
          loan_due_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 2. Crops table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS crops (
          id VARCHAR(64) PRIMARY KEY,
          farmer_id VARCHAR(64) NOT NULL,
          name VARCHAR(100) NOT NULL,
          stage VARCHAR(100) DEFAULT 'Sowing',
          sowing_date DATE,
          INDEX idx_farmer (farmer_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 3. User roles & authentication mapping table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(100) PRIMARY KEY,
          email VARCHAR(255),
          name VARCHAR(255),
          role VARCHAR(50) NOT NULL DEFAULT 'farmer',
          profile_id VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // 4. Bank loan / insurance applications
      await connection.query(`
        CREATE TABLE IF NOT EXISTS bank_applications (
          id VARCHAR(64) PRIMARY KEY,
          farmer_id VARCHAR(64),
          farmer_name VARCHAR(255),
          crop_name VARCHAR(100),
          loan_type VARCHAR(100) DEFAULT 'Kisan Credit Card (KCC)',
          amount DECIMAL(12,2) DEFAULT 0.00,
          status VARCHAR(50) DEFAULT 'Under Review',
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      return true;
    } finally {
      connection.release();
    }
  } catch (err: any) {
    console.warn('[Database] RDS Connection Notice:', err?.message || err);
    return false;
  }
}
