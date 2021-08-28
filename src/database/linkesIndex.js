import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const client = new Pool({
    connectionString: process.env.PGURI,
    ssl: {
      rejectUnauthorized: false
    }
  });

client.on('connect', () => console.log('Pg Database connected successfully'));

client.on('error', (err) => console.log(`Error: ${err}`));

export default client;
