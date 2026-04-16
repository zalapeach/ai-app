export interface FileNode {
}

export class VirtualFileSystem {
  private files: Map<string, FileNode> = new Map();

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
