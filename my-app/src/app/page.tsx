"use Server";

import Link from "next/link";

import PrefetchProvider from "@/RQ/PrefetchProvider";

export default async function Home() {
  return (
    <PrefetchProvider>
      <div className="h-screen px-24 p-80 text-center">
        <h1>welcome to my website</h1>
        <Link href="/dashboard">enter</Link>
      </div>
    </PrefetchProvider>
  );
}
