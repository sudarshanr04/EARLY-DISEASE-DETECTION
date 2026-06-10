import { Link } from "@tanstack/react-router";
import { Leaf, Github, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container-px mx-auto max-w-7xl py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Leaf className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Terra<span className="text-primary">Leaf</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI-assisted plant disease detection and a thoughtful companion for
              home and terrace gardeners.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/detect" className="hover:text-foreground">Disease Detection</Link></li>
              <li><Link to="/terrace" className="hover:text-foreground">Terrace Assistant</Link></li>
              <li><Link to="/library" className="hover:text-foreground">Disease Library</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a href="mailto:hello@terraleaf.app" className="inline-flex items-center gap-2 hover:text-foreground">
                  <Mail className="h-4 w-4" /> Contact
                </a>
              </li>
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            Disclaimer: TerraLeaf provides guidance for educational purposes and
            is not a substitute for professional agronomic advice.
          </p>
          <p>© {new Date().getFullYear()} TerraLeaf · v1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
