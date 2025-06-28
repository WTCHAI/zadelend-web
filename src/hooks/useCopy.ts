import { useCallback } from "react";

export function useCopyToClipboard(defaultValue?: string) {
  const handleCopy = useCallback((value?: string) => {
    if (!value && !defaultValue) return;
    const toCopy = value || defaultValue;
    navigator.clipboard.writeText(toCopy!);
  }, [defaultValue]);

  return { handleCopy };
}