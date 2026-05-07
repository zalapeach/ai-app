"use client";

import { useAuth } from "@/hooks/use-auth";

interface SignInFormProps {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const { signIn, isLoading } = useAuth();
}
