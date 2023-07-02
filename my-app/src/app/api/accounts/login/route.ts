import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { randomUUID } from "crypto";
import { getBd } from "../../methods/request";

export async function POST(request: Request) {
  const bd = await getBd(request);
  if (!bd || !bd?.username || !bd?.password) {
    return NextResponse.json<apiResponse>({
      err: "username or password are not defined",
    });
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
    return NextResponse.json<apiResponse>({ err: "no such username exist" }, {status: 404});
  }
  if (account.password !== bd.password) {
    return NextResponse.json<apiResponse>({ err: "password is wrong" }, {status: 405});
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
    return NextResponse.json<apiResponse>({ token: auth.token },{status: 200});
  }
  return NextResponse.json<apiResponse>({ token: account.auth.token }, {status: 200});
}

type apiResponse = apiErrResponse | apiSuccessResponse;
export type apiSuccessResponse = {
  token: string | null;
};
export type apiErrResponse = {
  err: string;
};
