const STORAGE_KEY = "uigen_has_anon_work";
const DATA_KEY = "uigen_anon_data";

export function setHasAnonWork(messages: any[], fileSystemData: any) {
  if (typeof window === "undefined") return;

  // Only set if there's actual content
  if (messages.length > 0 || Object.keys(fileSystemData).length > 1) { // > 1 because root "/" always exists
    sessionStorage.setItem(STORAGE_KEY, "true");
    sessionStorage.setItem(DATA_KEY, JSON.stringify({ messages, fileSystemData }));
  }
}
