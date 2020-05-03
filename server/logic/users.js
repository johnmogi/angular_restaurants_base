const dal = require("../database/dal");

// "userID": 1,
// "userName": "johnmogi",
// "password": "1234",
// "role": "Admin"

async function getAllUsersAsync() {
  const sql = `SELECT userName,role FROM users`;
  const users = await dal.executeAsync(sql);
  return users;
}
async function getOneUserAsync(id) {
    const sql = `SELECT userName,role FROM users where userID = ${id}`;
    const user = await dal.executeAsync(sql);
    return user;
  }
  async function loginUserAsync(user) {
    const sql = `SELECT userName, role FROM users WHERE userName = '${user.userName}' AND password = '${user.password}'`;
    const userInfo = await dal.executeAsync(sql);
    return userInfo;
  }

module.exports = {
  getAllUsersAsync,
  getOneUserAsync,
  loginUserAsync

}