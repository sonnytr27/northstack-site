export type WorkStat = { value: string; label: string };

export type WorkEntry = {
  slug: string;
  number: string; // "001"
  category: string; // "INFRASTRUCTURE"
  title: string;
  summary: string;
  cardStats: [WorkStat, WorkStat, WorkStat]; // exactly 3 — fills the 3-across card row
  dateRange: string;
  stack: string; // hero metadata line, e.g. "Node.js · TypeScript · SQLite"
  sections: {
    problem: string[];
    built: string[];
    deepDive: { heading: string; body: string[] };
    numbers: [WorkStat, WorkStat, WorkStat, WorkStat]; // exactly 4 — fills the 4-col band
  };
};

export const work: WorkEntry[] = [
  {
    slug: "subscription-access-automation",
    number: "001",
    category: "INFRASTRUCTURE",
    title: "Subscription and access automation",
    summary:
      "Payment-verified access control for a paid community platform we operate. Replaced a third-party service whose records had quietly drifted away from reality.",
    cardStats: [
      { value: "137", label: "days in production, zero crash restarts" },
      { value: "1,423", label: "payment events processed" },
      { value: "167", label: "subscribers handled end to end" },
    ],
    dateRange: "March 2026 to present",
    stack: "Node.js · TypeScript · SQLite · Express · nginx",
    sections: {
      problem: [
        "Paid communities usually run on third-party membership services, and two things reliably go wrong. Pricing is the obvious one: it tiers against revenue, so the bill climbs as the community succeeds. The second is worse, because it's invisible. The service's record of who has access drifts from the payment processor's record of who has paid, and people who cancelled months ago stay in the channels while the system reports them removed.",
        "We found out how far apart those two records had drifted when we migrated off ours. The export claimed 76 active subscriptions. Checked row by row against the Stripe API, 52 of the 54 Stripe subscriptions were genuinely active. Two had lapsed and were still being reported as paying. The remaining 22 sat on a payment method the export gave no way to verify programmatically, so they were excluded rather than trusted. The same export carried 4,417 rows of historical subscription data, none of which could be taken at face value.",
      ],
      built: [
        "A self-hosted subscription and access-control system in Node.js and TypeScript, replacing the third-party service entirely.",
        "Payment state lives in Stripe. The local database is only a read model, never the authority. Access is granted and revoked on verified webhook events, not on a local list of who has paid. Every webhook is signature-verified before processing, and each event ID is written under a unique constraint, so a replayed or duplicated event is a no-op rather than a double charge or a double invite.",
        "Around that core sits self-service plan management and payment-method updates without a support conversation, segmented broadcast messaging, runtime-editable onboarding copy, live subscriber and revenue reporting, and a one-time win-back offer issued automatically on churn. The offer is locked to the customer's previous plan and marked as used only once Stripe confirms the discount was applied, not when the customer clicks it.",
      ],
      deepDive: {
        heading: "The bug that reported success",
        body: [
          "At the expiry of a time-limited pass, the system had to remove 43 people at once.",
          "As originally written, the removal sweep marked each subscription expired whether or not the platform API call had succeeded. One at a time that rarely mattered. In a batch it did. Under rate limiting a throttled call fails quietly, and the database records a clean removal for someone who's still in a paid channel. Every later audit reads that same database, so the failure never surfaces.",
          "It was the same failure that had made the previous provider's data untrustworthy.",
          "The fix had two parts. Global rate-limit throttling and automatic retry registered at the API transport layer, and the expiry write gated on a confirmed success response, not an attempt. It's a single dated commit, and its message names the bug.",
          "The sweep it was written for ran unattended seven weeks later. 43 removals targeted, 43 confirmed, none failed.",
        ],
      },
      numbers: [
        { value: "137", label: "days in production, zero crash restarts" },
        { value: "1,423", label: "Stripe webhook events processed" },
        { value: "167", label: "distinct subscribers handled end to end" },
        { value: "43", label: "batch removals executed, none failed" },
      ],
    },
  },
];

export function getWork(slug: string): WorkEntry | undefined {
  return work.find((entry) => entry.slug === slug);
}
