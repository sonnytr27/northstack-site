export type WorkStat = { value: string; label: string };

/** Shared by every entry, production or demo. */
type WorkEntryBase = {
  slug: string;
  number: string; // "001"
  category: string; // "INFRASTRUCTURE"
  title: string;
  summary: string;
  dateRange: string;
  stack: string; // hero metadata line, e.g. "Node.js · TypeScript · SQLite"
  sections: {
    problem: string[];
    built: string[];
    deepDive: { heading: string; body: string[] };
  };
};

/** Shipped work. Carries the figures both the card row and the numbers band need. */
export type ProductionWorkEntry = WorkEntryBase & {
  isDemo?: false;
  cardStats: [WorkStat, WorkStat, WorkStat]; // exactly 3 — fills the 3-across card row
  sections: WorkEntryBase["sections"] & {
    numbers: [WorkStat, WorkStat, WorkStat, WorkStat]; // exactly 4 — fills the 4-col band
  };
};

/**
 * A concept piece: something built to be tried, not a system running in
 * production. It has no figures to report, so it carries neither cardStats nor
 * sections.numbers, and points at a live demo instead. Both surfaces narrow on
 * isDemo, which is what keeps the numbers band off these pages.
 */
export type DemoWorkEntry = WorkEntryBase & {
  isDemo: true;
  demoUrl: string;
};

export type WorkEntry = ProductionWorkEntry | DemoWorkEntry;

