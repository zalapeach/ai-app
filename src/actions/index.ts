"use server";

import { createSession, deleteSession, getSession } from "@/lib/auth";

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
