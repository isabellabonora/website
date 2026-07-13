export type Project = {
  slug: string;
  num: string;
  sector: string;
  title: string;
  tags: string[];
  heroQuote: string;
  heroImage: string;
  brief: {
    text: string;
    tags: string[];
    stat: string;
  };
  challenge: {
    heading: string;
    text: string;
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
  };
  process: { heading: string; body: string }[];
  screensImage: string;
  screensPoints: string[];
  reflection: string;
  color: string;
};

export const projects: Project[] = [
  {
    slug: "warehouse-workflow-manager",
    num: "01",
    sector: "Fashion & Retail · Logistics",
    title: "Bringing digital workflows into a physical environment",
    tags: ["UX/UI Design", "Supply chain", "B2B Internal Tool"],
    heroQuote: "Five systems, no single source of truth. Manual workarounds every single day.",
    heroImage: "/work/wf-hero.png",
    brief: {
      text: "The client is a globally recognized fashion brand operating complex supply chain distribution flows across multiple countries. Internal teams needed a reliable way to manage, execute and monitor the loading of factories, allowing the tracking of goods with minimal friction.",
      tags: ["End-to-end UX", "B2B Internal", "Supply Chain"],
      stat: "5 systems unified",
    },
    challenge: {
      heading: "The platform existed. The process didn't.",
      text: "Warehouse teams tracked goods across 5 systems: spreadsheets, Microsoft Teams, paper forms, two legacy tools. No single moment where a manager could see what was actually happening. Every shift started with a 20-minute reconciliation before any real work.",
      stat1: { value: "5 systems", label: "switched between constantly" },
      stat2: { value: "20 min", label: "daily reconciliation ritual before shifts" },
    },
    process: [
      {
        heading: "Understanding the physical reality",
        body: "Before opening Figma, spent time on the warehouse floor. Mapped how goods moved from unloading to scanning to staging, and found that the 5 systems were each covering a gap the others left open.",
      },
      {
        heading: "Designing for the warehouse, not the office",
        body: "The constraints shaped every decision: tablet-first UI, large touch targets for gloved hands, readable in low light, max 2 taps to complete any core action. No dropdowns. No modals. No jargon.",
      },
      {
        heading: "One source of truth",
        body: "Unified the 5 systems into a single real-time timeline visible to every role: pickers, managers, and dispatch. For the first time, a shift could start without a 20-minute catch-up.",
      },
    ],
    screensImage: "/work/wf-screens.png",
    screensPoints: [
      "Five disconnected systems replaced by one unified interface",
      "Real-time visibility: every team member sees the same status",
      "Designed for physical context: large targets, offline mode, no jargon",
    ],
    reflection: "If I could go back, I'd have spent more time with night-shift workers, not just day teams. The workflow changed significantly after midnight, and we only discovered this in user testing, not in research. Always interview the edge cases first.",
    color: "rgba(79,140,130,",
  },
  {
    slug: "smart-financing-application-flow",
    num: "02",
    sector: "Financial Technology",
    title: "Designing a funding application flow that people could actually complete",
    tags: ["UX/UI Designer", "Desktop", "FinTech"],
    heroQuote: "Multi-step, multi-document, zero guidance. Most people gave up halfway.",
    heroImage: "/work/funding-hero.png",
    brief: {
      text: "The client helps businesses access funding by acting as intermediary between companies and banks. Their existing process was slow and frustrating: users had to manually download, fill out, and upload multiple documents, often giving up halfway. The goal was a guided experience that felt manageable even for first-time users.",
      tags: ["Guided UX", "High-stakes", "FinTech"],
      stat: "100% guided flow",
    },
    challenge: {
      heading: "When the stakes are high, confusion is dangerous.",
      text: "The existing flow was fragmented and discouraging. Instructions were unclear, documents needed to be downloaded separately, and there was no indication of progress. Users didn't know if they were doing it right until it was too late.",
      stat1: { value: "\"I thought I did it wrong\"", label: "most common user sentiment" },
      stat2: { value: "Multiple downloads", label: "No automation, full manual effort" },
    },
    process: [
      {
        heading: "Discovery & journey mapping",
        body: "Analyzed the original process end to end and mapped where people dropped off and why. The main issues were unclear instructions, document overload and no sense of progress. Users did not know if they were doing it right until it was too late.",
      },
      {
        heading: "A conversational flow",
        body: "Redesigned the experience as a step-by-step flow that felt more like a guided conversation. Questions were grouped logically with contextual tips to help users respond with confidence. The goal was to make each step feel manageable, not overwhelming.",
      },
      {
        heading: "Integrating AI automation",
        body: "Key features included auto-filling documents based on user responses, real-time validation, and automatic extraction of identity data from uploaded ID scans. By the time a user hit submit, documents were generated and ready: no redundant effort from the user.",
      },
    ],
    screensImage: "/work/funding-screens.png",
    screensPoints: [
      "Complete flow without external support or clarification",
      "Documents auto-generated, no manual download or upload",
      "Designed for first-timers: every step in plain language",
    ],
    reflection: "Designing for high-stakes processes is different. When someone is applying for serious funding, they're not just filling a form, they're making an important decision and don't want to get it wrong. Every design choice had to reduce not just friction, but also anxiety.",
    color: "rgba(90,131,166,",
  },
  {
    slug: "retail-store-management-tools",
    num: "03",
    sector: "Fashion & Retail · Mobile + Desktop",
    title: "Designing for global store teams with different needs and different devices",
    tags: ["UX/UI Design", "Desktop+Mobile", "Global teams"],
    heroQuote: "Same team. Completely different needs. Completely different devices.",
    heroImage: "/work/retail-hero.png",
    brief: {
      text: "A globally operating fashion brand needed two integrated digital tools for store operations: a desktop platform for managers (planning, reporting, oversight) and a mobile app for associates (daily tasks, floor management). Two user groups, fundamentally different contexts, and the tools had to work together without sharing UI complexity.",
      tags: ["Multi-platform", "Mobile + Desktop", "Fashion Retail"],
      stat: "2 platforms, 1 data layer",
    },
    challenge: {
      heading: "Two tools. One team. Zero friction between them.",
      text: "Store managers lived in spreadsheets and emails. Associates lived on their phones. Any solution requiring both to use the same interface would fail one of them. The challenge: create two distinct products that felt like siblings, sharing data without sharing complexity.",
      stat1: { value: "\"I cannot use the same thing on my phone as on a computer\"", label: "store associate research" },
      stat2: { value: "Two different mental models", label: "Manager = plan. Associate = execute." },
    },
    process: [
      {
        heading: "Two parallel research tracks",
        body: "Shadowed managers during planning shifts and associates during floor work. The gap between their mental models was wider than expected: managers thought in weeks, associates thought in the next two hours. That gap shaped every design decision.",
      },
      {
        heading: "The shared data layer as foundation",
        body: "Defined what data both tools needed to share before designing either interface. This meant decisions about shifts, tasks and team availability were made once and reflected everywhere, without forcing users to duplicate work across systems.",
      },
      {
        heading: "Testing across languages and markets",
        body: "Ran usability sessions across multiple markets with teams speaking different languages. Icon-heavy navigation consistently outperformed text labels for speed and comprehension, especially in time-pressured floor environments.",
      },
    ],
    screensImage: "/work/retail-screens.png",
    screensPoints: [
      "Desktop for managers: planning, oversight, team tasks",
      "Mobile for associates: execution, daily tasks, real-time updates",
      "Shared data layer, both platforms always in sync",
    ],
    reflection: "Store associates were more tech-savvy than stakeholders assumed. They just had no patience for slow, cluttered UIs. Speed and clarity mattered more than feature richness. Designing for both without compromising either was the real challenge.",
    color: "rgba(198,138,78,",
  },
  {
    slug: "facility-management-platform",
    num: "04",
    sector: "Facility Management · SaaS",
    title: "When powerful software becomes too complex to use",
    tags: ["UX/UI Designer", "Desktop", "SaaS"],
    heroQuote: "A platform with everything. That users actively worked around.",
    heroImage: "/work/facility-hero.png",
    brief: {
      text: "The client provides a facility management SaaS used by large organizations to manage buildings, maintenance, and operations. Despite being feature-rich, users created workarounds: spreadsheets, sticky notes, WhatsApp groups, because the interface made simple tasks unnecessarily complex. Goal: redesign around what users actually needed to do.",
      tags: ["UX Redesign", "SaaS", "Internal Tool"],
      stat: "Core paths: 4 screens → 1",
    },
    challenge: {
      heading: "Feature richness had become feature fog.",
      text: "Years of accumulated features, none ever removed. Navigation required knowing where things were before you could find them. New users took weeks to become productive. Experienced users had memorized paths that no longer made logical sense.",
      stat1: { value: "\"I know it is in there somewhere\"", label: "defining quote from research" },
      stat2: { value: "Weeks to onboard", label: "before feeling productive" },
    },
    process: [
      {
        heading: "Mapping what users did vs system expected",
        body: "Conducted a task analysis of 12 common actions across different user roles. Only 3 matched the path the system expected. The other 9 required users to know where things lived before they could find them: that is how feature fog gets built.",
      },
      {
        heading: "Ruthless information hierarchy",
        body: "Ran card sorting sessions with real users across different departments and reorganized the information architecture around what users were trying to achieve, not around how the system was built. Goals first, capabilities second.",
      },
      {
        heading: "Progressive disclosure",
        body: "Kept all power features in the product but removed them from primary navigation. Advanced functionality was surfaced contextually, only when users needed it in their workflow. First-time users could complete core tasks without encountering edge cases.",
      },
    ],
    screensImage: "/work/facility-screens.png",
    screensPoints: [
      "Core task paths reduced from 4+ screens to 1-2 interactions",
      "IA reorganized around user goals, not system logic",
      "Advanced features preserved via progressive disclosure",
    ],
    reflection: "The hardest part wasn't designing the new experience. It was convincing stakeholders that removing visible features could increase the product's value. Simplicity is a hard sell to teams who built every feature for a reason. Data from user testing was the only language that worked.",
    color: "rgba(154,127,176,",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
