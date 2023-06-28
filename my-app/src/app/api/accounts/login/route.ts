import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const bd = await getBd(request);
  if (!bd || !bd?.username || !bd?.password) {
    return NextResponse.json({ err: "username or password are not defined" });
  }
  const account = await prisma.accounts.findUnique({
    where: {
      username: bd.username,
    },
    include: {
      auth: true,
    },
  });
  if (!account) {
    return NextResponse.json({ err: "no such username exist" });
  }
  if (account.password !== bd.password) {
    return NextResponse.json({ err: "password is wrong" });
  }
  const now = new Date();

  if (!account.auth || account.auth?.ex.getTime() < now.getTime()) {
    const token = randomUUID();
    const auth = await prisma.auth.update({
      where: {
        authId: account.id,
      },
      data: {
        authId: account.id,
        cr: now,
        ex: new Date(now.getTime() + 4 * 60 * 60 * 1000),
        token: token,
      },
    });
    return NextResponse.json({ token: auth.token });
  }
  return NextResponse.json({ token: account.auth.token });
}

async function getBd(request: Request) {
  return await request
    .json()
    .then((res) => res)
    .catch((err) => null);
}
