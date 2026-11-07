import { FileText, Share2, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-full flex-1 lg:grid-cols-2">
      <div className="hidden flex-col border-r border-border bg-card px-16 py-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            G
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Ghost AI
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-md">
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-foreground">
              Design systems at the
              <br />
              speed of thought.
            </h1>
            <p className="mt-5 text-base text-muted-foreground">
              Describe your architecture in plain English. Ghost AI maps it
              to a shared canvas your whole team can refine in real time.
            </p>

            <ul className="mt-10 space-y-6">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2026 Ghost AI. All rights reserved.
        </p>
      </div>
      <div className="flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
