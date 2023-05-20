import { Client } from 'pg';

async function checkCode(code) {
    const dbURL = process.env.BOWCARDS_POSTGRES_URL
    const client = new Client({
        connectionString: dbURL,
    });

    try {
        if (code.length !== 16) {
            return false;
        }
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
