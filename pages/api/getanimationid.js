// noinspection SpellCheckingInspection

import { Client } from 'pg';
import dbconfig from '../../dbconfig.json';

async function getAnimationID(code) {
    const client = new Client({
        connectionString: dbconfig.url,
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
    console.log(dataToSend)
    res.status(200).json(dataToSend);
}