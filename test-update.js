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

async function updateDb() {
  try {
    const connection = await mysql.createConnection({
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    });
    
    // Get the first farmer
    const [farmers] = await connection.query(`SELECT id, name, land_area FROM farmers LIMIT 1`);
    if (farmers.length === 0) {
      console.log("No farmers found in the database.");
      return;
    }
    
    const farmer = farmers[0];
    const currentArea = parseFloat(farmer.land_area) || 0;
    
    // Toggle the area
    const newArea = currentArea === 2.50 ? 5.80 : 2.50;
    
    await connection.query(`UPDATE farmers SET land_area = ? WHERE id = ?`, [newArea, farmer.id]);
    
    console.log(`Successfully updated Farmer ${farmer.name} (ID: ${farmer.id}) land_area from ${currentArea} to ${newArea}.`);
    
    await connection.end();
  } catch (error) {
    console.error("Database update failed:", error.message);
  }
}

updateDb();
