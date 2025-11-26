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

module.exports = {
  addNewUser,
};
