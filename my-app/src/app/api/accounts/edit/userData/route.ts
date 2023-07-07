import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { getBd } from "@/app/api/methods/request";

export async function POST(request: Request) {
  const bd = await getBd(request);
  if (!bd || !bd.token) return NextResponse.json({ err: "body error" });
  let account;
  try {
    const auth = await prisma.auth.update({
      where: {
        token: bd.token,
      },
      data: {
        accounts: {
          update: {
            age: bd.age,
            password: bd.password,
            avatarImag: bd.avatarImag,
            email: bd.email,
            desc: bd.desc,
            firstName: bd.firstName,
            jobTitles: bd.jobTitles,
          },
        },
      },
      include: {
        accounts: {},
      },
    });
    account = auth.accounts;
  } catch {
    return NextResponse.json({ err: "error in update" });
  }
  return NextResponse.json({ account });
}
export type bodyType = {
  age?: number;
  password?: string;
  avatarImag?: string;
  email?: string;
  desc?: string;
  firstName?: string;
  jobTitles?: string;
};