export const work: WorkEntry[] = [
  {
    slug: "subscription-access-automation",
    number: "001",
    category: "INFRASTRUCTURE",
    title: "Subscription and access automation",
    summary:
      "Runs the subscriptions and access for a paid community we operate. Replaced a paid service that had started letting cancelled members keep their access.",
    cardStats: [
      { value: "£1,400", label: "a year, cut from running costs" },
      { value: "137", label: "days in production, zero crash restarts" },
      { value: "76 to 52", label: "subscriptions verified on migration" },
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
        { value: "£1,400", label: "a year removed from running costs" },
        { value: "137", label: "days in production, zero crash restarts" },
        { value: "24", label: "claimed subscriptions that did not survive audit" },
        { value: "43", label: "batch removals executed, none failed" },
      ],
    },
  },
  {
    slug: "production-data-pipeline",
    number: "002",
    category: "DATA",
    title: "Production data pipeline",
    summary:
      "Pulls data from several sources into one database every day, on its own. Recovers from failures without help, and never records the same thing twice.",
    cardStats: [
      { value: "37", label: "scheduled jobs running unattended" },
      { value: "4", label: "daily ingestion cycles" },
      { value: "75GB", label: "warehouse under management" },
    ],
    dateRange: "May 2026 to present",
    stack: "Python · PostgreSQL · systemd · FastAPI",
    sections: {
      problem: [
        "Any system that pulls data from someone else's service inherits their failures. Feeds go down, formats change without warning, and rate limits arrive unannounced. The naive version of this job is a script on a timer, and it works right up until the day something upstream is different, at which point it either crashes loudly or, far worse, writes bad data quietly.",
        "The harder problem is what happens on the second run. A pipeline that fetches the same day twice needs to produce the same result twice. Without that, every retry risks duplicating records, and every recovery from an outage becomes a manual reconciliation job.",
      ],
      built: [
        "A two-stage pipeline that separates fetching from parsing. Raw payloads are written to disk and recorded in a ledger before anything is interpreted, so a parsing bug never means re-fetching, and a fetch is never repeated unnecessarily.",
        "Every write is an upsert on a natural key, and every fetch is checked against the ledger first. Running the same day twice is a no-op rather than a duplication. A run that crashes halfway leaves its own breadcrumbs, with attempt counts and the last error recorded per item, and the next scheduled run picks up exactly where it stopped without being told to.",
        "Thirty-seven scheduled jobs handle ingestion, aggregation, model fitting, integrity checks and backups. Missed runs execute on next boot rather than being skipped. Parsers classify their own failures, so a genuine upstream format change raises an alert while routine unknown values are logged for later review, rather than both being treated as noise.",
        "Backups run nightly to object storage, with the upload confirmed rather than assumed, retention rotated automatically, and monthly snapshots kept indefinitely.",
      ],
      deepDive: {
        heading: "Nine days of nothing",
        body: [
          "An aggregation job stopped working and nobody noticed for nine days.",
          "It hadn't crashed. One statement in it had grown slow enough, against a table that had been getting larger for weeks, to exceed the time budget the job was given. The process manager killed it on timeout, exactly as configured, and moved on. The job's own logs showed it starting every morning. Nothing reported a failure, because from the system's point of view nothing had failed.",
          "What made it invisible was the same thing that made it survivable: the views it refreshes still existed and still returned data. They were just steadily getting older, and stale data looks identical to fresh data unless you check the timestamp.",
          "The fix was three parts. A realistic time budget for a job whose runtime scales with a growing table. Failure alerting wired directly into the process manager rather than left to the script. And a scheduling change, moving it clear of another memory-hungry job it had been silently competing with.",
        ],
      },
      numbers: [
        { value: "52", label: "tables in the warehouse" },
        { value: "4", label: "daily ingestion cycles, resumable" },
        { value: "75GB", label: "PostgreSQL warehouse" },
        { value: "30", label: "nightly backups retained and verified" },
      ],
    },
  },
  {
    slug: "document-capture-automation",
    number: "003",
    category: "AUTOMATION",
    title: "Image to spreadsheet capture",
    summary:
      "Reads images posted to a private channel and writes structured rows to a live spreadsheet. Built in a day. Has run unattended since.",
    cardStats: [
      { value: "119", label: "days running, one process, zero restarts" },
      { value: "5s", label: "from post to row" },
      { value: "55min", label: "of CPU used in four months" },
    ],
    dateRange: "March 2026 to present",
    stack: "Python · Telethon · Vision API · Google Sheets",
    sections: {
      problem: [
        "A team was posting information into a private channel as screenshots, and someone was reading each one and typing it into a spreadsheet by hand. Not a huge job on its own, but a few minutes each, several times a day, forever.",
        "Work like this rarely gets automated, because the cost of building the automation looks larger than the cost of continuing. The calculation only changes if the build is genuinely small, so the constraint wasn't technical. It was that this had to be finished in a day or it wasn't worth doing at all.",
      ],
      built: [
        "A single Python process holding an open connection to the channel, reacting to messages as they arrive rather than polling for them. Text fields are pulled locally with pattern matching. Anything only visible in the image goes to a vision model with a constrained prompt that forces structured output.",
        "Rows are written to the live spreadsheet through the API, addressed to specific cells rather than appended, so the tool works with an existing sheet layout instead of demanding a new one. Later edits to a message are picked up too, matched back to the original row by a stored identifier, so a correction posted after the fact updates the record rather than creating a second one.",
        "The whole thing is 518 lines in one file. It runs on a small server as a supervised service under a non-privileged user, restarts itself on failure, and has used 55 minutes of processor time in four months.",
      ],
      deepDive: {
        heading: "The bug that overwrote live data",
        body: [
          "The tool finds the next empty row before writing. That sounds like the simplest part of the job, and it was the part that nearly destroyed the sheet.",
          "The spreadsheet library's method for reading a column drops trailing empty cells rather than returning them. So a sheet with data down to row 98 and nothing after returns a list that ends at 98, with no indication that rows 99 onward exist and are empty. The loop looking for the first blank entry found nothing, fell through, and returned its starting position. Which was row 11. Occupied.",
          "It didn't error. It wrote a valid row into a valid cell, on top of a record that was already there.",
          "The fix was to stop asking for a column and start asking for a fixed range, which returns a grid with the empty cells preserved and present. Same information, an honest shape.",
          "Nothing was wrong with the logic, the API call, or the data. The library returned exactly what it documents. The assumption underneath, that a column read gives you the whole column, was the thing that was wrong, and it was invisible until a sheet happened to have empty rows at the bottom.",
        ],
      },
      numbers: [
        { value: "119", label: "days running, one process, zero restarts" },
        { value: "41MB", label: "memory footprint" },
        { value: "5s", label: "from image posted to row written" },
        { value: "55min", label: "of CPU used in four months" },
      ],
    },
  },
  {
    slug: "invoice-extraction",
    number: "004",
    category: "DEMONSTRATION",
    title: "Documents into data",
    summary:
      "A working demonstration: pick a sample invoice, watch the fields get read and turned into a clean, exportable row. The capability behind killing manual data entry.",
    dateRange: "Concept build",
    stack: "Next.js · TypeScript",
    isDemo: true,
    demoUrl: "/demos/invoice-extraction",
    sections: {
      problem: [
        "Somewhere in most businesses, a person is reading documents and typing what they say into a spreadsheet. Invoices, delivery notes, receipts, order forms. It is slow, it is dull, and it is the kind of task that quietly eats a day a month without ever being important enough to fix.",
        "Off-the-shelf software rarely covers it, because every business's documents and destination are slightly different. So the job stays manual, and the person doing it stays busy with work a machine should be doing.",
      ],
      built: [
        "This is a demonstration of the capability, built to be tried rather than described. Pick a sample invoice and the tool reads it: a scan animation, then the fields populate one by one, supplier, invoice number, date, line items, totals, into a clean structured record you can export as a CSV.",
        "The extraction in the demo is scripted and deterministic, so it costs nothing to run and cannot fail in front of you. A production version reads real documents with a vision model, but the flow, the output, and the export are exactly what a real tool would do.",
        "The point of showing it rather than describing it: a business owner should not have to imagine what document extraction means. They should watch a messy invoice become a clean row of data in under two seconds, and recognise their own Tuesday afternoon.",
      ],
      deepDive: {
        heading: "What you would actually get",
        body: [
          "The demo is the capability. How it is delivered depends on the business.",
          "For some it is a tool their team uses, documents dropped in and clean rows out, behind their own login, reading their real files. For others it is an automation with no interface at all, where documents arrive in an inbox or a folder and the rows appear in a spreadsheet on their own, with nobody clicking anything. And for a business sitting on a backlog, it is a one-off job: hand over the pile, get back a single clean spreadsheet, no software to run.",
          "The common thread is the same in every case. If someone in the business retypes documents into a spreadsheet, this removes that job. What changes is only the shape of the delivery.",
        ],
      },
    },
  },
];

export function getWork(slug: string): WorkEntry | undefined {
  return work.find((entry) => entry.slug === slug);
}
