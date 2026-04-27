// Minimal, dependency-free Markdown -> HTML helper.
// Handles headings, bold, italics, links, code blocks and paragraphs.
export function markdownToHtml(markdown: string) {
  if (!markdown) return "";
  // escape HTML
  let html = markdown.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // code blocks ``` ```
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => `<pre><code>${code.replace(/</g, "&lt;")}</code></pre>`);

  // headings
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // italics *text*
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // imágenes ![alt](url) — antes que enlaces para no confundir con [text](url)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_m, alt: string, src: string) => {
      const safeAlt = String(alt).replace(/"/g, "&quot;");
      return `<figure class="my-6"><img src="${src}" alt="${safeAlt}" loading="lazy" decoding="async" class="w-full max-h-[min(70vh,720px)] rounded-xl object-contain border border-slate-200/30 dark:border-slate-600/40" /></figure>`;
    }
  );

  // links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="nofollow noopener noreferrer">$1</a>');

  // paragraphs (split on two or more newlines)
  html = html
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, "<br/>"))
    .map((p) => {
      const t = p.trim();
      if (/^<(h[1-6]|pre|figure)\b/i.test(t)) return t;
      return `<p>${p}</p>`;
    })
    .join("");

  return html;
}

