import Image from 'next/image'
import { Inter } from 'next/font/google'
import bowcard_logo from '../public/bowcards-logo.png'
const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react';
import textbox_styles from 'styles/TextBox.module.css';
import axios from 'axios';

const sendDataToServer = async () => {
    const dataToSend = { key: 'value' };

    try {
        const response = await axios.post('/api/myEndpoint', dataToSend);
        const dataFromServer = response.data;
        // Use the dataFromServer received from the API
        console.log('Data from server:', dataFromServer);
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
};




export default function Home() {
  return (
      <main
          className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <Image
            src={bowcard_logo}
            alt="BowCards Logo"
            width={600}
            height={200}
        />
          <div>
              <CodeBox />
          </div>
      </main>
  );
}

function CodeBox() {
    const [code, setCode] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const doesCodeExist = checkCode(`${code}`)
        if (doesCodeExist == true) {
            alert("Your code was found in the database.")
        } else {
            alert("Your code was not found in the database.")
        }
    }
    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label>Enter code: </label>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={textbox_styles.textBox}
            />
            <input type="submit" value="Submit" className="centered-input" style={{ alignSelf: "center" }} />
        </form>
    )

}

