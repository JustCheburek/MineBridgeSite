import { getUser } from "@/services/user";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { name: string } }) {
    const { name } = await params

    const {user} = await getUser({ name })

    return NextResponse.json(user)
}