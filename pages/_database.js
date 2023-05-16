import postgres from 'postgres'
import dbconfig from 'dbconfig.json';

const sql = postgres({url: dbconfig.url})

export default sql

export async function checkCode(code) {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM `general_data`');
        connection.release();

        console.log(results);

        if (results.includes(code)) {
            console.log('Code found');
            return true;
        } else {
            console.log('No code found');
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

