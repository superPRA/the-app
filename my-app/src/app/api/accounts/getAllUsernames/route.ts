import { getBd } from "../../methods/request";
import prisma from "../../../../../prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const res = await prisma.accounts.findMany({
        select: {
            username: true
        }
    })
    const usernames = res.map((item)=>{
        return item.username
    })
    return NextResponse.json({usernames})
}