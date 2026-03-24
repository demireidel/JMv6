// components/mundo/WorldMap.tsx
// Note: react-simple-maps requires "use client" for map interactivity
// This version is fully static (no interactivity) — Server Component compatible via inline SVG approach

export function WorldMap() {
  // Connection line coordinates [lng, lat] projected to SVG viewBox 0 0 800 400
  // Using simplified equirectangular projection: x = (lng + 180) * (800/360), y = (90 - lat) * (400/180)
  const project = (lng: number, lat: number) => ({
    x: ((lng + 180) * 800) / 360,
    y: ((90 - lat) * 400) / 180,
  });

  const BA = project(-58.4, -34.6);
  const Davos = project(9.8, 46.8);
  const Brussels = project(4.3, 50.8);
  const Washington = project(-77.0, 38.9);

  const connections = [
    { from: BA, to: Davos, label: "Davos" },
    { from: BA, to: Brussels, label: "Mercosur-UE" },
    { from: BA, to: Washington, label: "Washington" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto" aria-label="Mapa de presencia global">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* World background */}
        <rect width="800" height="400" fill="transparent" />

        {/* Connection lines with animation */}
        {connections.map((conn, i) => (
          <g key={conn.label}>
            <line
              x1={conn.from.x} y1={conn.from.y}
              x2={conn.to.x} y2={conn.to.y}
              stroke="#C9A84C"
              strokeWidth="1"
              strokeOpacity="0.6"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{
                animation: `dashDraw 2s ease-out ${i * 0.4}s forwards`,
              }}
            />
            {/* Destination dot */}
            <circle cx={conn.to.x} cy={conn.to.y} r="4" fill="#C9A84C" />
            <text
              x={conn.to.x + 6}
              y={conn.to.y + 4}
              fill="#E8C97A"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              {conn.label}
            </text>
          </g>
        ))}

        {/* Buenos Aires — origin dot */}
        <circle cx={BA.x} cy={BA.y} r="6" fill="#C9A84C" />
        <circle cx={BA.x} cy={BA.y} r="12" fill="none" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.4" />
        <text x={BA.x + 8} y={BA.y + 4} fill="#F0EDE6" fontSize="10" fontFamily="Inter, sans-serif">
          Buenos Aires
        </text>
      </svg>
    </div>
  );
}
