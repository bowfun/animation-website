"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import logo from '../public/logo.png'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <Image
          src={bowcard_logo}
          alt="BowCards Logo"
          width={600}
          height={200}
      />
      <h1>SEIZURE WARNING: The animations can move very fast!</h1>
      <div>
        <CodeBox />
      </div>
    </main>
  );
}

function CodeBox() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const lowercaseCode = code.toLowerCase();
    const [codeExists, setCodeExists] = useState();
    try {
      useEffect(() => {
        fetch(`${window.location.origin}/api/checkcode`, {
          method: 'POST',
          body: JSON.stringify({ 'code': `${lowercaseCode}` }),
        })
        .then((res) => res.json())
        .then((res) => {
            setCodeExists(res.exists);
          });
        });
      } catch (e) {
        console.error(e);
      }
      // Use the dataFromServer received from the API
      if (codeExists) {
        router.push(`/view/${lowercaseCode}`);
      } else {
        alert("This code couldn't be found.");
      }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label>Enter a Code</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={`text-black border-2 border-gray-400 rounded-lg pl-7`}
      />
      <input type="submit" value="Submit" className="centered-input self-center p-2 rounded-xl bg-sky-400 border-4 border-sky-600" />
    </form>
  )
}
