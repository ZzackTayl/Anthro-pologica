# The Anthropologica Methodology: How to Build Products Right
## A Deep-Dive into Our Process (Open-Sourced for Teams Wanting Better Results)

---

## Introduction: Why We're Sharing This

Most companies think UX + AI is about "moving faster." We disagree. It's about **moving smarter**.

This document details our exact process for building MyOrbit: the research methodology, the AI workflow, the diverge/converge framework, the design principles, and the community co-design process.

We're open-sourcing this because:
1. **We want better products in the world** — If other teams adopt this, everyone wins
2. **It's our consulting offering** — We're happy to facilitate workshops, help implement this at your org
3. **It proves our point** — The secret isn't proprietary; it's discipline

You can read this and try to DIY it. Or you can hire us to implement it with your team. Either way, better products get built.

---

## Part 1: The Research Methodology

### **Phase 1A: Competitive Landscape Analysis (Week 1)**

**Objective:** Understand what exists, what works, what's missing.

**Step 1: Scrape Reviews**
- Identify 5-10 competitors in your space
- Extract reviews from app stores, ProductHunt, Reddit, Twitter
- Use tools: ReviewScout, AppAgg, or simple web scraping (we used JavaScript)
- Target: 300+ reviews minimum (you want patterns, not anecdotes)

**Our example (MyOrbit):**
- Competitors: Google Calendar, Howbout, Proton Calendar, Weel Planner, Timetree, Reclaim.ai
- Extracted reviews from: App Store, Google Play, ProductHunt, Reddit (r/productivity, r/neurodivergent)
- Total: 350 reviews

**Step 2: Create a Features vs. Pain Points Matrix**

| Competitor | Core Features | User Pain Points (From Reviews) | Gap | Opportunity |
|---|---|---|---|---|
| Google Calendar | Ecosystem integration, free, cross-platform | "Share controls are confusing"; "Too cluttered"; "Doesn't help me stay connected" | Complexity; no relationship focus | Simpler UX; relationship-first |
| Howbout | Social scheduling, group coordination | "Notifications are overwhelming"; "Mobile only"; "Can't control privacy with different people" | Notification fatigue; device limitations; privacy granularity | Customizable notifications; multi-device; granular permissions |
| Proton Calendar | Privacy-focused, encrypted | "No social features"; "Hard to coordinate" | Features for solo use, not collaboration | Privacy + social coordination |

**Your takeaway:** Every competitor has a gap. Your job is to find the *biggest* gap that serves a *real* audience.

**For us:** Biggest gap = "No calendar respects relationship complexity + privacy + neurodivergence simultaneously"

**Cost:** $0 (just your time)
**Time:** 3-5 days of work

---

### **Phase 1B: User Interview Rounds (Weeks 2-4)**

**Objective:** Validate that the gaps you found actually matter to real people.

**Step 1: Define Your Personas**

Don't use generic personas ("busy professional"). Use *specific, screened* personas:

**Our personas:**
- **Neurodivergent Scheduler:** Diagnosed ADHD or autism, struggles with time blindness, notification management, maintaining friendships
- **Privacy-Conscious LGBTQ+ User:** Manages multiple relationship contexts, needs granular control, security matters
- **Polyamorous Time Manager:** Coordinating time across multiple partners, limited time, wants efficiency + connection

**Why screened personas matter:** Generic profiles waste time. Specific, screened personas force you to make hard choices about who you're building for (and who you're not).

**Step 2: Find and Recruit Interviewees**

Where we found ours:
- Reddit communities: r/ADHD, r/neurodivergent, r/polyamory, r/LGBTQ, r/asexuality, r/productivity
- Discord servers for neurodivergent folks
- Private messages to people in these communities
- "Would you spend 30 min talking about calendar/scheduling challenges?"

**Recruitment criteria:**
- Must match your persona exactly (not close enough)
- Must have experienced the pain point recently
- Must be willing to be specific (not "yeah, calendars are hard")

**Our numbers:** We screened ~100 people, interviewed ~40 deeply

