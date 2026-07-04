'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
}

export default function SearchableSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
  disabled = false,
  hasError = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
        setFocusedIdx(-1);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIdx < 0 || !listRef.current) return;
    (listRef.current.children[focusedIdx] as HTMLElement | undefined)?.scrollIntoView({
      block: 'nearest',
    });
  }, [focusedIdx]);

  const select = useCallback(
    (opt: string) => {
      onChange(opt);
      setOpen(false);
      setQuery('');
      setFocusedIdx(-1);
    },
    [onChange],
  );

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!disabled) setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      setFocusedIdx(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && focusedIdx >= 0) {
      e.preventDefault();
      if (filtered[focusedIdx]) select(filtered[focusedIdx]);
    }
  }

  const borderClass = hasError
    ? 'border-red-500/60'
    : open
    ? 'border-cyan-400/50 ring-1 ring-cyan-400/30'
    : 'border-slate-700';

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-2xl border bg-slate-900/80 px-4 py-3 text-sm outline-none transition-colors ${borderClass} ${
          disabled
            ? 'cursor-not-allowed opacity-40 text-slate-500'
            : value
            ? 'text-white'
            : 'text-slate-500'
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          className={`ml-2 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl shadow-black/60">
          {/* Search input */}
          <div className="border-b border-slate-700/60 px-3 py-2.5">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setFocusedIdx(-1);
              }}
              placeholder="Buscar..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>

          {/* Option list */}
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-52 overflow-y-auto py-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-center text-sm text-slate-500">Sin resultados</li>
            ) : (
              filtered.map((opt, i) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={opt === value}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(opt)}
                  className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                    opt === value
                      ? 'bg-cyan-300/10 font-medium text-cyan-300'
                      : i === focusedIdx
                      ? 'bg-white/5 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {opt}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
