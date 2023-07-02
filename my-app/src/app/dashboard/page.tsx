
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Dashboard() {
  
  return (
    <div>
      <Loading />
      <Sidebar />
    </div>
  );
}