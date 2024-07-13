import { createUser, getUserByEmail } from "@/db/repositories/user";
import { signUpSchema } from "@/lib/zod";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validated = await signUpSchema.safeParseAsync(body);

  if (!validated.success)
    return NextResponse.json(
      { error: "Sent data is not Valid" },
      { status: 400 }
    );

  const { email, password: plainPassword, name } = validated.data;

  if (await getUserByEmail(email))
    return NextResponse.json(
      { error: "Email already Exists" },
      { status: 400 }
    );

  const password = await bcrypt.hash(plainPassword, 10);

  await createUser({ email, password, name });

  // Send Email Verification

  return NextResponse.json({ status: "success", data: "User created" });
}
