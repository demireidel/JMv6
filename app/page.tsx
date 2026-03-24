// app/page.tsx
import { HeroPanel } from "@/components/home/HeroPanel";
import { VisionPanel } from "@/components/home/VisionPanel";
import { LogrosHomePanel } from "@/components/home/LogrosHomePanel";
import { ReformasHomePanel } from "@/components/home/ReformasHomePanel";
import { MundoHomePanel } from "@/components/home/MundoHomePanel";
import { FuturoHomePanel } from "@/components/home/FuturoHomePanel";
import { ArchivoHomePanel } from "@/components/home/ArchivoHomePanel";

export default function HomePage() {
  return (
    <div
      className="h-screen overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Each panel fills the viewport and snaps into place */}
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
      <div style={{ scrollSnapAlign: "start" }}>
        <MundoHomePanel />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <FuturoHomePanel />
      </div>
      <div style={{ scrollSnapAlign: "start" }}>
        <ArchivoHomePanel />
      </div>
    </div>
  );
}
