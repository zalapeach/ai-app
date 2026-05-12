"use client"

import { useFileSystem } from "@/lib/contexts/file-system-context";
import {
  Folder
} from "lucide-react";

export function FileTree() {
  const { fileSystem, refreshTrigger } = useFileSystem();
  const rootNode = fileSystem.getNode("/");

  if (!rootNode || !rootNode.children || rootNode.children.size === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <Folder className="h-12 w-12 text-gray-300 mb-3" />
        <p className="text-sm text-gray-500"> No files yet</p>
        <p className="text-xs text-gray-400 mt-1">Files will appear here</p>
      </div>
    );
  }

  const rootChildren = Array.from(rootNode.children.values()).sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "directory" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <ScrollArea className="h-full">
      <div className="py-2" key={refreshTrigger}>
        {rootChildren.map((child) => (
          <FileTreeNode key={child.path} node={child} level={0} />
        ))}
      </div>
    </ScrollArea>
  );
};
