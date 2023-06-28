import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { randomUUID } from "crypto";

export async function GET(request: Request){
    const token = new URLSearchParams(new URL(request.url).search).get('token')
    if(!token) return NextResponse.json({err: "no token is provided"})
    const auth = await prisma.auth.findUnique({
        where: {
            token
        },
        include: {
            accounts: true
        }
    })
    if(!auth) return NextResponse.json({err: "token doesnt exist"})
    const now = new Date()
    if(auth.ex.getTime() < now.getTime()){
        return NextResponse.json({err: "token expired"})
    }
    
    return NextResponse.json({account: auth.accounts})
}