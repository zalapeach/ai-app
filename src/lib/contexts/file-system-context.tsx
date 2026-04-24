"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { VirtualFileSystem, FileNode } from "@/lib/file-system";

interface ToolCall {
  toolName: string;
  args: any;
}

interface FileSystemContextType {
  fileSystem: VirtualFileSystem;
  selectedFile: string | null;
  setSelectedFile: (path: string | null) => void;
  createFile: (path: string, content?: string) => void;
  updateFile: (path: string, content: string) => void;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newPath: string) => boolean;
  getFileContent: (path: string) => string | null;
  getAllFiles: () => Map<string, string>;
  refreshTrigger: number;
  handleToolCall: (toolCall: ToolCall) => void;
  reset: () => void;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(
  undefined
);

export function FileSystemProvider({
  children,
  fileSystem: providedFileSystem,
  initialData,
}: {
  children: React.ReactNode;
  fileSystem?: VirtualFileSystem;
  initialData?: Record<string, any>;
}) {
  const [fileSystem] = useState(() => {
    const fs = providedFileSystem || new VirtualFileSystem();
    if (initialData) {
      fs.deserializeFromNodes(initialData);
    }
    return fs;
  });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const createFile = useCallback(
    (path: string, content: string = "") => {
      fileSystem.createFile(path, content);
      triggerRefresh();
    },
    [fileSystem, triggerRefresh]
  );

  const updateFile = useCallback(
    (path: string, content: string) => {
      fileSystem.updateFile(path, content);
      triggerRefresh();
    },
    [fileSystem, triggerRefresh]
  );

  return (
    <FileSystemContext.Provider
      value={{
        fileSystem,
        selectedFile,
        setSelectedFile,
        createFile,
        updateFile,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}

export function useFileSystem() {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error("useFileSystem must be used within a FileSystemProvider");
  }
  return context;
}
