// app/page.tsx
import { HeroPanel } from "@/components/home/HeroPanel";
import { VisionPanel } from "@/components/home/VisionPanel";
import { LogrosHomePanel } from "@/components/home/LogrosHomePanel";
import { ReformasHomePanel } from "@/components/home/ReformasHomePanel";

export default function HomePage() {
  return (
    <div
      className="h-screen overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <div style={{ scrollSnapAlign: "start" }}>
        <HeroPanel />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <VisionPanel />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <LogrosHomePanel />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <ReformasHomePanel />
      </div>
    </div>
  );
}
