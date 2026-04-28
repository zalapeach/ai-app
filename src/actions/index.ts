"use server";

import bcrypt from "bcrypt";
import { createSession, deleteSession, getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface AuthResult {
  success: boolean;
  error?: string;
}

export async function getUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        createdAt: true
      }
    });

    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}
