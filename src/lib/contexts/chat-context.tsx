"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useFileSystem } from "./file-system-context";

export function ChatProvider({
  children,
  projectId,
  initialMessages = [],
}: ChatContextProps & { children: ReactNode }) {
  const { fileSystem, handleToolCall } = useFileSystem();
}
