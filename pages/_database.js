// Code to connect to the database.
const mysql = require('mysql2');
import dbconfig from 'dbconfig.json'

const pool = mysql.createPool({
    host: dbconfig.hostip,
    user: dbconfig.username,
    password: dbconfig.password,
    database: dbconfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

const connection = pool.promise();

export function checkCode(code) {
    connection.query(
        'SELECT * FROM `general_data`',
        function(err, results) {
            console.log(results);
            if (results.includes(code)) {
                console.log("code found");
                return true;
            } else {
                console.log("no code found");
                return false;
            }
        }
    );
}
