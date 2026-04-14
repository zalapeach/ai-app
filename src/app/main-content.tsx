"use client";

import { useState } from "react";

interface MainContentProps {
  user?: {
    id: string;
    email: string;
  } | null;
  project?: {
    id: string;
    name: string;
    messages: any[];
    data: any;
    createdAt: Date;
    updatedAt: Date
  };
}

export function MainContent({user, project}: MainContentProps) {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
}
