import type { ProductSpec } from '@/lib/constants';

export default function ProductSpecs({ specs }: { specs: ProductSpec[] }) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-white">Especificaciones técnicas</h2>
      <div className="overflow-hidden rounded-[20px] border border-cyan-400/10">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
              i % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'
            } ${i < specs.length - 1 ? 'border-b border-cyan-400/10' : ''}`}
          >
            <span className="text-sm text-slate-500">{spec.label}</span>
            <span className="text-sm font-medium text-white sm:text-right">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
