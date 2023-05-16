import postgres from 'postgres'
import dbconfig from 'dbconfig.json';

const sql = postgres({url: dbconfig.url});
export default sql
