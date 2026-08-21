'use client';

type Row = Record<string, string>;

interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'select';
  options?: string[];
  placeholder?: string;
}

interface Props {
  title: string;
  description?: string;
  value: Row[];
  onChange: (next: Row[]) => void;
  fields: FieldConfig[];
  emptyRow: Row;
  addLabel?: string;
}

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

export default function ListFieldEditor({ title, description, value, onChange, fields, emptyRow, addLabel }: Props) {
  function updateRow(index: number, key: string, newVal: string) {
    const next = value.map((row, i) => (i === index ? { ...row, [key]: newVal } : row));
    onChange(next);
  }

  function addRow() {
    onChange([...value, { ...emptyRow }]);
  }

  function removeRow(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}

      <div className="mt-4 flex flex-col gap-3">
        {value.length === 0 && (
          <p className="text-xs italic text-slate-500">Sin filas todavía. Agrega la primera abajo.</p>
        )}

        {value.map((row, i) => (
          <div key={i} className="flex flex-wrap items-end gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 p-3">
            {fields.map((f) => (
              <div key={f.key} className="min-w-[130px] flex-1">
                <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">{f.label}</label>
                {f.type === 'select' ? (
                  <select
                    value={row[f.key] ?? ''}
                    onChange={(e) => updateRow(i, f.key, e.target.value)}
                    className={inputClass}
                  >
                    {(f.options ?? []).map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={row[f.key] ?? ''}
                    onChange={(e) => updateRow(i, f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-500/30 text-sm text-red-400 hover:bg-red-500/10"
              aria-label="Quitar fila"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="self-start rounded-full border border-dashed border-slate-600 px-4 py-2 text-xs font-semibold text-slate-400 hover:border-cyan-400/50 hover:text-cyan-300"
        >
          {addLabel ?? '+ Agregar fila'}
        </button>
      </div>
    </section>
  );
}
