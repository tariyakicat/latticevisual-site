import type { Metadata } from "next";
import "./globals.css";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://latticevisual.com"),
  title: {
    default: "Lattice Visual | Scientific Illustration Studio",
    template: "%s | Lattice Visual",
  },
  description:
    "Scientific illustration studio creating journal covers, paper figures, graphical abstracts, scientific animation and 3D research visuals.",
  openGraph: {
    type: "website",
    url: "https://latticevisual.com/",
    siteName: "Lattice Visual",
    title: "Lattice Visual | Scientific Illustration Studio",
    description:
      "Scientific illustration studio creating journal covers, paper figures, graphical abstracts, scientific animation and 3D research visuals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lattice Visual | Scientific Illustration Studio",
    description:
      "Scientific illustration studio creating journal covers, paper figures, graphical abstracts, scientific animation and 3D research visuals.",
  },
};

const themeScript = `
try {
  const stored = localStorage.getItem("lattice-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch {}
`;

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {gaMeasurementId?.startsWith("G-") ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "${gaMeasurementId}");
`,
              }}
            />
          </>
        ) : null}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