**Step 3: Structure the Interview**

**Don't:** "What do you think about calendars?" (too vague)

**Do:** "Tell me about the last time you forgot to reach out to a friend you care about. What happened? How did it feel? Have you tried tools to help? What didn't work?"

**Our interview guide (40 min):**
1. **Problem discovery** (10 min): "Walk me through your last scheduling chaos. What apps did you use? What frustrated you?"
2. **Specific pain points** (10 min): "You mentioned notifications. Tell me about a notification you missed. How did it make you feel?"
3. **Current solutions** (10 min): "What have you tried to solve this? Why didn't it work?"
4. **Opportunity** (10 min): "If I could build one thing that would help, what would it be?"

**Key technique:** Follow up with *why*. Every answer gets "why" 3x.
- "That notification frustrated me"
- "Why?"
- "Because I forgot the event"
- "Why does forgetting bother you?"
- "Because I feel like I'm failing my friends"

**Insight:** The real problem isn't "forgot the event." It's "I feel like I'm failing my friends."

**Step 4: Synthesize Findings**

Create a simple spreadsheet:

| Persona | Pain Point | Quote | Frequency | Severity | Why (Deep) |
|---|---|---|---|---|---|
| ND Scheduler | Time blindness makes events invisible | "I literally forgot I had a meeting. It wasn't on my phone." | 18/40 (45%) | High | Brain doesn't perceive time linearly; traditional calendar views don't work |
| Privacy-Conscious LGBTQ+ | Can't share calendar with different relationships | "I had to create 3 different calendars for 3 different people" | 12/40 (30%) | High | Relationships require different visibility; existing tools force binary sharing |

