import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { randomUUID } from "crypto";
import { getQuery } from "../../methods/request";

export async function GET(request: Request) {
  const token = getQuery(request, "token") as string;
  if (!token)
    return NextResponse.json<apiResponse>({ err: "no token is provided" }, {status: 405});
  const auth = await prisma.auth.findUnique({
    where: {
      token: token,
    },
    include: {
      accounts: true,
    },
  });
  if (!auth) return NextResponse.json<apiResponse>({ err: "no account found" },{status: 404});
  const now = new Date();
  if (auth.ex.getTime() < now.getTime()) {
    return NextResponse.json<apiResponse>({ err: "token expired" }, {status: 403});
  }

  return NextResponse.json<apiResponse>({ account: auth.accounts }, {status: 200});
}

export type apiResponse =
  | apiSuccessResponse
  | {
      err: string;
    };
export type apiSuccessResponse = {
  account: {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    age: number | null;
    avatarImag: string | null;
    cr: Date;
    up: Date;
  };
};
