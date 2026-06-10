import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Droplets,
  Leaf,
  ArrowRight,
  X,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/detect")({
  head: () => ({
    meta: [
      { title: "Detect Plant Disease — TerraLeaf" },
      { name: "description", content: "Upload a leaf image and receive an instant AI diagnosis with treatment and prevention tips." },
      { property: "og:title", content: "Detect Plant Disease — TerraLeaf" },
      { property: "og:description", content: "Instant AI-powered leaf diagnosis with care recommendations." },
    ],
  }),
  component: DetectPage,
});

type Status = "idle" | "ready" | "analyzing" | "done";

function DetectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus("ready");
    setProgress(0);
  }

  function analyze() {
    setStatus("analyzing");
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / 2200) * 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else setStatus("done");
    };
    requestAnimationFrame(tick);
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setStatus("idle");
    setProgress(0);
  }

  return (
    <SiteLayout>
      <section className="container-px mx-auto max-w-6xl py-12 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Disease detection</span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Upload a leaf. Get a clear diagnosis.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A single, well-lit photo is all TerraLeaf needs. We'll surface
            symptoms, treatment, and prevention in seconds.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Uploader */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            {!preview ? (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag(false);
                  const f = e.dataTransfer.files?.[0];
                  if (f) handleFile(f);
                }}
                className={`flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
                  drag
                    ? "border-primary bg-primary-soft/60"
                    : "border-border bg-muted/40 hover:border-primary/40 hover:bg-primary-soft/30"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-card text-primary shadow-soft">
                  <Upload className="h-7 w-7" />
                </span>
                <p className="mt-5 font-display text-lg font-semibold">
                  Drop a leaf image here
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  or click to browse · JPG / PNG up to 10MB
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">
                  <ImageIcon className="h-4 w-4" /> Choose image
                </span>
              </label>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <img src={preview} alt="Uploaded leaf preview" className="aspect-[4/3] w-full object-cover" />
                <button
                  onClick={reset}
                  aria-label="Remove image"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-soft backdrop-blur transition-transform hover:scale-105"
                >
                  <X className="h-4 w-4" />
                </button>
                {status === "analyzing" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                    <div className="relative grid h-16 w-16 place-items-center">
                      <span className="absolute inset-0 rounded-full bg-primary/20 pulse-ring" />
                      <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <p className="mt-4 font-display text-base font-semibold">Analyzing leaf…</p>
                    <div className="mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                disabled={status !== "ready"}
                onClick={analyze}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:hover:translate-y-0"
              >
                <Sparkles className="h-4 w-4" /> Analyze leaf
              </button>
              {file && (
                <button onClick={reset} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Upload another
                </button>
              )}
              <p className="ml-auto text-xs text-muted-foreground">
                Tip: shoot in daylight, fill the frame with the leaf.
              </p>
            </div>
          </div>

          {/* Results */}
          <div>
            {status !== "done" ? (
              <EmptyResults />
            ) : (
              <ResultsPanel />
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function EmptyResults() {
  return (
    <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-border bg-card/60 p-8 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Leaf className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold">Your diagnosis will appear here</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Upload an image to see the predicted disease, severity, and care recommendations.
      </p>
    </div>
  );
}

function ResultsPanel() {
  return (
    <div className="space-y-4 reveal-up">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Diagnosis</span>
            <h3 className="mt-2 font-display text-2xl font-bold">Tomato — Early Blight</h3>
            <p className="mt-1 text-sm text-muted-foreground">Alternaria solani · fungal</p>
          </div>
          <span className="rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber-foreground">
            Moderate severity
          </span>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Confidence</span>
            <span className="font-semibold text-foreground">92.7%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[92.7%] rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>
      </div>

      <DetailCard
        icon={AlertTriangle}
        tone="amber"
        title="Symptoms"
        items={[
          "Concentric brown rings on older, lower leaves",
          "Yellow halo around lesions",
          "Premature leaf drop in advanced cases",
        ]}
      />
      <DetailCard
        icon={Droplets}
        tone="primary"
        title="Recommended treatment"
        items={[
          "Remove affected leaves and discard (don't compost)",
          "Apply copper-based or chlorothalonil fungicide weekly",
          "Mulch base of plant to reduce soil splash",
        ]}
      />
      <DetailCard
        icon={ShieldCheck}
        tone="primary"
        title="Prevention tips"
        items={[
          "Water at the base, early morning",
          "Space plants for airflow",
          "Rotate crops yearly; avoid nightshade follow-ons",
        ]}
      />

      <div className="rounded-3xl border border-border bg-primary-soft/50 p-6">
        <h4 className="font-display text-sm font-semibold text-primary">Next steps</h4>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Re-scan the same plant in 5–7 days to track recovery. Add a reminder to
          your terrace plan to inspect tomato leaves weekly through the warm season.
        </p>
        <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Save to my garden <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DetailCard({
  icon: Icon,
  title,
  items,
  tone,
}: {
  icon: typeof Leaf;
  title: string;
  items: string[];
  tone: "primary" | "amber";
}) {
  const toneClass = tone === "amber" ? "bg-amber/15 text-amber-foreground" : "bg-primary-soft text-primary";
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${toneClass}`}>
          <Icon className="h-4 w-4" />
        </span>
        <h4 className="font-display text-base font-semibold">{title}</h4>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
