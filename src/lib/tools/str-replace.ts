import { z } from "zod";

const TextEditorParameters = z.object({});

export const buildStrReplaceTool = (fileSystem: VirtualFileSystem) => {
  return {
    id: "str_replace_editor" as const,
    args: {},
    parameters: TextEditorParameters,
    execute: async ({
      command,
      path,
      file_text,
      new_str,
      old_str,
      view_range
    }: z.infer<typeof TextEditorParameters>) => {

    },
  };
};
