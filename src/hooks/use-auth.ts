"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {};

  const signUp = async () => {};

  return {
    signIn,
    signUp,
    isLoading,
  }
}
