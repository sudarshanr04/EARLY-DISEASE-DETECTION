import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Ruler, Sun, CalendarDays, Sprout, Droplets, Leaf, FlaskConical, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terrace")({
  head: () => ({
    meta: [
      { title: "Terrace Farming Assistant — TerraLeaf" },
      { name: "description", content: "Get crop, watering, and seasonal recommendations tailored to your terrace garden." },
      { property: "og:title", content: "Terrace Farming Assistant — TerraLeaf" },
      { property: "og:description", content: "Personalized crop and care guidance for terrace gardeners." },
    ],
  }),
  component: TerracePage,
});

const sizes = ["Small (under 50 sq ft)", "Medium (50–150 sq ft)", "Large (150+ sq ft)"];
const sunlight = ["Full sun (6+ hrs)", "Partial (3–6 hrs)", "Shade (under 3 hrs)"];
const seasons = ["Spring", "Summer", "Monsoon", "Autumn", "Winter"];

function TerracePage() {
  const [city, setCity] = useState("");
  const [size, setSize] = useState(sizes[1]);
  const [sun, setSun] = useState(sunlight[0]);
  const [season, setSeason] = useState(seasons[1]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="container-px mx-auto max-w-6xl py-12 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Terrace assistant</span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Plan a terrace garden that actually thrives.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Tell us a few things about your space. We'll suggest crops, watering
            rhythm, fertilizer, and seasonal care that fit your week.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <Field icon={MapPin} label="City">
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </Field>
            <Field icon={Ruler} label="Terrace size">
              <Select value={size} onChange={setSize} options={sizes} />
            </Field>
            <Field icon={Sun} label="Sunlight availability">
              <Select value={sun} onChange={setSun} options={sunlight} />
            </Field>
            <Field icon={CalendarDays} label="Current season">
              <div className="flex flex-wrap gap-2">
                {seasons.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      season === s
                        ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:w-auto"
            >
              <Sparkles className="h-4 w-4" /> Generate plan
            </button>
          </form>

          <div>
            {submitted ? <Plan city={city || "Your city"} /> : <PlanEmpty />}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

function PlanEmpty() {
  return (
    <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-border bg-card/60 p-8 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Sprout className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold">Your tailored plan will appear here</h3>
      <p className="mt-2 text-sm text-muted-foreground">Fill in a few details to see crop suggestions and a care rhythm.</p>
    </div>
  );
}

function Plan({ city }: { city: string }) {
  return (
    <div className="space-y-4 reveal-up">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-card p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Plan for {city}</span>
        <h3 className="mt-2 font-display text-2xl font-bold">A balanced edible terrace</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A productive mix of fast greens, climbing fruiters, and pollinator-friendly herbs — sized to your space and sunlight.
        </p>
      </div>

      <PlanCard icon={Sprout} title="Suitable crops" tags={["Cherry tomato", "Basil", "Mint", "Spinach", "Chili", "Lemongrass"]} />
      <PlanCard icon={Droplets} title="Watering frequency" body={'Water every morning during summer; reduce to alternate days as humidity rises. Containers under 8" dry faster — check by feel.'} />
      <PlanCard icon={Leaf} title="Care tips" body="Rotate pots weekly for even sun. Prune basil tops to encourage bushy growth. Stake tomatoes early before flowering." />
      <PlanCard icon={FlaskConical} title="Fertilizer" body="Liquid seaweed every 2 weeks for greens. Compost top-dressing monthly. For fruiting plants, add a potassium boost at flowering." />
      <PlanCard icon={CalendarDays} title="Seasonal advice" body="Heat is your biggest variable this season. Mulch generously and shade tender greens during midday peaks." />
    </div>
  );
}

function PlanCard({ icon: Icon, title, body, tags }: { icon: typeof Sprout; title: string; body?: string; tags?: string[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h4 className="font-display text-base font-semibold">{title}</h4>
      </div>
      {body && <p className="mt-3 text-sm leading-relaxed text-foreground/85">{body}</p>}
      {tags && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-secondary/30 px-3 py-1 text-xs font-semibold text-secondary-foreground">{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
