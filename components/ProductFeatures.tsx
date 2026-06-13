import type { ProductFeature } from '@/lib/constants';

export default function ProductFeatures({ features }: { features: ProductFeature[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {features.map((f) => (
        <div
          key={f.label}
          className="flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-white/5 px-4 py-3"
        >
          <span className="text-xl">{f.icon}</span>
          <span className="text-sm font-medium text-slate-200">{f.label}</span>
        </div>
      ))}
    </div>
  );
}
