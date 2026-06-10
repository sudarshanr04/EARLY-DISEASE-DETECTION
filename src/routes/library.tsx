import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import disease1 from "@/assets/disease-1.jpg";
import disease2 from "@/assets/disease-2.jpg";
import disease3 from "@/assets/disease-3.jpg";
import disease4 from "@/assets/disease-4.jpg";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Plant Disease Library — TerraLeaf" },
      { name: "description", content: "Browse common plant diseases with authentic photography, symptoms, and treatment guidance." },
      { property: "og:title", content: "Plant Disease Library — TerraLeaf" },
      { property: "og:description", content: "A curated reference of plant diseases for home and terrace gardeners." },
    ],
  }),
  component: LibraryPage,
});

const diseases = [
  { img: disease1, name: "Early Blight", plant: "Tomato", severity: "Moderate", desc: "Concentric brown rings on lower leaves, often appearing after warm, humid spells." },
  { img: disease2, name: "Powdery Mildew", plant: "Grape", severity: "Mild", desc: "Dusty white patches spread across leaf surfaces, thriving in poor airflow." },
  { img: disease3, name: "Leaf Rust", plant: "Apple", severity: "Moderate", desc: "Orange pustules form on undersides of leaves; act early to stop spread." },
  { img: disease4, name: "Late Blight", plant: "Potato", severity: "Severe", desc: "Dark water-soaked lesions that can collapse a plant in days during cool, wet weather." },
  { img: disease1, name: "Septoria Leaf Spot", plant: "Tomato", severity: "Moderate", desc: "Small circular spots with dark borders and pale centers on older foliage." },
  { img: disease2, name: "Downy Mildew", plant: "Cucurbits", severity: "Moderate", desc: "Yellow angular patches between veins; fuzzy growth on the underside." },
];

function LibraryPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => diseases.filter((d) => (d.name + d.plant).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <SiteLayout>
      <section className="container-px mx-auto max-w-7xl py-12 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Disease library</span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              A field guide for the modern gardener.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Authentic photography, clear symptoms, and practical care notes for the most common plant diseases.
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by plant or disease…"
              className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <article key={d.name + d.plant} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.img} alt={`${d.name} on ${d.plant} leaf`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-amber/15 px-2.5 py-1 font-semibold text-amber-foreground">{d.plant}</span>
                  <span className="text-muted-foreground">{d.severity}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">No matches yet — try a different plant or disease.</p>
        )}
      </section>
    </SiteLayout>
  );
}
