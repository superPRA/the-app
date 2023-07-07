import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { getQuery } from "../../methods/request";
import { GetResult } from "@prisma/client/runtime";

export async function GET(request: Request) {
  const token = getQuery(request, "token") as string;
  if (!token)
    return NextResponse.json<apiResponse>(
      { err: "no token is provided" },
      { status: 405 }
    );
  const auth = await prisma.auth.findUnique({
    where: {
      token: token,
    },
    include: {
      accounts: true,
    },
  });
  if (!auth)
    return NextResponse.json<apiResponse>(
      { err: "no account found" },
      { status: 404 }
    );
  const now = new Date();
  if (auth.ex.getTime() < now.getTime()) {
    return NextResponse.json<apiResponse>(
      { err: "token expired" },
      { status: 403 }
    );
  }
  const account = await prisma.accounts.findUnique({
    where: {
      id: auth.authId,
    },
    include: {
      timeLine: true,
      inbox: true,
      attr: true,
    },
  });
  return NextResponse.json<apiResponse>({ account: account }, { status: 200 });
}

export type apiResponse = { err: string } | apiSuccessResponse;
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
    jobTitles: string[];
    desc: string | null;
    role: string | null;
    attr:
      | (GetResult<
          {
            attrId: string;
            page: string;
            type: string;
            key: string;
            value: string;
            cr: Date;
            icon: string | null;
            up: Date;
          },
          any
        > & {})
      | null;
    inbox:
      | (GetResult<
          {
            receiver: string;
            senderName: string;
            senderEmail: string;
            subject: string;
            massage: string;
            cr: Date;
          },
          any
        > & {})
      | null;
    timeLine:
      | (GetResult<
          {
            timeLineId: string;
            startDate: Date;
            endDate: Date;
            header1: string;
            header2: string;
            desc: string;
            cr: Date;
            up: Date;
          },
          any
        > & {})
      | null;
  } | null;
};
