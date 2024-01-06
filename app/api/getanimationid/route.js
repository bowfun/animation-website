import { Client } from 'pg';

async function getAnimationID(code) {
    const dbURL = process.env.BOWCARDS_POSTGRES_URL
    const client = new Client({
        connectionString: dbURL,
    });

    try {
        await client.connect();
        const query = 'SELECT code, animation_id FROM general_data WHERE code = $1';
        const values = [code];
        const { rows } = await client.query(query, values);

        if (rows.length > 0) {
            return rows[0].animation_id;
        }

        return null; // Return null if the code doesn't exist
    } finally {
        await client.end();
    }
}


export default async function myEndpointHandler(req, res) {
    const { key } = req.body;
    const animationIDsend = await getAnimationID(req.body.code);
    const dataToSend = { animation_id: animationIDsend };

    // Send back the data to the client
    res.status(200).json(dataToSend);
}