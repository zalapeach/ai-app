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

  deserializeFromNodes(data: Record<string, FileNode>): void {
  }
}

export const fileSystem = new VirtualFileSystem();
