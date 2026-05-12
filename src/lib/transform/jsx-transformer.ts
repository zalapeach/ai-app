export function createImportMap(files: Map<string, string>): ImportMapResult {
  const imports: Record<string, string> = {
    react: "https://esm.sh/react@19",
    "react-dom": "https://esm.sh/react-dom@19",
    "react-dom/client": "https://esm.sh/react-dom@19/client",
    "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime",
    "react/jsx-dev-runtime": "https://esm.sh/react@19/jsx-dev-runtime",
  };

  // Transform each file and create blob URLs
  const transformedFiles = new Map<string, string>();
  const existingFiles = new Set(files.keys());
}

export function createPreviewHTML(
  entryPoint: string,
  importMap: string,
  styles: string = "",
  errors: Array<{ path: string, error: string }> = [],
): string {
  // Parse the import map to get the blob URL for the entry point
  let entryPointUrl = entryPoint;
  try {
    const importMapObj = JSON.parse(importMap);
    if (importMapObj.imports && importMapObj.imports[entryPoint]) {
      entryPointUrl = importMapObj.imports[entryPoint];
    }
  } catch (e) {
    console.error("Failed to parse import map:", e)
  }

  return `<!DOCTYPE html>
  <html lang="en">
  </html>`
}
