# MyOrbit Case Study: How UX & Intentional AI Delivered a $150K App for $800 in 6 Months

## The Real Story Behind Building a Calendar App That Actually Solves Problems

---

## Executive Summary

In six months, three neurodivergent UX professionals built **MyOrbit**—a calendar and connection app redesigned for real human relationships—for **$800 total spend**. An app that would have cost $150,000 to develop two years ago. Even with today's AI tools, competitors are spending $95,000-$130,000 for similar scope and quality.

The difference? **UX methodology guided every decision.**

This case study shows how combining rigorous user research, intentional (not hype-driven) AI use, and a neurodivergent team's problem-solving approach created a product that competitors are missing: **a calendar designed for relationship maintenance, not just scheduling**, built for neurodivergent users, LGBTQ+ folks, and anyone navigating complex relationship structures during a time of widespread loneliness.

This isn't a story about "disruption" or "moving fast and breaking things." It's a story about what happens when you actually listen to users, use emerging tools strategically, and refuse to compromise on research rigor.

---

## The Problem We Observed (Not Assumed)

Most calendars are designed for a world that doesn't exist anymore: 9-to-5 work, traditional families, monogamous relationships, one way of experiencing time. But in 2025, that's not reality—especially for Gen Z, neurodivergent communities, LGBTQ+ users, and polyamorous folks.

We didn't guess this. We researched it.

**Our Research Process (Months 1-2):**
- Scraped 300+ reviews from competitors (Timetree, Howbout, Google Calendar, Proton Calendar, Weel Planner)
- Conducted 40+ screened user interviews with our core personas: neurodivergent Gen Z, LGBTQ+ users, polyamorous folks
- Analyzed 100+ Reddit threads discussing calendar struggles
- Created assumption maps: listed every assumption we had, then challenged each one with user data

**What We Found:**

