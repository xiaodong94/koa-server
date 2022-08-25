const ssh2mysql = require("ssh2-connect-mysql");
const fs = require("fs");
const ssh_conf = {
  host: process.env.DB_SSH_HOST,
  port: 22,
  username: process.env.DB_SSH_USER,
  privateKey: fs.readFileSync("././XXX.cer"),
};
const db_conf = {
  host: "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
let query = function (sqlVal: string) {
  return new Promise((resolve, reject) => {
    ssh2mysql.connect(ssh_conf, db_conf).then((sql: any) => {
      sql.query(sqlVal, (err: any, rows: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        ssh2mysql.close();
      });
    });
  });
};

async function getData(sql: string) {
  let data = await query(sql);
  return data;
}

export default getData;
