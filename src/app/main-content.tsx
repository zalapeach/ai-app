"use client";

import { useState } from "react";
import { FileSystemProvider } from "@/lib/contexts/file-system-context";

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

  return (
    <FileSystemProvider initialData={project?.data}>
    </FileSystemProvider>
  );
}
