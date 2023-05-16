import { sql } from "./_database"

async function checkCode(code) {
    const allCodes = await sql `SELECT code FROM general_data`
    if (allCodes.contains(code)) {
        return true
    } else {
        return false
    }
}