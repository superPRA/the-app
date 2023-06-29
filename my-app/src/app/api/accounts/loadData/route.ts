import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { randomUUID } from "crypto";
import { getQuery } from "../../methods/request";

export async function GET(request: Request) {
  const token = getQuery(request, "token") as string;
  if (!token) return NextResponse.json({ err: "no token is provided" });
  const auth = await prisma.auth.findUnique({
      where: {
          token: token
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

  return NextResponse.json({ account: auth.accounts })
}


