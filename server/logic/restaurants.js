const dal = require("../database/dal");

async function getAllRestsAsync() {
  const sql = `SELECT * FROM rests`;
  const rests = await dal.executeAsync(sql);
  return rests;
}
async function getOneRestAsync(id) {
    const sql = `SELECT * FROM rests where restID = ${id}`;
    const rest = await dal.executeAsync(sql);
    return rest;
  }
  async function addOneRestAsync(rest) {
    const sql = `INSERT into rests (name) VALUES ( '${rest.name}')`;
    const info = await dal.executeAsync(sql);
    rest.id = info.insertId;
    return rest;
  }
  async function deleteOneRestAsync(id) {
    const sql = `DELETE FROM rests where restID = ${id}`;
   await dal.executeAsync(sql);
  }
  
  async function updateFullRestAsync(rest) {
    const sql = `UPDATE rests SET name = '${rest.name}'`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : rest;
  }

  
async function updatePartialRestAsync(rest) {
  let sql = "UPDATE rests SET ";
  if (rest.name) {
    sql += `name = '${rest.name}',`;
  }
 

  sql = sql.substr(0, sql.length - 1);
  sql += ` WHERE restID = ${rest.id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : rest;
}

// async function updatePartialVacAsync(vac) {
//   let sql = "UPDATE vacations SET ";
//   if (vac.description) {
//     sql += `description = '${vac.description}',`;
//   }
//   if (vac.destination) {
//     sql += `destination = '${vac.destination}',`;
//   }
//   if (vac.picFileName) {
//     sql += `picFileName = '${vac.picFileName}',`;
//   }
//   if (vac.startDate) {
//     sql += `startDate = '${vac.startDate}',`;
//   }
//   if (vac.endDate) {
//     sql += `endDate = '${vac.endDate}',`;
//   }
//   if (vac.price) {
//     sql += `price = '${vac.price}',`;
//   }

//   sql = sql.substr(0, sql.length - 1);
//   sql += ` WHERE ProductID = ${vac.id}`;
//   const info = await dal.executeAsync(sql);
//   return info.affectedRows === 0 ? null : vac;
// }


module.exports = {
  getAllRestsAsync,
  getOneRestAsync,
  addOneRestAsync,
  deleteOneRestAsync,
  updateFullRestAsync,
  updatePartialRestAsync
}