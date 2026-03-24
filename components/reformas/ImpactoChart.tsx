interface ImpactoChartProps {
  stats: Array<{ label: string; value: string }>;
}

export function ImpactoChart({ stats }: ImpactoChartProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-xl"
        >
          <p className="font-sans text-3xl font-black text-gold">{stat.value}</p>
          <p className="font-sans text-sm text-muted mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
