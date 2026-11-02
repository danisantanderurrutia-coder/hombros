import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Renders an inline LaTeX expression
 */
export function InlineMath({ math, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: false,
        throwOnError: false
      });
    } catch (e) {
      console.error('KaTeX inline error:', e);
      return math;
    }
  }, [math]);

  return <span className={`inline-math ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Renders a display/block LaTeX equation
 */
export function BlockMath({ math, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: true,
        throwOnError: false
      });
    } catch (e) {
      console.error('KaTeX block error:', e);
      return math;
    }
  }, [math]);

  return <div className={`block-math overflow-x-auto my-2 py-1 ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Parses mixed text containing \(...\) or \[...\] or $...$ and converts them to KaTeX
 */
export function LatexText({ text, className = '' }) {
  const elements = useMemo(() => {
    if (!text || typeof text !== 'string') return text;

    // Match \( ... \) or \[ ... \]
    const regex = /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.startsWith('\\[') && part.endsWith('\\]')) {
        const math = part.slice(2, -2);
        return <BlockMath key={index} math={math} />;
      }
      if (part.startsWith('\\(') && part.endsWith('\\)')) {
        const math = part.slice(2, -2);
        return <InlineMath key={index} math={math} />;
      }
      return <span key={index}>{part}</span>;
    });
  }, [text]);

  return <span className={className}>{elements}</span>;
}

export default InlineMath;
