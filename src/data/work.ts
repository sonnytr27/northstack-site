export type WorkStat = { value: string; label: string };

export type WorkEntry = {
  slug: string;
  number: string; // "001"
  category: string; // "INFRASTRUCTURE"
  title: string;
  summary: string;
  cardStats: [WorkStat, WorkStat, WorkStat]; // exactly 3 — fills the 3-across card row
  dateRange: string;
  sections: {
    problem: string[];
    built: string[];
    deepDive: { heading: string; body: string[] };
    numbers: [WorkStat, WorkStat, WorkStat, WorkStat]; // exactly 4 — fills the 4-col band
    stack: { heading: string; body: string[] };
  };
};

export const work: WorkEntry[] = [
  {
    slug: "subscription-access-automation",
    number: "001",
    category: "INFRASTRUCTURE",
    title: "Subscription Access Automation",
    summary:
      "Placeholder summary standing in for the real one-line pitch. It describes, at a glance, what the system does and who it was built for, and runs to roughly the length the final copy will occupy in the card.",
    cardStats: [
      { value: "00", label: "PLACEHOLDER METRIC" },
      { value: "0.0s", label: "PLACEHOLDER METRIC" },
      { value: "0%", label: "PLACEHOLDER METRIC" },
    ],
    dateRange: "PLACEHOLDER — PLACEHOLDER",
    sections: {
      problem: [
        "Placeholder problem statement. This first paragraph sets up the situation the client was in before the work began, at roughly the length the real copy will run so the layout can be judged honestly rather than against a single short line.",
        "A second placeholder paragraph continues the framing, naming the constraints and the cost of the status quo. It exists so the prose column, its measure, and the spacing between paragraphs can be assessed with realistic body text in place.",
      ],
      built: [
        "Placeholder description of the first thing that was built. It reads like a real sentence of case-study prose so the column width and rhythm can be evaluated properly.",
        "A second placeholder paragraph covering another part of the build, again at realistic length rather than as a terse bullet.",
        "A third placeholder paragraph closing out the overview of what was delivered, leaving the section long enough to feel representative.",
      ],
      deepDive: {
        heading: "Placeholder Deep-Dive Heading",
        body: [
          "Placeholder deep-dive paragraph one. This is the section where a single technical or design decision gets unpacked in more depth, so the copy here is intentionally longer and more detailed than the summary paragraphs above it.",
          "Placeholder deep-dive paragraph two continues the explanation, walking through the reasoning and the trade-offs so the reader understands not just what was done but why. It runs to a realistic length for the same layout reasons.",
        ],
      },
      numbers: [
        { value: "00", label: "PLACEHOLDER METRIC" },
        { value: "0.0s", label: "PLACEHOLDER METRIC" },
        { value: "0%", label: "PLACEHOLDER METRIC" },
        { value: "0x", label: "PLACEHOLDER METRIC" },
      ],
      stack: {
        heading: "Stack and constraints",
        body: [
          "Placeholder paragraph describing the technical stack and the constraints the build had to respect. It names the kinds of tools and platforms involved at roughly the length the real rundown will occupy.",
          "A second placeholder paragraph covering the non-negotiables — the limits, dependencies, and operating conditions the system was designed around — so the closing section reads as substantial as the rest.",
        ],
      },
    },
  },
];

export function getWork(slug: string): WorkEntry | undefined {
  return work.find((entry) => entry.slug === slug);
}
