interface BeforeAfterPanelProps {
  type: "antes" | "ahora";
  title: string;
  children: React.ReactNode;
}

export function BeforeAfterPanel({ type, title, children }: BeforeAfterPanelProps) {
  const isAntes = type === "antes";
  return (
    <div
      className={`p-8 rounded-xl backdrop-blur-xl border ${
        isAntes
          ? "bg-red-950/20 border-red-900/20"
          : "bg-emerald-950/20 border-emerald-900/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${isAntes ? "bg-red-500" : "bg-emerald-500"}`} aria-hidden="true" />
        <h3 className={`font-display text-xl ${isAntes ? "text-red-300" : "text-emerald-300"}`}>
          {title}
        </h3>
      </div>
      <div className="font-sans text-text/80 leading-relaxed">{children}</div>
    </div>
  );
}
