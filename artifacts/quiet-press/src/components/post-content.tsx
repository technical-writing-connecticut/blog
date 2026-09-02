import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import type { ContentBlock, InlinePart } from '@/data/posts';

function InlineText({ parts }: { parts: InlinePart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (part.type === 'em') return <em key={`${part.type}-${index}`}>{part.value}</em>;
        if (part.type === 'strong') return <strong key={`${part.type}-${index}`}>{part.value}</strong>;
        if (part.type === 'code') return <code key={`${part.type}-${index}`} className="inline-code">{part.value}</code>;
        return <span key={`${part.type}-${index}`}>{part.value}</span>;
      })}
    </>
  );
}

function CodeBlock({ block }: { block: Extract<ContentBlock, { type: 'code' }> }) {
  const [copied, setCopied] = useState(false);
  async function copyCode() {
    await navigator.clipboard?.writeText(block.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="code-frame my-9 overflow-hidden border border-border bg-[#f6f9fc] text-[#334155] shadow-[3px_3px_0_hsl(var(--primary)/.08)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-[10px] uppercase tracking-[.15em] text-muted-foreground">
        <span className="font-code">{block.filename ?? 'example'}</span>
        <span className="flex items-center gap-3">
          <span>{block.language}</span>
          <button type="button" onClick={copyCode} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground" data-testid="button-copy-code">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-[12px] leading-[1.8] sm:px-7 sm:text-[13px]"><code>{block.value}</code></pre>
    </div>
  );
}

export function PostContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="article-copy">
      {content.map((block, index) => {
        if (block.type === 'paragraph') return <p key={`paragraph-${index}`}><InlineText parts={block.parts} /></p>;
        if (block.type === 'heading') return <h2 key={`heading-${index}`}>{block.value}</h2>;
        if (block.type === 'quote') return <blockquote key={`quote-${index}`}><p>{block.value}</p>{block.cite && <cite>— {block.cite}</cite>}</blockquote>;
        if (block.type === 'list') return <ul key={`list-${index}`}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        return <CodeBlock key={`code-${index}`} block={block} />;
      })}
    </div>
  );
}
