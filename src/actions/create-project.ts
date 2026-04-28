"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface CreateProjectInput {
  name: string;
  messages: any[];
  data: Record<string, any>;
}

export async function createProject(input: CreateProjectInput) {
}
