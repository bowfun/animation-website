import { Client } from 'pg';
import dbconfig from '../../dbconfig.json';

async function checkCode(code) {
    const client = new Client({
        connectionString: dbconfig.url,
    });

    try {
        await client.connect();

        const query = 'SELECT code FROM general_data';
        const { rows } = await client.query(query);

        if (rows.length > 0) {
            if (rows.find((row) => row.code === code)) {
                return true;
            }
        }

        return false;
    } finally {
        await client.end();
    }
}

export default async function myEndpointHandler(req, res) {
    const { key } = req.body;
    const codeExists = await checkCode(req.body.code);
    const dataToSend = { exists: codeExists };

    // Send back the data to the client
    res.status(200).json(dataToSend);
}
