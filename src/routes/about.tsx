import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Microscope, Sprout, Compass, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import handsPlant from "@/assets/hands-plant.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TerraLeaf — Our Mission for Home Gardeners" },
      { name: "description", content: "TerraLeaf empowers home gardeners with AI-assisted plant disease detection and practical terrace farming guidance." },
      { property: "og:title", content: "About TerraLeaf" },
      { property: "og:description", content: "Built to make plant care feel less like guesswork." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const pillars = [
    { icon: Heart, title: "Empower home gardeners", desc: "Approachable tools that respect your time, space, and curiosity." },
    { icon: Microscope, title: "Deep-learning powered", desc: "Vision models trained on the PlantVillage dataset for reliable diagnosis." },
    { icon: Sprout, title: "Terrace-first", desc: "Designed around container growing, small footprints, and city climates." },
    { icon: Compass, title: "Roadmap ahead", desc: "Offline mobile, multilingual care plans, and a shared knowledge base." },
  ];

  return (
    <SiteLayout>
      <section className="container-px mx-auto max-w-6xl py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our story</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              A calm companion for the plants you tend.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              TerraLeaf began on a balcony in monsoon — a stubborn tomato plant,
              a phone full of blurry leaf photos, and a question we couldn't
              shake: why is plant care still so opaque for home growers?
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We set out to build a quiet, capable tool that pairs modern computer
              vision with the warmth of an experienced gardener. No jargon, no
              dashboards — just clear answers and gentle next steps.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <img src={handsPlant} alt="Hands holding a young basil plant" className="aspect-[4/5] w-full object-cover" loading="lazy" width={1200} height={1500} />
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-[2rem] border border-border bg-primary-soft/40 p-10 text-center sm:p-16">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Care for your garden, with confidence.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Try TerraLeaf with your next leaf scan — no account, no friction.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/detect" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
              Start a scan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
