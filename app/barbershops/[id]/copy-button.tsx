"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm"
    >
      <Copy className="h-4 w-4" />
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}
