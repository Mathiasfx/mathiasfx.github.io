"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[320px] rounded-xl border border-slate-700/60 bg-slate-800/60 flex items-center justify-center text-slate-500 text-sm font-[family-name:var(--font-roboto)]">
      Cargando editor…
    </div>
  ),
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  hasError?: boolean;
};

export default function MarkdownEditor({
  value,
  onChange,
  height = 460,
  hasError,
}: Props) {
  return (
    <div
      data-color-mode="dark"
      className={
        hasError
          ? "rounded-xl overflow-hidden ring-2 ring-red-500/50 [&_.w-md-editor]:border-red-500/40"
          : "rounded-xl overflow-hidden [&_.w-md-editor]:border-slate-700/60"
      }
    >
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={height}
        preview="live"
        visibleDragbar
      />
    </div>
  );
}