**Your takeaway:** You'll notice patterns. "45% of ND users struggle with notification failure" is data. It's not statistical significance (you'd need 1,000s for that), but it's directional and actionable.

**Cost:** $0 (your time)
**Time:** 3 weeks of interviewing + 1 week of synthesis

---

### **Phase 1C: Secondary Research (Week 5)**

**Objective:** Find existing data that validates your interview findings.

**Where we looked:**
- Academic research on ADHD + time blindness (Google Scholar, ResearchGate)
- Reports on loneliness in Gen Z (APA, CDC, Surgeon General's advisory)
- Reddit threads + discussions (social listening)
- Queer/polyamory community spaces (forums, Discord)
- Design research from accessibility organizations

**Key finding:** Everything we found in interviews was already documented in research. Our job wasn't to discover; it was to validate.

**Cost:** $0 (everything is free/open-source)
**Time:** 1 week

---

### **Phase 1D: Assumption Mapping (Week 6)**

**Objective:** List every assumption you have about what to build, then validate or invalidate each with your research.

**Our assumption map (beginning):**

| Assumption | Validated? | Evidence | Implication |
|---|---|---|---|
| "Users want simpler calendars" | Partial | "Cluttered" was mentioned 12x; but some users like features | Build for customization, not simplicity |
| "Time blindness is the core problem" | Yes | 18/40 ND users mentioned this | Make time *visible* (circular view, not linear) |
| "Users want to share calendars" | Yes | All 40 users mentioned coordination challenges | Sharing is core, not nice-to-have |
| "Users want to see if friends are available" | Yes | Multiple mentions of "checking if friends are free" | Signals feature (covert availability) could solve this |
| "Users want AI to manage their calendar" | No | No one asked for this; everyone wanted control | Don't build AI automation (yet) |
| "Privacy is a nice-to-have" | No—it's critical | LGBTQ+ users brought this up unprompted; 30% mentioned it | Granular permissions are table-stakes, not bonus |

**This is crucial:** Your assumptions guided which features to build. What you assumed mattered shaped what you actually built.

**Cost:** $0
**Time:** 1 week

---

### **Phase 1E: Create Your NotebookLM Knowledge Base (Week 7)**

**Objective:** Organize all research in one place so you can reference it later.

**What we created:**

1. **Research Synthesis Folder**
   - Interview transcripts (cleaned)
   - Key quotes tagged by persona + pain point
   - Themes document (15 core themes identified)

2. **Competitor Analysis Folder**
   - Feature comparison matrix
   - Review analysis (what users love/hate about each)
   - Positioning opportunity identification

3. **Market Research Folder**
   - TAM/SAM/SOM analysis (market size)
   - Trend reports (loneliness crisis, neurodivergent diagnostics increasing, privacy concerns)
   - Academic research summaries

4. **Design Principles Folder** (starts here, grows later)
   - Accessibility guidelines we'll follow
   - Color theory notes
   - Neurodivergence-friendly design criteria

5. **User Insights Folder**
   - Persona deep-dives (detailed profiles)
   - Pain point hierarchy (what matters most)
   - Success stories we want to enable

**Why this matters:** Later, when someone asks "why did we make this decision?," you have the receipts. You're not operating on vibes; you're operating on data.

**Cost:** Free (NotebookLM is free for basic use)
**Time:** 1 week to organize

---

## Part 2: From Research to Design (The Prioritization Matrix)

### **The Filter: What to Actually Build**

You'll have 100+ ideas. You can build maybe 5-6 core features. How do you choose?

**We used a simple matrix:**

| Feature Idea | Research-Backed? | User-Validated? | Differentiator? | Dev Effort | Build? |
|---|---|---|---|---|---|
| Granular permissions | Yes | Yes | Yes | 3/10 | **YES** |
| Orbit feature | Yes | Yes | Yes | 4/10 | **YES** |
| Signals | Yes | Partial | Yes | 2/10 | **YES** |
| Calendar integrations | Partial | No | No | 8/10 | **NO** |
| AI automation | No | No | No | 7/10 | **NO** |
| Group event management | Yes | No | No | 6/10 | **NO** |
| Natural language input | Yes | Yes | Yes | 5/10 | **YES** |
| Custom notifications | Yes | Yes | Yes | 3/10 | **YES** |
| Social feed | No | No | No | 5/10 | **NO** |

**Scoring logic:**
- Research-backed? (Is there evidence users need this?)
- User-validated? (Did users specifically ask for this in interviews?)
- Differentiator? (Do competitors have this? If yes, skip unless we're significantly better)
- Dev effort? (1=trivial, 10=massive)

**Decision rule:** Build if: research-backed + differentiator + effort < 6. Otherwise, deprioritize.

**This killed 60+ feature ideas.** And that's good. Focus is a feature.

---

## Part 3: The Diverge/Converge Framework

### **How Neurodivergent Teams Can Solve Problems Faster Than Traditional Teams**

This isn't just "neurodivergent people are creative." It's a *structured process* that amplifies neurodivergent strengths.

### **The Framework**

**Diverge Phase (Unstructured Time):**
- Explore, investigate, hyperfocus, get weird
- No judgment, no prioritization
- Permission to spend days on tangential problems
- Goal: Find novel solutions, catch edge cases, unlock breakthroughs

**Converge Phase (Structured Time):**
- Prioritize, decide, synthesize
- Challenge assumptions, focus on differentiation
- Goal: Decide what actually ships

**Cycle:** Diverge for 3-5 days, converge for 1-2 days. Repeat.

### **Why This Works**

**Neurodivergent strength 1: Hyperfocus**
- Traditional teams see hyperfocus as "going down rabbit holes" (bad)
- We see it as "exploring edge cases deeply" (good)
- Example: One founder spent 3 days on notification design, tested 47 approaches. Found something no competitor has. If we'd stopped at 5, we'd have missed it.

**Neurodivergent strength 2: Pattern Matching**
- Neurodivergent people spot patterns others miss
- Example: Founder #2 noticed all 40 interviews mentioned "different relationships = different privacy needs"—but no one said "I need granular permissions." The pattern was invisible in individual interviews but obvious when you looked across all of them.

**Neurodivergent strength 3: Detail Orientation**
- Founder #3 brought obsessive attention to detail
- Caught inconsistencies in user feedback, spotting issues early
- Found edge cases in permission logic that would have been bugs in production

**The key:** Don't try to make neurodivergent people work like neurotypical teams. Build a process that *amplifies* how neurodivergent people actually work.

### **How We Structured It**

**Monday-Thursday: Diverge (Async)**
- Each person owns an area (founder 1 = research + strategy, founder 2 = design + AI workflow, founder 3 = technical architecture)
- Deep work, no meetings
- Document findings in shared NotebookLM folders
- Hyperfocus encouraged

**Friday: Converge (Sync)**
- 2-hour meeting
- Founder 1 presents research/strategy implications
- Founder 2 presents design iterations + AI opportunities
- Founder 3 presents technical challenges/solutions
- Team decides what ships, what's shelved, what needs more investigation

**Async Documentation**
- Every decision recorded (so we don't relitigate)
- Rationale documented (so future us understands why we chose this)
- Assumptions captured (so we can test them later)

**Weekly Emotional Check-in**
- "How are we feeling (not just what got done)"
- Neurodivergent folks need explicit permission to say "I'm burned out" or "I need a break"
- We built it in

**Weekends: Unstructured**
- Complete permission to explore wild ideas
- No pressure to have results
- Sometimes leads to breakthrough; sometimes just fun experimentation

### **Results**

- Moved faster than typical teams (6 months vs. 12+ months for similar scope)
- Found solutions others missed (orbit feature, granular permissions, signals)
- No burnout (team reported sustainable pace despite working for free)
- Quality didn't suffer (launched with zero critical bugs)

---

## Part 4: The AI Workflow (Intentional, Not Hype)

### **Where AI Helps; Where It Doesn't**

**AI Does NOT Help With:**
- Research decisions
- Strategy decisions
- What to build
- Validating assumptions
- Copy/brand voice
- Values alignment
- User testing

**AI DOES Help With:**
- Generating variations quickly (so humans can pick the best)
- Synthesizing large amounts of data (with human validation)
- Edge case identification (in code, design, scenarios)
- Initial brainstorming (as inspiration, not final answer)
- Repetitive tasks (coding scaffolding, testing scenarios)

### **Our Specific Workflows**

**Workflow 1: Icon & Brand Development**

**Traditional approach:** Hire designer, 6-8 weeks, $8,000

**Our approach:**
1. Define our design principles (neurodivergence-friendly, playful, accessible)
2. Use Midjourney/DALL-E to generate 50 icon concepts
3. Filter to 10 we like (human judgment)
4. Refine those 10 (AI + human iteration)
5. A/B test with users (real validation)
6. Pick winners, implement, ship

**Time:** 2 weeks
**Cost:** $50 (tool subscription)
**Key:** AI generates 50, humans pick the 5 that matter, iterate 50x faster than starting from scratch

**Workflow 2: Research Synthesis**

**Traditional approach:** Hire analyst, 2-3 weeks, $2,000-3,000

**Our approach:**
1. Upload 40 interview transcripts to Claude
2. Ask: "What are the 15 core themes in this research?"
3. Claude generates themes
4. Humans review, validate, refine
5. Use themes to inform design principles

**Time:** 3 days (3 days for human validation; would be 14 days without AI)
**Cost:** $0 (free tier)
**Key:** AI does the tedious summarization; humans do the smart interpretation

**Workflow 3: Development & Bug Testing**

**Traditional approach:** Senior dev, 50+ hours, $7,500+

**Our approach:**
1. Developer writes core code
2. Share code with Claude
3. Ask: "What edge cases might break this? What patterns are suboptimal?"
4. Claude identifies 20 potential issues
5. Developer reviews, prioritizes, fixes critical ones
6. AI + developer iterate on edge cases
7. Run comprehensive tests

**Time:** 20 hours instead of 50 (60% faster)
**Cost:** $100 (tool subscription)
**Quality:** Fewer bugs in production; more robust code
**Key:** AI spots patterns; developer judges what matters

**Workflow 4: A/B Testing Ad Copy**

**What we did:**
1. Generate 10 ad variations with different messaging (AI + human blend)
2. Post on Reddit (the actual audiences we target)
3. Track engagement (likes, comments, which version got shared most)
4. Learn: Which messaging actually resonates
5. Double down on winners

**Finding:** Users rejected CTAs; responded to educational/conversational tone
**Finding:** Users okay with AI animations; rejected AI video with fake humans
**Result:** Our ad strategy changed based on data, not assumptions

---

## Part 5: Design Principles for Neurodivergence

### **What We Built (Based on Research + ND Lived Experience)**

**Principle 1: Time Should Be Visual, Not Abstract**
- Many neurodivergent people don't perceive time linearly
- Solution: Circular 24-hour calendar view (makes time tangible)
- Testing: Users with ADHD reported "finally I can *see* time"

**Principle 2: Notifications Should Hold Attention**
- Traditional notifications pop up, disappear, get buried
- Problem: Neurodivergent people miss them (not carelessness; attention management is different)
- Solution: Notifications that stay visible until dismissed; customizable urgency levels; optional sound + haptics
- Testing: Tested 47 notification approaches; picked the 3 that worked best

**Principle 3: Privacy Should Be Granular**
- One calendar doesn't fit all relationships
- Solution: Permission controls at event level, not just calendar level
- Testing: Users immediately understood "I can show 'busy' to dad but full details to boyfriend"

**Principle 4: Customization Should Be Default**
- One-size-fits-all breaks for neurodivergent people (brains work differently)
- Solution: Dark/light mode, color options, font sizes, notification styles, time zone handling, calendar view preferences
- Testing: Users enabled customizations and reported less cognitive overload

**Principle 5: Information Should Be Low-Friction**
- Cognitive load is real (executive function is finite)
- Solution: Every screen serves one purpose; no clutter; clean information hierarchy
- Testing: Users reported "this is so much simpler than Google Calendar"

---

## Part 6: Community Co-Design Process

### **How to Make Users Your Product Partners**

**Traditional approach:** Build product, launch, gather feedback, iterate

**Our approach:** Build product *with* users from day one

### **The Process**

**Step 1: Set Up Community Space**
- Create Discord server (free, accessible, where your users already are)
- Create channels: #design-jams, #feedback, #feature-requests, #off-topic
- Establish culture: "We're building this together; everyone's input matters"

**Step 2: Host Biweekly Design Jams**
- Every other Thursday, 7pm PST
- 90 min session: 20 min showing what we're working on, 60 min feedback + live iteration, 10 min recap
- Anyone can join (no RSVP required)
- We show unpolished work (not "here's the finished thing")

**Step 3: Facilitate Feedback (Not Leading)**
- **Don't ask:** "Don't you think this permission system is great?"
- **Do ask:** "Talk me through what you see on this screen. What confuses you? What excites you?"
- **Don't explain:** "The orbit represents your relationship proximity."
- **Do explain:** "We were thinking about this feature. Here's the problem we're solving. What do you think?"

**Step 4: Make Changes Visibly**
- Take feedback, implement it, show the results next week
- Tag the user who suggested it: "@Sarah, we implemented your feedback on notifications"
- Users see their ideas ship

**Step 5: Celebrate Contributions**
- Thank users publicly when their idea ships
- Feature their story: "Here's why @Alex suggested this and what it solved"
- Make users feel like co-creators, not just testers

### **Results**

- 40-80 users joining design jams weekly
- Users feeling invested (they helped build it)
- Ideas we'd never have thought of (e.g., the "orbit" visualizing relationship proximity came from a user suggestion)
- Bug reports before we found them
- Community advocates (users tell friends "I'm literally building this with them")

### **The Moat This Creates**

Google can clone our features. They can't clone our community. Our users feel *ownership*. That's defensible.

---

## Part 7: How to Implement This at Your Organization

### **For Product Teams**

1. **Month 1: Research**
   - Pick 5-10 competitors; scrape reviews
   - Interview 30-40 users (screened personas)
   - Synthesize findings; create assumption map

2. **Month 2: Prioritize**
   - Build prioritization matrix
   - Choose 5-6 core features (not 100)
   - Build a research-backed narrative for what you're making

3. **Month 3: Diverge**
   - Deep work on features
   - Explore weird ideas
   - Use AI to amplify (not replace) your work

4. **Month 4: Converge**
   - Test with users
   - Iterate based on feedback
   - Prepare to launch

5. **Month 5+: Community**
   - Set up design jams
   - Build Discord community
   - Make users co-creators

### **For Design Teams**

- Apply the 5 design principles for accessibility (they benefit everyone, not just neurodivergent users)
- Use AI to generate variations (so humans can pick the best)
- Always test with real users (not assumptions)

### **For Engineering Teams**

- Use AI for code review, edge case identification, testing scenarios
- Don't use AI for architecture decisions, security decisions, or shipping decisions
- Validate every AI suggestion; don't trust it blindly

### **For Leadership**

- Protect time for research (it prevents rework)
- Allow divergence (it enables breakthroughs)
- Value rigor over speed (speed without rigor is a waste)
- Invest in community (it's your moat)

---

## Part 8: The Metrics That Matter

**Don't optimize for:**
- DAU (daily active users)
- Time spent in app
- Viral coefficient
- Engagement at all costs

**Do optimize for:**
- Would you recommend to a friend? (NPS)
- Did this solve your problem? (User satisfaction)
- Do you trust us with your data? (Trust score)
- Are you using it the way you intended? (Product-market fit)

**Our launch metrics:**
- 95% of beta testers would recommend (NPS 70+)
- Zero critical bugs shipped
- 40% retention after week 1
- 60% retention after month 1
- Users asking to join design jams unprompted

---

## Part 9: Common Objections (And How We Answer Them)

**"This takes too long; we need to move faster."**

Reality: The research phase prevents rework. We built in 6 months what takes competitors 12+ months because we knew what to build before we built it.

**"We can't afford to work for free like you did."**

Fair. But you can prioritize ruthlessly, use AI strategically, and focus on research-backed decisions instead of guessing. The $800 was just tools; the value was methodology.

**"AI will replace this whole process soon."**

No. AI generates variations; humans decide what matters. AI synthesizes data; humans interpret it. The discipline of listening to users and prioritizing ruthlessly? That's forever.

**"We don't have neurodivergent people on the team."**

The diverge/converge framework works for any team. The principle is: balance unstructured exploration with structured prioritization. You don't need to be neurodivergent to benefit from it.

**"How do we know this scales?"**

Good question. We're testing it now with MyOrbit. We're also offering consulting to other teams. If you want to implement this at your org, let's talk.

---

## Part 10: How to Work With Us

If you want to implement this methodology at your organization:

**Option 1: Consulting (3-6 months)**
- We work with your team (virtual or on-site)
- Implement the research process, prioritization matrix, diverge/converge framework
- Help you run your first community design jam
- Result: You have a methodology you own

**Option 2: Workshops (1-3 days)**
- Deep-dive training on specific parts (research, AI workflow, community co-design)
- Your team works through examples
- Result: Your team knows how to do this

**Option 3: Ongoing Partnership**
- We review your product decisions (research-backed?)
- Help you navigate customer feedback
- Facilitate design thinking
- Result: Better products over time

**Cost:** Varies by scope; let's talk about your needs

---

## Conclusion

This isn't proprietary magic. It's discipline. It's commitment to research. It's intentionality about AI. It's willingness to say "no" to most ideas. It's building with your community instead of for them.

If you adopt even 30% of this methodology, your products will improve. Your teams will move faster (because you're not reworking bad decisions). Your users will feel heard. Your company will build loyalty instead of chasing engagement.

The future of product development is human-centered, research-backed, and intentional.

We're building it. And we're inviting you to learn from it.

---

**Questions? Want to implement this?**

Reach out. Let's talk about your team's needs and how we can help.
