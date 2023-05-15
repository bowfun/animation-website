import Image from 'next/image'
import { Inter } from 'next/font/google'
import bowcard_logo from '../public/bowcards-logo.png'
const inter = Inter({ subsets: ['latin'] })
import { checkCode } from './_database.js'
import { useState } from 'react';


export default function Home() {
  return (
      <main
          className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <Image
            src={bowcard_logo}
            alt="BowCards Logo"
            width={300}
            height={100}
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
        alert(`The code you entered was: ${code}`)
        checkCode(`${code}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Enter code: </label>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <input type="submit" />
        </form>
    )
}

