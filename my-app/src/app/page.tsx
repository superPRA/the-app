"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { loadEnvConfig } from  "@next/env"

export default function Home() {
  const [user, setUser] = useState('loading')
  useEffect(() => {
    const fetching = async ()=>{
      const res = await fetch('/api')
      const data = await res.json()
      setUser(data.user[0].name )
    }
      fetching()
  }, []);
  return <div>user4: {user}</div>;
}
