export type Project = {
  slug: string;
  num: string;
  sector: string;
  title: string;
  tags: string[];
  heroQuote: string;
  teaser?: string;
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
  // Recruiter-facing additions; the case page falls back to the fields above when absent.
  meta?: { year?: string; role: string; team: string; platform: string; tools?: string };
  glance?: { problem: string; did: string; outcome: string };
  decisions?: { title: string; chose: string; over?: string; why: string }[];
  gallery?: { src: string; caption: string }[];
  outcome?: string;
};

export const projects: Project[] = [
  {
    slug: "career-paths-platform",
    num: "01",
    sector: "HR Tech · Internal Product",
    title: "Making growth visible: from a career framework to a tool people use",
    tags: ["Product Designer + Developer", "Desktop", "Built with AI"],
    heroQuote: "A career framework that lived in spreadsheets, text files and memory. People wanted to grow, but didn't know how to prove it.",
    teaser: "From interviews to shipped code, designed and built end to end with AI.",
    heroImage: "/work/v2/career-paths.jpg",
    brief: {
      text: "A 30-person software house had an official career framework: levels from Junior to Team Leader, a competency checklist for each one, soft skills and promotion rules. In practice the process lived in Excel, text files and memory. People who wanted to grow didn't know how to show it, and the founders had no overview of the team. I owned the project end to end, functional analysis, UX/UI design and development with Claude Code, shipping it as a standalone module that opens from Scrooge, the company's internal app. It was designed separate on purpose: Scrooge itself is next in line for a redesign, and the module will be folded into it then.",
      tags: ["Product discovery", "Design to code", "AI-assisted development"],
      stat: "1 person, from interviews to production",
    },
    challenge: {
      heading: "The document and the real process didn't match.",
      text: "The framework described rigid thresholds and scores. Interviews told a different story: promotions were decided together, in a conversation. And the real pain wasn't filling in a form, it was proving what you'd done. Connecting everyday work to a line in a checklist was the hard part. That moved the goal from calculating progress to helping people show their value.",
      stat1: { value: "\"I feel like I've done it, but I can't prove it\"", label: "developer, user interview" },
      stat2: { value: "Guide, don't constrain", label: "the principle behind every decision" },
    },
    process: [
      {
        heading: "Discovery: the real process, not the written one",
        body: "I ran two interviews picked for contrast: someone on the administrative track and a developer. One wanted orientation, \"you are here, this is where you can go\". The other wanted objective evidence. Underneath, it was the same need: help me give value to what I do, don't just record it. Both already kept a lightweight log, one in Excel, one in a dated text file, so the journal had to weigh almost nothing and let everyone write their own way.",
      },
      {
        heading: "Decisions written down, options on the table",
        body: "I modeled the domain and the as-is and to-be flows, then wrote a decision doc for the biggest fork: how a person reaches the right checklist. I recommended self-selection over an automatic questionnaire, because the risk of misclassifying people was high and the real branches were only two. Requirements were prioritized with MoSCoW in a live FigJam session, consciously leaving peer endorsements and salary ranges out of the first release. A design log tracked every decision with its context and status, so I could revisit my own assumptions without losing the thread.",
      },
      {
        heading: "Designing and building in the same loop",
        body: "I built the module in the real codebase (Elixir, React, PostgreSQL) with Claude Code, under one rule: mockup first, then code, and every step tested in the browser. Usability tests with four colleagues from different tracks were triaged by confidence and type, and conflicting feedback went to the founders as options, not compromises. The review became a guided three-step wizard, and a second test round surfaced 31 issues, all closed before launch.",
      },
    ],
    screensImage: "/work/career paths-detail.png",
    screensPoints: [
      "A lightweight journal that links everyday work to checklist items with a single @mention",
      "A career map with three clear states and a guided three-step review",
      "Live across the company, with a documented design system and principles reused in every screen",
    ],
    reflection: "The official document and the real process are never the same thing. Interviews moved the goal from calculating progress to helping people prove their value. Designing and building as one person, with AI, collapses the loop between idea, mockup, code and test, but only with clear rules: mockup before code, and every step tested in the browser.",
    color: "rgba(90,75,200,",
    meta: {
      year: "2026",
      role: "End to end, on my own: analysis, UX/UI design and development",
      team: "The founder and business stakeholders, plus usability tests with real colleagues",
      platform: "Desktop and mobile web",
      tools: "FigJam, Figma, Claude Code, React, Elixir, PostgreSQL",
    },
    glance: {
      problem: "The career framework lived in Excel, text files and memory. People couldn't show how they were growing, and the founders had no view of the team.",
      did: "Ran discovery, modelled the domain, designed every flow and built the module in the real codebase with Claude Code, testing each step in the browser.",
      outcome: "Checklists and journal notes now live in one tool, so people spend less time on paperwork, and managers see not just levels but how each person wants to grow. Two rounds of usability testing, 31 issues closed before launch.",
    },
    decisions: [
      {
        title: "Let people choose their own checklist",
        chose: "Self-selection, starting from the lowest level at the first review and climbing until you stop",
        over: "A dynamic questionnaire that classifies people automatically",
        why: "Misclassifying someone is costly, and there are only two real forks in the career paths. The automation wouldn't pay for its complexity.",
      },
      {
        title: "Link work to the checklist with a search, not a menu",
        chose: "Free search over checklist items, like @mentions in Notion",
        over: "A hierarchical menu by level and category",
        why: "When people write a note they often don't know yet which level it belongs to. Search meets them where they are.",
      },
      {
        title: "Three states on the map, not five",
        chose: "Not reached, waiting for confirmation, confirmed",
        why: "A full check had to mean \"confirmed in the call\", never \"I passed my own self-assessment\". Fewer states, one meaning each.",
      },
      {
        title: "Eleven reviewer states, four badges",
        chose: "Waiting, to review, ready for the call, confirmed",
        why: "I listed every possible state, then kept only the ones the system can really tell apart.",
      },
      {
        title: "A standalone module",
        chose: "A separate module launched from Scrooge",
        over: "A week of work integrating it into Scrooge's existing menu",
        why: "The founder reversed the direction in a call: the company is moving to isolated modules and Scrooge will be redesigned. My first standalone wireframes already pointed that way, so little was thrown away.",
      },
    ],
    gallery: [
      { src: "/work/career-paths/01-wireframe-review.jpg", caption: "Wireframes of the first review flow, validated with the founder" },
      { src: "/work/career-paths/02-reviewer-states.jpg", caption: "Eleven reviewer states reduced to four badges" },
      { src: "/work/career-paths/03-mockup-map.jpg", caption: "Mockup: the career map is the fixed element, only node states change" },
      { src: "/work/career-paths/04-wizard-checklist.jpg", caption: "The review became a guided wizard: checklist, soft skills, submit" },
      { src: "/work/career-paths/05-wizard-next-level.jpg", caption: "One level at a time: stop here, or try the next one" },
      { src: "/work/career-paths/06-ux-analysis.jpg", caption: "A focused UX analysis: inventory, problems, known patterns, proposal" },
      { src: "/work/career-paths/07-live-map.jpg", caption: "Live: the career map with confirmed, current and draft levels" },
      { src: "/work/career-paths/08-live-mobile.jpg", caption: "Live on mobile: the checklist with evidence linked from the journal" },
    ],
    outcome: "The module automated the checklist process and the journal, so people spend less time proving their work and more time doing it. Managers now receive more than a level: they see how each person wants to grow, what they ask for and what they need, which makes the yearly review a conversation and strengthens the human side of the company.",
  },
  {
    slug: "narrative-landing-page",
    num: "02",
    sector: "AI SaaS · Landing Page",
    title: "Designing a landing page that doesn't tell a story. It is one",
    tags: ["Product Designer", "Desktop + Mobile", "Brand & Conversion"],
    heroQuote: "Complete creative freedom. A wow effect. 48 hours. And one instruction hidden in the brief: build the page around this story.",
    teaser: "Total creative freedom, one hidden instruction, 48 hours.",
    heroImage: "/work/v2/story-landing.jpg",
    brief: {
      text: "An AI-native SaaS startup was repositioning: born as the internal software of a short-term rental operator, it was becoming a standalone product for B2C brands. One system unifying every comment, DM, call and email, with AI agents handling conversations end to end. They needed a landing page for the new positioning. The brief gave total creative freedom, asked for a \"wow effect\", and pointed at one hero example: a TikTok comment that becomes a paying customer, automatically.",
      tags: ["Narrative design", "Conversion", "AI-assisted workflow"],
      stat: "48h from brief to delivery",
    },
    challenge: {
      heading: "Total freedom is a trap.",
      text: "With no constraints, most landing pages converge on the same safe layout: headline, three benefits, feature grid, CTA. Correct, and forgettable. But the brief contained one line almost everyone would treat as content instead of architecture: \"this is the story the whole page should tell.\" Taking that line literally became the entire project.",
      stat1: { value: "\"Build the page around this\"", label: "the one instruction that mattered" },
      stat2: { value: "90% of solutions", label: "converge on the same safe layout" },
    },
    process: [
      {
        heading: "Research before pixels",
        body: "Before opening Figma, I looked at what the company actually was: a product mid-pivot, a live site still speaking to the old vertical, a logo carrying a house icon from the rental days. I mapped the competitive space, enterprise AI support tools on one side, consumer DM automation on the other, and found the gap the product sits in. The buyer is a B2C founder or marketer: someone who lives inside TikTok and Instagram, already knows the pain, and needs to see the difference, not read about it.",
      },
      {
        heading: "The story as the architecture",
        body: "The page opens at night: a comment posted at 2:47am, nobody awake, a red notification ringing in the dark. Scrolling turns night into day, the system working while the team sleeps. Five steps show one comment becoming a €39 order across real channel UIs, with the same fictional brand, person and price kept consistent from first comment to final purchase. Color works semantically: red is the unread notification, blue is the system acting, green is the problem solved. A CTA sits inside the story at the moment of highest intent, not at the bottom, where attention has already decayed. The structure held from the start; the visual system took several rounds of trying, discarding and simplifying to get there.",
      },
      {
        heading: "From static frames to a living page",
        body: "I built the page with an AI-assisted workflow: structured HTML imported into Figma for speed and consistency, then an animated prototype for everything static frames can't show. The sticky glass header, scroll reveals, the bell ringing, the counter running to 347, a DM writing itself. I closed the file the way I'd hand it to a team: style foundations, a mobile version, and a \"start here\" panel documenting every decision, the assumptions I made, and the two A/B tests I'd run after launch.",
      },
    ],
    screensImage: "/work/landing-page-detail.png",
    screensPoints: [
      "Full delivery in 48 hours: desktop, mobile, animated prototype, documented rationale",
      "One small system: 5 semantic colors, 2 typefaces, reusable components built to extend into the product",
      "Every decision documented: assumptions declared, post-launch tests defined",
    ],
    reflection: "Freedom in a brief doesn't make work more creative. It makes everyone converge on the same safe answer. The real brief is almost always hidden in one line. The job is finding it, taking it seriously, and having the reasoning to defend where it takes you.",
    color: "rgba(45,58,90,",
    meta: {
      year: "2026",
      role: "Product designer, on my own from brief to delivery",
      team: "Developers, for the handoff",
      platform: "Desktop and mobile",
      tools: "Figma, HTML prototype, AI-assisted workflow",
    },
    glance: {
      problem: "A brief with total creative freedom, a \"wow effect\" and 48 hours, for a startup repositioning its product.",
      did: "Found the one line in the brief that mattered and turned it into the page's architecture: one comment becoming a customer, step by step.",
      outcome: "Delivered in 48 hours: desktop, mobile, an animated prototype and every decision documented for the developers.",
    },
    outcome: "The page was delivered in 48 hours as a complete package: desktop and mobile layouts, an animated prototype for everything static frames can't show, a small reusable design system and a \"start here\" panel with the reasoning, the assumptions and the A/B tests to run after launch.",
  },
  {
    slug: "warehouse-workflow-manager",
    num: "03",
    sector: "Fashion & Retail · Logistics",
    title: "Bringing digital workflows into a physical environment",
    tags: ["UX/UI Design", "Supply chain", "B2B Internal Tool"],
    heroQuote: "Five systems, no single source of truth. Manual workarounds every single day.",
    heroImage: "/work/v2/warehouse.jpg",
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
    screensImage: "/work/digital workflow-detail.png",
    screensPoints: [
      "Five disconnected systems replaced by one unified interface",
      "Real-time visibility: every team member sees the same status",
      "Designed for physical context: large targets, offline mode, no jargon",
    ],
    reflection: "If I could go back, I'd have spent more time with night-shift workers, not just day teams. The workflow changed significantly after midnight, and we only discovered this in user testing, not in research. Always interview the edge cases first.",
    color: "rgba(79,140,130,",
    meta: {
      year: "2026",
      role: "UX/UI designer, from research on the floor to the final UI",
      team: "Client developers and stakeholders, a PM bringing requests, warehouse users testing",
      platform: "Tablet first",
    },
    glance: {
      problem: "Warehouse teams tracked goods across five systems, and every shift started with a 20-minute reconciliation.",
      did: "Studied the work on the warehouse floor, designed a tablet-first tool for gloved hands and low light, and merged five systems into one timeline.",
      outcome: "One shared, real-time view for pickers, managers and dispatch, and shifts that start without the reconciliation.",
    },
  },
  {
    slug: "smart-financing-application-flow",
    num: "04",
    sector: "Financial Technology",
    title: "Turning a document-heavy funding application into a guided flow",
    tags: ["UX/UI Designer", "Desktop", "FinTech"],
    heroQuote: "Multi-step, multi-document, zero guidance. Most people gave up halfway.",
    heroImage: "/work/v2/funding-flow.jpg",
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
    screensImage: "/work/funding application-detail.png",
    screensPoints: [
      "Complete flow without external support or clarification",
      "Documents auto-generated, no manual download or upload",
      "Designed for first-timers: every step in plain language",
    ],
    reflection: "Designing for high-stakes processes is different. When someone is applying for serious funding, they're not just filling a form, they're making an important decision and don't want to get it wrong. Every design choice had to reduce not just friction, but also anxiety.",
    color: "rgba(90,131,166,",
    meta: {
      year: "2026",
      role: "UX/UI designer, from journey mapping to the final flow",
      team: "Developers, who brought me the clients' requests",
      platform: "Desktop",
    },
    glance: {
      problem: "Applying for funding meant downloading, filling and uploading documents with no guidance. Most people gave up halfway.",
      did: "Mapped where people dropped off, turned the form into a guided, conversational flow and designed AI automation for documents and ID data.",
      outcome: "A flow people complete without external help, with documents generated automatically instead of downloaded and uploaded.",
    },
  },
  {
    slug: "retail-store-management-tools",
    num: "05",
    sector: "Fashion & Retail · Mobile + Desktop",
    title: "Designing for global store teams with different needs and different devices",
    tags: ["UX/UI Design", "Desktop+Mobile", "Global teams"],
    heroQuote: "Same team. Completely different needs. Completely different devices.",
    heroImage: "/work/v2/store-teams.jpg",
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
    screensImage: "/work/global store teams-detail.png",
    screensPoints: [
      "Desktop for managers: planning, oversight, team tasks",
      "Mobile for associates: execution, daily tasks, real-time updates",
      "Shared data layer, both platforms always in sync",
    ],
    reflection: "Store associates were more tech-savvy than stakeholders assumed. They just had no patience for slow, cluttered UIs. Speed and clarity mattered more than feature richness. Designing for both without compromising either was the real challenge.",
    color: "rgba(198,138,78,",
    meta: {
      year: "2026",
      role: "UX/UI designer for both products, from research to UI",
      team: "Client developers and stakeholders, a PM bringing requests, store teams testing",
      platform: "Desktop for managers, mobile for associates",
    },
    glance: {
      problem: "Managers plan in weeks, associates execute in two-hour windows. One interface for both would have failed one of them.",
      did: "Ran two research tracks, defined the shared data first, then designed two sibling products and tested them across markets and languages.",
      outcome: "Two tools on one data layer, always in sync, with icon-led navigation that proved faster on the shop floor.",
    },
  },
  {
    slug: "facility-management-platform",
    num: "06",
    sector: "Facility Management · SaaS",
    title: "When powerful software becomes too complex to use",
    tags: ["UX/UI Designer", "Desktop", "SaaS"],
    heroQuote: "A platform with everything. That users actively worked around.",
    heroImage: "/work/v2/facility-saas.jpg",
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
    screensImage: "/work/powerful software-detail.png",
    screensPoints: [
      "Core task paths reduced from 4+ screens to 1-2 interactions",
      "IA reorganized around user goals, not system logic",
      "Advanced features preserved via progressive disclosure",
    ],
    reflection: "The hardest part wasn't designing the new experience. It was convincing stakeholders that removing visible features could increase the product's value. Simplicity is a hard sell to teams who built every feature for a reason. Data from user testing was the only language that worked.",
    color: "rgba(154,127,176,",
    meta: {
      role: "UX/UI designer, from task analysis to the redesign",
      team: "The client directly, who brought me their users' feedback",
      platform: "Desktop SaaS",
    },
    glance: {
      problem: "A feature-rich platform that users worked around with spreadsheets, sticky notes and WhatsApp groups.",
      did: "Analysed 12 common tasks, reorganised the information architecture with card sorting, and moved power features behind progressive disclosure.",
      outcome: "Core tasks went from 4+ screens to 1 or 2 interactions, without removing any feature.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
