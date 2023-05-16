import { sql } from "./_database"

async function checkCode(code) {
    const allCodes = await sql `SELECT code FROM general_data`
    if (allCodes.contains(code)) {
        return true
    } else {
        return false
    }
}
export default function myEndpointHandler(req, res) {
    const { key } = req.body;
    // Process the received data server-side

    const dataToSend = { message: 'Data processed on the server' };
    // Send back the data to the client
    res.status(200).json(dataToSend);
}
