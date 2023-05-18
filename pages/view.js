import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] });

import id_0 from '../public/animations/id_0.gif';
import id_1 from '../public/animations/id_1.gif';
import id_2 from '../public/animations/id_2.gif';
import id_3 from '../public/animations/id_3.gif';

export default function ViewSite() {
    const router = useRouter();
    const { code } = router.query;
    const [animationId, setAnimationId] = useState(null);
    useEffect(() => {
        if (!code) {
            return;
        }
        const fetchData = async () => {
            const dataToSend = { code: `${code}` };
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/getanimationid',
                    dataToSend
                );
                const dataFromServer = response.data;
                if (dataFromServer && dataFromServer.animation_id !== null) {
                    setAnimationId(dataFromServer.animation_id);
                } else {
                    alert('Code provided was invalid, try entering it manually via the main website.');
                }
            } catch (error) {
                console.error('Error sending data to server:', error);
                alert('There was an error, please try again later.');
            }
        };
        fetchData();
    }, [router, code]);

    const getAnimationSource = () => {
        if (animationId === 0) {
            return id_0;
        } else if (animationId === 1) {
            return id_1;
        } else if (animationId === 2) {
            return id_2;
        } else if (animationId === 3) {
            return id_3;
        }
        return null;
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            {animationId !== null && (
                <Image
                    src={getAnimationSource()}
                    alt="Custom Animation"
                    width={300}
                    height={125}
                />
            )}
        </main>
    );
}
