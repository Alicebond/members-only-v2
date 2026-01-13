const pool = require("./pool");

async function addNewUser(userInfo) {
  await pool.query(
    `
    INSERT INTO users(first_name, last_name, email, password, is_member) VALUES ($1, $2, $3, $4, $5)
    `,
    [
      userInfo.firstname,
      userInfo.lastname,
      userInfo.email,
      userInfo.password,
      userInfo.member,
    ]
  );
}

async function getAllMsg() {
  const { rows } = await pool.query(`SELECT * FROM message`);
  return rows[0];
}

async function getAllData() {
  const { rows } = await pool.query(
    `SELECT message.title, message.content, message.timestamp, users.full_name
    FROM message, users WHERE message.user_id = users.id
    ORDER BY message.timestamp DESC;`
  );

  return rows;
}

async function getAllUser() {
  const { rows } = await pool.query(`SELECT * FROM users`);
  return rows[0];
}

async function addNewMsg({ title, msg, userId }) {
  await pool.query(
    `INSERT INTO message(title, content, user_id) 
    VALUES ($1, $2, $3)`,
    [title, msg, userId]
  );
}

async function getMsger(id) {
  const { row } = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [id]
  );

  return row[0];
}

module.exports = {
  addNewUser,
  addNewMsg,
  getAllMsg,
  getAllUser,
  getAllData,
  getMsger,
};
