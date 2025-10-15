#! usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
// Database was initialized

const SQL = `
CREATE TABLE users (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		first_name VARCHAR ( 255 ) ,
		last_name VARCHAR ( 255 ) ,
		full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || 		last_name) STORED,
		email VARCHAR ( 255 ) ,
		password VARCHAR ( 255 ) ,
		is_member BOOLEAN DEFAULT FALSE
	);

	CREATE TABLE message (
		id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		title TEXT,
		content TEXT,
		timestamp TIMESTAMP DEFAULT NOW(),
		user_id INTEGER,
		CONSTRAINT fk_user
			FOREIGN KEY (user_id) REFERENCES users(id)
			ON DELETE SET NULL
	)`;

async function main() {
  console.log("Initializing...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
