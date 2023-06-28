"use Server";
import Image from "next/image";
import { useEffect, useState } from "react";
import { loadEnvConfig } from "@next/env";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen px-24 p-80 text-center">
      <h1 >welcome to my website</h1>
      <Link  href="/portfolio">enter</Link>
    </div>
  );
}