| Pain Point | Current Solutions | User Impact | Our Approach |
|---|---|---|---|
| **Time blindness + notification failure** | More notifications (causes fatigue) | Users miss events they care about | Customizable, attention-grabbing notifications; circular ADHD-friendly time views |
| **Privacy across multiple relationships** | Binary sharing (share or don't) | Can't share calendar without exposing intimate details | Granular, event-level permission controls (show "busy," "busy + title," or full details per person) |
| **Loneliness in scheduling friction** | Complex multi-app coordination | Motivation to hang out evaporates before everyone agrees | Native language input, signals feature, AI-assisted rescheduling |
| **Friendship drift** | No mechanism to track this | People feel guilty; connections slowly fade | "Orbit" feature: visual representation of relationship proximity; optional nudges |

**Key User Quote That Changed Everything:**
*"I need to share my calendar with my unsupportive dad (he just needs to see I'm busy), my supportive stepmom (she gets event titles), my boyfriend (full details), and my best friend crashing at my place (she should see my plans). Existing apps make me choose: share everything or share nothing."*

This single insight unlocked one of our core differentiators: granular permission controls.

---

## How We Built It: The Process

### **Phase 1: Research-First Methodology (Weeks 1-8)**

Instead of jumping to wireframes, we spent two full months understanding users deeply.

**What we did:**
1. **Competitor analysis:** For each competitor, we mapped features against user pain points. What did they do well? What did they miss?
2. **Synthesis:** Created 12 NotebookLM folders organizing research by category: user insights, competitor features, design principles, AI opportunities, etc.
3. **Assumption mapping:** Listed every assumption about what users wanted, then validated/invalidated each with data
4. **User personas:** Created highly screened personas (not generic "busy professional," but specific archetypes: "neurodivergent scheduler struggling with time blindness," "privacy-conscious LGBTQ+ user," "polyamorous person managing multiple relationships")

**Why this matters:**
Most teams skip this. They build wireframes, test them, and then realize they've solved the wrong problem. We validated the problem first. This prevented the "build trap"—building the wrong thing really well.

**Cost: $0 (just team time)**

---

### **Phase 2: Strategic Design Decisions (Weeks 9-16)**

Armed with research, we created a prioritization matrix:
- Does this solve a research-backed pain point?
- Can we validate it with users?
- Does it differentiate us from competitors?
- Development effort?

This framework eliminated 60+ feature ideas and forced us to focus on the core 5-6 that mattered most.

**Features we chose to build:**
- Granular permission controls (massive research validation)
- Orbit feature (visual relationship tracking; unique to us)
- Signals (covert availability broadcast; niche but powerful)
- Customizable notifications
- Natural language event input
- Optional AI-assisted rescheduling

**Features we consciously decided NOT to build (yet):**
- Complex calendar integrations (complicates UX)
- Group management at scale (niche for now)
- Advanced AI features (no user testing yet)

**Cost: $0**

---

### **Phase 3: Prototype, Test, Iterate (Weeks 17-24)**

Here's where AI became strategic (not hype).

**AI Use Case 1: Iconography & Brand Development**
- **Problem:** Needed unique, neurodivergence-friendly visual language
- **Traditional approach:** Hire designer ($5,000-10,000), take weeks
- **Our approach:** AI-generated initial concepts as inspiration; we refined, tested, iterated
- **Result:** Cohesive icon system aligned with our brand + accessible design principles
- **Cost: $50 (AI tool subscription)**
- **Time: 2 weeks vs. 6-8 weeks**

**AI Use Case 2: Animations & UI Elements**
- **Problem:** Needed smooth, playful animations; circular calendar felt complex
- **Traditional approach:** Hire animator ($8,000+)
- **Our approach:** AI generated animation ideas; developers refined them
- **Result:** Smooth, accessible animations that enhance UX without gimmicks
- **Cost: $50 (included in tools)**
- **Time: 1 week vs. 3-4 weeks**

**AI Use Case 3: Secondary Research Synthesis**
- **Problem:** Analyzing 300+ reviews + interview transcripts manually would take weeks
- **Traditional approach:** Hire research analyst ($2,000-3,000)
- **Our approach:** AI-assisted synthesis of themes (with human validation at every step)
- **Result:** Identified 15 core themes from raw research in days, not weeks
- **Cost: $0 (used free tier tools)**
- **Time: 3 days vs. 2-3 weeks**

**AI Use Case 4: Development & Bug Testing**
- **Problem:** Backend complexity; edge cases in permission logic
- **Traditional approach:** Senior dev time ($150+/hr, 40+ hours)
- **Our approach:** AI-assisted code review, bug identification, testing scenarios
- **Result:** Cleaner, more robust code; caught edge cases early
- **Cost: $100 (dev subscription)**
- **Time: 20 hours vs. 50+ hours**

**What We Did NOT Use AI For (Critical):**
- Research decisions (humans did that)
- Deciding what to build (humans did that)
- User testing (humans did that—we ran 5 rounds of usability testing)
- Privacy/security decisions (humans did that)
- Copy & brand voice (humans did that; AI suggestions were mostly rejected)

**User Testing Process:**
- Round 1: Wireframes with 8 users (permission controls confusing; iterated)
- Round 2: Hi-fi prototype with 12 users (orbit feature loved; notification timing tweaked)
- Round 3: Beta version with 25 users (found edge cases in multi-calendar view)
- Round 4: Private beta with 40 users (accessibility issues caught; fixed)
- Round 5: Pre-launch with 60 users (final polish)

**Each round informed the next.** We didn't build-and-hope; we validated constantly.

**Total cost for this phase: $600 (tools, Upwork dev for one specific Flutter challenge)**

---

### **Phase 4: Branding, Marketing, Community (Weeks 24-26)**

**Brand Development:**
- AI-generated initial concepts → human refinement → user testing
- A/B tested brand messaging on Reddit with our target audiences
- Learned: Users rejected CTAs; responded to conversational, educational content
- Learned: Users okay with AI animations/icons; rejected AI-generated video with fake humans

**Community Building:**
- Launched Discord
- Organized biweekly design jams (users actively shaping the product in real-time)
- Posted behind-the-scenes content; no polished marketing, just transparency

**Cost: $150 (Discord bots, research tools)**

---

## The Cost Breakdown: Why $800 vs. $150,000?

### **Traditional Development (2-3 Years Ago)**
- Senior product manager: $200/hr × 1,000 hrs = $200,000
- UX researcher: $150/hr × 800 hrs = $120,000
- UX designer: $180/hr × 600 hrs = $108,000
- Frontend developer: $150/hr × 1,200 hrs = $180,000
- Backend developer: $150/hr × 1,200 hrs = $180,000
- QA/testing: $100/hr × 400 hrs = $40,000
- Project manager: $100/hr × 300 hrs = $30,000
- **Total: ~$858,000 (scaled down to ~$150,000 for a lean team)**

### **Our Approach (2025, AI-Enabled)**
- Team time: DONATED (3 founders working for free = value of ~$500,000 in senior salaries, but we're not billing it; we're building equity)
- AI tools: $800 (Upwork for one specific Flutter expert consultation; design tools; research synthesis)
- Infrastructure: $0 (using free/open-source where possible)
- **Total cash spend: $800**

### **Why the Gap?**
1. **Research-first methodology prevented rework:** We knew what to build before we built it
2. **Intentional AI use eliminated low-value tasks:** Synthesis, initial concepts, testing scenarios
3. **Neurodivergent team structure:** Diverge/converge meant we didn't get stuck in analysis paralysis or build unnecessary features
4. **User validation at every step:** Caught issues early instead of discovering them post-launch
5. **Ruthless prioritization:** We said "no" to 60+ features; focused on core differentiators

**The industry benchmark:** AI tools reduce development costs by 30-40% while maintaining timeline/quality. We're seeing 98% cost reduction because we added UX rigor on top of AI efficiency.

---

## The Results: What We Proved

### **Product Quality**
- Launched with zero critical bugs
- 95% of beta testers said they'd recommend to friends (net promoter score territory)
- 3 features competitors don't have (granular permissions, orbit, signals)
- Designed specifically for neurodivergent brains (circular time view, customizable notifications, low-friction privacy)

### **Market Positioning**
- Differentiated from Google Calendar (privacy-first, relationship-focused)
- Differentiated from Howbout (accessible, complex relationships supported)
- Differentiated from Proton Calendar (social features + privacy)
- Differentiated from Weel Planner (sophisticated data architecture, community co-design)

### **Team Efficiency**
- 3 people (all neurodivergent) > most teams of 12
- Diverge/converge framework enabled deep problem-solving + fast prioritization
- Async work + structured sync time = no burnout (yet), sustainable pace

### **Community**
- Discord community actively co-designing product
- Biweekly design jams with 20-40 users participating
- Users feel heard and invested in product success

---

## How UX & AI Complement Each Other (And Why Most Companies Get It Wrong)

### **The Mistake Most Teams Make:**
They treat AI as a replacement for humans. "Let's use AI to generate user research, speed up design, replace designers." Result: generic products that don't connect with anyone.

### **How We Use AI (The Right Way):**
- **AI amplifies human creativity:** We show AI concepts to humans; humans decide what's good
- **AI handles low-value tasks:** Synthesis, initial brainstorms, testing edge cases
- **Humans make high-value decisions:** Research, strategy, what to build, validation
- **Result:** We move faster without losing rigor

**Example: Notification Design**
- We tested 47 different notification approaches (obsessive, but that's neurodivergence working for us)
- AI helped us generate variations quickly
- Humans tested each one with users
- Users told us what worked
- We shipped the winner

Compare this to:
- Company A: "Let's use AI to design notifications." Ship first idea. Users hate it.
- Company B: "AI is a gimmick." Manually test 5 approaches. Miss the good ones.
- Company C (us): "AI generates variations; humans validate." Test 47, ship the best.

---

## The Secret Weapon: Diverge/Converge in a Neurodivergent Team

Most teams see ADHD/autism as a limitation. We see it as an advantage when structured right.

**Diverge Phase:**
- Hyperfocus on edge cases others miss
- Pattern-matching across data
- Creative rabbit holes that lead to breakthroughs
- Permission to explore weird ideas

**Converge Phase:**
- Ruthless prioritization (use matrix)
- Synthesis (what actually matters?)
- Challenge assumptions
- Focus on differentiation

**Structure that Makes It Work:**
- Async communication (documentheavy, not meeting-heavy)
- Core sync times (strategic collaboration)
- Documented decisions (so we don't relitigate)
- Weekly check-ins including emotional health ("how are we feeling, not just what got done")
- Weekends for unstructured exploration

**Result:** We shipped something competitors with twice the budget couldn't ship.

---

## The Moat: Why Google Can't Just Copy This Overnight

Stakeholders ask: "Google could build this in two weeks."

Here's why our moat isn't about features—it's about culture, methodology, and community:

1. **Community Co-Design:** Our users are literally building the product with us. They're not just beta testers; they're partners. That loyalty is hard to replicate.

2. **Research Rigor:** We didn't guess; we validated. Every feature traces back to user data. Most products can't say that. Replicating this takes time and discipline, not just money.

3. **Values Alignment:** We've made hard commitments (never IPO, no data harvesting, living wages, LGBTQ+ and neurodivergence support). These aren't marketing; they're operational. Google could clone features, but they can't clone our values without a fundamental company restructuring.

4. **Neurodivergent-First Design:** Built *for* this community, not *for* mainstream and retrofitted for accessibility. Every design decision reflects ND strengths. This requires lived experience, not just research.

5. **Relationship-First Positioning:** While Google Calendar is tools-first, we're relationship-first. Different mental model. Hard to retrofit.

**What Google *can* replicate:** The specific features (permissions, nudges, orbit visuals).
**What Google *can't* replicate:** The culture, the community, the authenticity, the methodological rigor, the lived understanding of loneliness and relationship maintenance in 2025.

---

## Why This Matters Now (Market Timing)

1. **Loneliness is a public health crisis:** Surgeon General's advisory. Users are desperate for tools that help them connect, not just schedule.

2. **Neurodivergent market is exploding:** Diagnosed adult ADHD rates up 5x in past decade. Autistic self-identification increasing. This is a $10B+ addressable market.

3. **Privacy is becoming table-stakes:** Post-Cambridge Analytica, post-TikTok concerns, post-Google data harvesting revelations, users want tools they can trust. Privacy-first isn't niche; it's the future.

4. **LGBTQ+ and polyamorous communities are mainstream:** Gen Z doesn't fit traditional relationship models. Tools need to reflect that reality. We're not niche; we're building for how people actually live.

5. **AI Maturity:** AI tools are good enough now to augment (not replace) human creativity. We're at the inflection point where UX + AI = competitive advantage that's hard to replicate.

---

## Lessons We're Open-Sourcing (So You Can Replicate)

### **1. Research Process (Months 1-2)**
- Scrape competitor reviews (we used JavaScript, open-source scrapers)
- Conduct screened user interviews (we targeted Reddit communities)
- Create assumption maps (we used simple Google Docs templates)
- Build user personas (ours were specific: "neurodivergent time-blind scheduler," not "busy professional")
- Store everything in NotebookLM (or similar) for reference

**Why this works:** You'll discover the real problem before building the wrong solution. Saves months and thousands of dollars.

### **2. Prioritization Matrix**
Score every feature idea on:
- Research validation? (yes/no/partial)
- User validation? (yes/no)
- Differentiator vs. competitors? (yes/no)
- Development effort? (1-10 scale)

**Our formula:** Only build if research-validated + differentiates + low/medium effort. Say no to everything else.

**Why this works:** You'll focus on what matters instead of building everything.

### **3. AI Workflow**
- **AI generates:** Initial concepts, variations, edge cases, synthesis of data, code review suggestions
- **Humans decide:** What's good, what to build, how to test, final quality
- **A/B test everything** with real users before shipping

**Why this works:** You get the speed of AI without the risk of shipping something generic.

### **4. Diverge/Converge Framework (For Any Team, Not Just ND)**
- **Diverge time (unstructured):** Explore, investigate, no judgment
- **Converge time (structured):** Prioritize, decide, focus
- **Mix of both:** Async exploration + sync decision-making
- **Documentation:** Write down decisions so you don't relitigate

**Why this works:** You get innovation without chaos. You get speed without sacrificing quality.

### **5. Design Principles for Neurodivergence**
- Circular time views (for brains that don't perceive linear time)
- Customizable everything (no one-size-fits-all)
- Reliable notifications (that actually hold attention)
- Low cognitive load (every interaction should be effortless)
- Privacy granularity (different people, different access levels)

**Why this works:** You design for the hardest-to-serve users. When you nail accessibility, everyone benefits.

### **6. Community Co-Design Process**
- Host biweekly design sessions (Discord works great)
- Let users watch you work in real-time
- Ask for feedback on specific decisions
- Make changes based on feedback
- Thank users publicly when their idea ships

**Why this works:** Users feel invested. They become advocates. They help you catch issues before they're problems.

---

## What We're Looking For (So You Know How to Partner)

### **1. Talent (Engineering, Marketing, Operations)**
- Who we need: People with bias for action, mission alignment, willingness to work lean
- What we offer: Early equity, meaningful work, collaborative culture, living wage when we raise capital
- Timeline: Immediate

### **2. Investment (If Values-Aligned)**
- What we're looking for: Investors who believe in UX-first product development, privacy, supporting LGBTQ+ and neurodivergent communities
- What we're not looking for: Anyone optimizing for unicorn valuations or pushing for unsustainable growth
- Timeline: Open; raising seed when right investors appear

### **3. Partnerships**
- Product partnerships: Companies building for similar audiences who want to co-market
- Distribution partnerships: Platforms reaching Gen Z, LGBTQ+, neurodivergent communities
- Publishing partnerships: Podcasts, conferences, media outlets interested in the story

### **4. Consulting**
- We're documenting our methodology (research process, diverge/converge, AI workflow, community co-design)
- Fortune 500s are interested in "how to do UX right" — we can teach this
- Design/product teams can license our framework
- Speaking engagements, workshop facilitation

---

## The Bottom Line

We spent $800 and 6 months to build an app that would have cost $150,000 and 12+ months two years ago. Even with today's AI tools, competitors are spending 10-100x more and taking longer.

**Why?** Because we put UX first.

Not UX as a feature. Not UX as a department. UX as the core strategic framework that guides every decision: What to build, why to build it, how to build it, who to hire, what to say, how to test.

When you add **intentional AI use** (not hype-driven), **neurodivergent problem-solving** (diverge/converge), and **community co-design** on top of that, you get something competitors with 100x the budget can't replicate.

That's not luck. That's strategy.

---

## What Happens Next

**Immediate (Next 90 Days):**
- Complete MyOrbit beta launch (end of November)
- Grow community to 500+ engaged users
- Recruit first collaborators (dev, marketing, partnerships)
- Land 2-3 podcast interviews sharing this methodology

**Short-term (6 Months):**
- Validate product-market fit (target: 20% MoM growth, 40%+ retention)
- Launch SpoonSaver (parallel product for neurodivergent mental energy tracking)
- Begin consulting/methodology licensing (teach other companies how we did this)
- Raise seed capital from aligned investors (if right partners appear)

**Long-term (1-2 Years):**
- Build Anthropologica into a venture studio launching 3-5 products
- Establish ourselves as thought leaders in UX + neurodivergence + AI
- Create industry-standard methodology for how to do this right
- Prove that values-first, user-first companies can compete with VC-backed giants

---

## Why This Story Matters Beyond MyOrbit

This isn't just "we built an app cheaper." It's proof that:

1. **UX methodology is an unfair competitive advantage** (even against AI hype)
2. **Neurodivergent teams aren't a liability; they're a superpower** (when structured right)
3. **You don't need VC capital to build something great** (you need focus and rigor)
4. **AI amplifies human judgment; it doesn't replace it** (done right, it's magical)
5. **Privacy and values aren't marketing; they're defensible strategy** (and they attract the right people)
6. **Loneliness is a real problem** (and most products aren't solving it)

If you're tired of the startup hype cycle, tired of companies harvesting your data, tired of calendars (and products) designed for people who don't exist, this case study is proof that better is possible.

We're building it. And we're inviting you to help.

---

## Appendix: Methodology Resources

**For anyone wanting to replicate parts of this:**

1. **Research Process:**
   - Competitor review scraping: JavaScript tools (open-source)
   - User interview screening: Create criteria, recruit from Reddit/Discord communities
   - Assumption mapping template: Google Doc template we can share
   - NotebookLM setup: 12 folder structure for organizing insights

2. **Prioritization Matrix:**
   - Google Sheets template (can be shared)
   - Scoring criteria (detailed in full methodology document)
   - How to make ruthless cuts (framework included)

3. **AI Workflow:**
   - Tools we use: [List of specific tools, prompts, workflows]
   - What works, what doesn't: Detailed breakdown
   - A/B testing process: How we validated AI-generated content with users

4. **Diverge/Converge Framework:**
   - How to structure async exploration
   - When to converge and make decisions
   - Documentation system that prevents rehashing
   - Emotional health check-ins (how to support team)

5. **Design Principles for Neurodivergence:**
   - Detailed principles document
   - Before/after examples
   - Accessibility standards we exceeded
   - How to test with ND users

6. **Community Co-Design Process:**
   - Discord setup guide
   - Design jam structure and facilitation tips
   - How to get feedback without leading users
   - How to celebrate user contributions

---

## How to Use This Case Study

**For Investors:** This demonstrates capital efficiency, market opportunity, team capability, and defensible positioning. We're not typical founders; we're methodical, values-driven, and user-obsessed.

**For Press/Media:** "Three neurodivergent UX professionals build $150K app for $800 in 6 months—here's how" is a compelling story. We're available for interviews.

**For Product Teams:** This is a playbook. You can adopt parts of our methodology (research process, prioritization matrix, diverge/converge) immediately.

**For Consulting Opportunities:** We're documenting and teaching this framework to teams wanting to do UX right. We're open for workshops, speaking engagements, methodology licensing.

**For Collaborators/Team Members:** This shows what we're building and how we work. If this resonates, we're hiring.

---

**Questions? Want to discuss partnership, investment, consulting, or collaboration?**

Email us. Join our Discord. Let's talk about building better products for better reasons.
