import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import axios from 'axios';

import id_0 from '../public/animations/id_0.gif';
import id_1 from '../public/animations/id_1.gif';
import id_2 from '../public/animations/id_2.gif';
import id_3 from '../public/animations/id_3.gif';
import id_4 from '../public/animations/id_4.gif';

export default function ViewSite() {
    const router = useRouter();
    const { code } = router.query;
    const [animationId, setAnimationId] = useState(null);
    const [imageWidth, setImageWidth] = useState(300);
    const [imageHeight, setImageHeight] = useState(125);

    useEffect(() => {
        if (!code) {
            return;
        }
        const fetchData = async () => {
            const dataToSend = { code: `${code}` };
            try {
                const response = await axios.post(window.location.origin + '/api/getanimationid', dataToSend);
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

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth <= 480) {
                setImageWidth(200);
                setImageHeight(83);
            } else if (windowWidth <= 768) {
                setImageWidth(300);
                setImageHeight(125);
            } else {
                // For tablet or computer
                setImageWidth(400);
                setImageHeight(167);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial values based on the window width

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getAnimationSource = () => {
        if (animationId === 0) {
            return id_0;
        } else if (animationId === 1) {
            return id_1;
        } else if (animationId === 2) {
            return id_2;
        } else if (animationId === 3) {
            return id_3;
        } else if (animationId === 4) {
            return id_4;
        }
        return null;
    };

    const getAnimationName = () => {
        const name_0 = 'Spinning Color Wheel';
        const name_1 = 'Spinning Water Bottle';
        const name_2 = 'Skipping Rock';
        const name_3 = 'Tunnel of Colors';
        const name_4 = 'Windy Balloon';
        if (animationId === 0) {
            return name_0;
        } else if (animationId === 1) {
            return name_1;
        } else if (animationId === 2) {
            return name_2;
        } else if (animationId === 3) {
            return name_3;
        } else if (animationId === 4) {
            return name_4;
        }
        return null;
    };

    const getAnimationDesc = () => {
        const desc_0 = 'This is a spinning wheel of vibrant colors. It could symbolize a wheel or the top of a spinning umbrella.';
        const desc_1 = 'This is a spinning water bottle. Stay hydrated during the summer. It is symbolic for throwing a water bottle in the air and grabbing it.';
        const desc_2 = 'This is a skipping rock. The rock skips across the lake. It could be related to moving on.';
        const desc_3 = 'This is a tunnel of colors. It could represent going down a tube slide at a park or water park.';
        const desc_4 = 'This is a balloon blowing in the wind. It is attached to a fence post. It could represent going to a carnival.';
        if (animationId === 0) {
            return desc_0;
        } else if (animationId === 1) {
            return desc_1;
        } else if (animationId === 2) {
            return desc_2;
        } else if (animationId === 3) {
            return desc_3;
        } else if (animationId === 4) {
            return desc_4;
        }
        return null;
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-64`}
        >
            {animationId !== null && (
                <Image
                    src={getAnimationSource()}
                    alt="Custom Animation"
                    width={imageWidth}
                    height={imageHeight}
                />
            )}
            {animationId !== null && (
                <h1 style={{ fontSize: '24px' }}>{getAnimationName()}</h1>
            )}
            {animationId !== null && (
                <p style={{ fontSize: '18px' }}>{getAnimationDesc()}</p>
            )}
        </main>
    );
}
