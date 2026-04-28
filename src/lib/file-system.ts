export interface FileNode {
  type: "file" | "directory";
  name: string;
  path: string;
  content?: string;
  children?: Map<string, FileNode>;
}

export class VirtualFileSystem {
  private files: Map<string, FileNode> = new Map();
  private root: FileNode;

  constructor() {
    this.root = {
      type: "directory",
      name: "/",
      path: "/",
      children: new Map(),
    };
    this.files.set("/", this.root);
  }

  private normalizePath(path: string): string {
    // Ensure path starts with /
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    // Remove trailing slash except for root
    if (path !== "/" && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    // Normalize multiple slashes
    path = path.replace(/\/+/g, "/");
    return path;
  }

  createFile(path: string, content: string = ""): FileNode | null {
    const normalized = this.normalizePath(path);

    // Check if file already exists
    if (this.files.has(normalized)) {
      return null;
    }

    // Create parent directories if they don't exist
    const parts = normalized.split("/").filter(Boolean);
    let currentPath = "";

    for (let i = 0; i < parts.length - 1; i++) {
      currentPath += "/" + parts[i];
      if (!this.exists(currentPath)) {
        this.createDirectory(currentPath);
      }
    }

    const parent = this.getParentNode(normalized);
    if (!parent || parent.type !== "directory") {
      return null;
    }

    const fileName = this.getFileName(normalized);
    const file: FileNode = {
      type: "file",
      name: fileName,
      path: normalized,
      content,
    };

    this.files.set(normalized, file);
    parent.children!.set(fileName, file);

    return file;
  }

  serialize(): Record<string, FileNode> {
    const result: Record<string, FileNode> = {};

    for (const [path, node] of this.files) {
      // Create a shallow copy without the Map children to avoid serialization issues
      if (node.type === "directory") {
        result[path] = {
          type: node.type,
          name: node.name,
          path: node.path,
        };
      } else {
        result[path] = {
          type: node.type,
          name: node.name,
          path: node.path,
          content: node.content,
        };
      }
    }

    return result;
  }

  deserializeFromNodes(data: Record<string, FileNode>): void {
    // Clear existing files except root
    console.log(this);
    this.files.clear();
    this.root.children?.clear();
  }
}

export const fileSystem = new VirtualFileSystem();
