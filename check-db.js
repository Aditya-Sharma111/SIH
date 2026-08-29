const mysql = require('mysql2/promise');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    env[key.trim()] = values.join('=').trim();
  }
});

async function checkDb() {
  try {
    const connection = await mysql.createConnection({
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    });
    
    console.log("Connected to RDS successfully.");
    
    const [tables] = await connection.query('SHOW TABLES');
    console.log("\nTables found:");
    
    for (const row of tables) {
      const tableName = Object.values(row)[0];
      console.log(`- ${tableName}`);
      
      const [columns] = await connection.query(`DESCRIBE ${tableName}`);
      for (const col of columns) {
        console.log(`  > ${col.Field} (${col.Type})`);
      }
    }
    
    await connection.end();
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

checkDb();
