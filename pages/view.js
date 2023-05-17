import React, { useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

import id_0 from '../public/animations/id_0.gif';
import id_1 from '../public/animations/id_1.gif';

export default function ViewSite() {
    const router = useRouter();
    const { query } = router;
    const { code } = query;
    let animation_id;
    let animation_name;
    const dataToSend = { code: `${code}` };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/getanimationid',
                    dataToSend
                );
                const dataFromServer = response.data;
                // Use the dataFromServer received from the API
                console.log(dataFromServer)
                if (dataFromServer != {animation_id: null}) {
                    animation_id = dataFromServer.animation_id;
                } else {
                    alert(
                        'Code provided was invalid, try entering it manually via the main website.'
                    );
                    return;
                }
            } catch (error) {
                console.error('Error sending data to server:', error);
                alert('There was an error, please try again later.');
                return;
            }
        };

        fetchData();
    }, []);

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <Image src={animation_id} alt="BowCards Logo" width={300} height={125} />
            <h1>{animation_name}</h1>
        </main>
    );
}
