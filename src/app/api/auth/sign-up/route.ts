import { createToken } from "@/db/repositories/tokens";
import { createUser, getUserByEmail } from "@/db/repositories/user";
import { mail } from "@/lib/email";
import { hashPassword, linkBuilder } from "@/lib/utils";
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

  const password = await hashPassword(plainPassword);

  await createUser({ email, password, name });

  const token = await createToken(email, "Email-Verification");

  await mail(email, linkBuilder(token, "Email-Verification"));

  return NextResponse.json({
    status: "success",
    data: "Confirmation email has been sent",
  });
}
