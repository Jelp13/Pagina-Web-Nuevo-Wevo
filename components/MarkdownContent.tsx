import ReactMarkdown, { type ExtraProps } from 'react-markdown';
import type { ComponentProps } from 'react';

// Los enlaces externos (http/https) se abren en pestaña nueva, igual que en
// el JSX original que esto reemplaza; los internos (/ruta) y mailto: se
// comportan como enlaces normales.
function MarkdownLink({ href, children, node, ...rest }: ComponentProps<'a'> & ExtraProps) {
  const isExternal = href?.startsWith('http');
  return (
    <a href={href} {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}

export default function MarkdownContent({ children }: { children: string }) {
  return <ReactMarkdown components={{ a: MarkdownLink }}>{children}</ReactMarkdown>;
}
