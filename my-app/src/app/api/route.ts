import { NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function GET(request: Request) {
  await prisma.users.updateMany({
    data: {
        name: "poori"
    },
    where: {
        name: "hi"
    }
  });
  const user = await prisma.users.findMany()
  return NextResponse.json({ user });
}
