export type ResourceCategory = 
  | 'getting-started'
  | 'research'
  | 'design-systems'
  | 'accessibility'
  | 'neurodivergent'
  | 'ai-tools'
  | 'templates'
  | 'case-studies';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  difficulty: DifficultyLevel;
  readTime: string;
  tags: string[];
  content: string;
  downloadUrl?: string;
  externalUrl?: string;
  author: string;
  publishedDate: string;
}

export const resources: Resource[] = [
  {
    id: 'ux-fundamentals',
    title: 'UX Design Fundamentals: A Complete Guide',
    description: 'Master the core principles of user experience design, from user research to prototyping',
    category: 'getting-started',
    difficulty: 'beginner',
    readTime: '15 min',
    tags: ['UX Basics', 'Design Thinking', 'User Research'],
    author: 'Anthro-Pologica Team',
    publishedDate: '2024-10-15',
    content: `
# UX Design Fundamentals

## What is UX Design?

User Experience (UX) design is the process of creating products that provide meaningful and relevant experiences to users. It encompasses the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.

## Core Principles

### 1. User-Centered Design
Always put your users first. Understand their needs, behaviors, and pain points through research and empathy.

### 2. Consistency
Maintain consistency in design patterns, terminology, and interactions throughout your product.

### 3. Accessibility
Design for everyone, including users with disabilities. Accessibility is not optional: it's essential.

### 4. Clarity
Make your interface intuitive. Users should understand how to accomplish their goals without confusion.

### 5. Feedback
Provide clear feedback for every user action. Users should always know what's happening in your system.

## The UX Design Process

1. **Research**: Understand your users and their context
2. **Define**: Synthesize research findings and define problems
3. **Ideate**: Generate creative solutions
4. **Prototype**: Create testable versions of your ideas
5. **Test**: Validate your designs with real users
6. **Iterate**: Refine based on feedback

## Getting Started

Begin by observing how people interact with existing products. Take notes on what works well and what causes frustration. Practice empathy by putting yourself in users' shoes.

## Resources for Further Learning

- Nielsen Norman Group articles
- UX Design courses on Coursera and Udemy
- Books: "Don't Make Me Think" by Steve Krug, "The Design of Everyday Things" by Don Norman
    `,
  },
  {
    id: 'user-research-methods',
    title: 'Essential User Research Methods',
    description: 'Learn when and how to use different research methods for maximum insight',
    category: 'research',
    difficulty: 'intermediate',
    readTime: '20 min',
    tags: ['User Research', 'Interviews', 'Usability Testing', 'Analytics'],
    author: 'Dr. Maya Chen',
    publishedDate: '2024-09-28',
    content: `
# Essential User Research Methods

## Qualitative vs Quantitative Research

Understanding the difference between qualitative and quantitative research is crucial for selecting the right methods.

### Qualitative Research
- **Goal**: Understand the "why" behind user behavior
- **Methods**: Interviews, contextual inquiry, ethnographic studies
- **Output**: Rich insights, quotes, behavioral patterns

### Quantitative Research
- **Goal**: Measure what users do and how often
- **Methods**: Surveys, analytics, A/B testing
- **Output**: Numbers, statistics, trends

## Top Research Methods

### 1. User Interviews
**When to use**: Early discovery, understanding user needs
**Participants**: 5-8 users per user segment
**Duration**: 30-60 minutes per interview

**Best Practices**:
- Prepare open-ended questions
- Listen more than you talk
- Ask "why" to dig deeper
- Record and transcribe interviews

### 2. Usability Testing
**When to use**: Validating designs, finding usability issues
**Participants**: 5-8 users (Nielsen's law)
**Duration**: 30-45 minutes per session

**Best Practices**:
- Create realistic scenarios
- Encourage thinking aloud
- Don't help or guide users
- Observe non-verbal cues

### 3. Surveys
**When to use**: Gathering quantitative data at scale
**Participants**: 100+ for statistical significance
**Duration**: 5-10 minutes to complete

**Best Practices**:
- Keep it short and focused
- Use clear, unbiased language
- Mix question types (multiple choice, scale, open-ended)
- Pilot test before launching

### 4. Card Sorting
**When to use**: Understanding mental models, organizing information architecture
**Participants**: 15-20 users
**Duration**: 20-30 minutes

**Types**:
- Open card sorting: Users create their own categories
- Closed card sorting: Users sort into predefined categories

### 5. Contextual Inquiry
**When to use**: Understanding workflow in natural environment
**Participants**: 5-10 users
**Duration**: 1-2 hours per session

**Approach**: Observe users in their environment while they work, asking questions to understand their process.

## Creating a Research Plan

1. Define research questions
2. Choose appropriate methods
3. Recruit participants
4. Prepare materials
5. Conduct research
6. Analyze findings
7. Share insights with team

## Ethics in User Research

- Always get informed consent
- Protect participant privacy
- Be transparent about how data will be used
- Offer compensation for time
- Allow participants to withdraw at any time
    `,
  },
  {
    id: 'design-system-starter',
    title: 'Building Your First Design System',
    description: 'Step-by-step guide to creating scalable, maintainable design systems',
    category: 'design-systems',
    difficulty: 'intermediate',
    readTime: '25 min',
    tags: ['Design Systems', 'Components', 'Tokens', 'Documentation'],
    author: 'Alex Rivera',
    publishedDate: '2024-10-01',
    content: `
# Building Your First Design System

## What is a Design System?

A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.

## Benefits

- **Consistency**: Unified visual language across products
- **Efficiency**: Faster design and development
- **Scalability**: Easy to expand and maintain
- **Quality**: Higher standards through reusable patterns
- **Collaboration**: Better communication between design and development

## Components of a Design System

### 1. Design Tokens
Foundation of your system - colors, typography, spacing, etc.

**Example Structure**:
\`\`\`
Color Tokens:
- primary-500: #ff00ff
- neutral-900: #0a0514
- success-500: #00ff88

Spacing Tokens:
- space-xs: 4px
- space-sm: 8px
- space-md: 16px
\`\`\`

### 2. Component Library
Reusable UI components like buttons, inputs, cards, etc.

**Component Anatomy**:
- Variants (primary, secondary, ghost)
- States (default, hover, active, disabled)
- Sizes (small, medium, large)
- Props and API

### 3. Patterns
Common solutions for recurring problems (forms, navigation, data display)

### 4. Documentation
Clear guidelines on when and how to use components

## Getting Started: 5-Step Process

### Step 1: Audit Existing Design
- Collect all UI components currently in use
- Identify inconsistencies
- Look for patterns

### Step 2: Define Design Tokens
Start with the foundation:
- Color palette (primary, secondary, neutrals, semantic colors)
- Typography scale
- Spacing scale
- Border radius values
- Shadow levels

### Step 3: Create Core Components
Begin with the most-used components:
1. Button
2. Input fields
3. Typography
4. Cards
5. Navigation

### Step 4: Document Everything
For each component, document:
- When to use it
- Variants and states
- Accessibility considerations
- Code examples
- Do's and don'ts

### Step 5: Implement and Iterate
- Start with a pilot project
- Gather feedback from designers and developers
- Iterate based on real-world usage

## Tools for Design Systems

**Design**: Figma, Sketch, Adobe XD
**Development**: Storybook, Chromatic
**Documentation**: Storybook Docs, ZeroHeight, Notion
**Version Control**: Abstract, Figma branching

## Naming Conventions

Use clear, semantic names:
- ✅ \`button-primary-large\`
- ❌ \`btn-blue-big\`

Follow BEM or similar methodology for CSS classes

## Accessibility First

Every component should be:
- Keyboard accessible
- Screen reader friendly
- WCAG 2.1 AA compliant minimum
- Color contrast compliant

## Maintaining Your Design System

- Regular audits and updates
- Version control
- Change logs
- Feedback channels
- Governance model

## Common Pitfalls to Avoid

1. **Over-engineering**: Start simple, add complexity as needed
2. **No governance**: Define who can make changes
3. **Lack of adoption**: Get buy-in from stakeholders early
4. **Poor documentation**: Invest time in clear docs
5. **Set and forget**: Plan for ongoing maintenance
    `,
  },
  {
    id: 'wcag-accessibility-guide',
    title: 'Web Accessibility: WCAG Guidelines Simplified',
    description: 'Make your designs accessible to everyone with this practical WCAG guide',
    category: 'accessibility',
    difficulty: 'intermediate',
    readTime: '18 min',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design', 'A11y'],
    author: 'Jordan Williams',
    publishedDate: '2024-09-15',
    content: `
# Web Accessibility: WCAG Guidelines Simplified

## Why Accessibility Matters

1 in 4 adults in the US has a disability. Making your product accessible isn't just the right thing to do: it's good business and often legally required.

## The Four Principles (POUR)

### 1. Perceivable
Information and UI components must be presentable to users in ways they can perceive.

**Key Guidelines**:
- Provide text alternatives for images
- Provide captions for videos
- Use sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color to convey information

### 2. Operable
UI components and navigation must be operable.

**Key Guidelines**:
- Make all functionality available from keyboard
- Give users enough time to read and use content
- Don't design content that causes seizures (no flashing more than 3 times per second)
- Help users navigate and find content

### 3. Understandable
Information and UI operation must be understandable.

**Key Guidelines**:
- Make text readable (use clear language)
- Make pages appear and operate in predictable ways
- Help users avoid and correct mistakes

### 4. Robust
Content must be robust enough to work with assistive technologies.

**Key Guidelines**:
- Use valid, semantic HTML
- Ensure compatibility with current and future user tools

## Common Accessibility Issues & Fixes

### Issue: Missing Alt Text
❌ \`<img src="chart.png">\`
✅ \`<img src="chart.png" alt="Bar chart showing 60% increase in user engagement">\`

### Issue: Poor Color Contrast
❌ Light gray text (#999) on white background
✅ Dark gray text (#595959) on white background

### Issue: Non-Accessible Forms
❌ Unlabeled input fields
✅ Properly labeled inputs with error messages:
\`\`\`html
<label for="email">Email Address</label>
<input id="email" type="email" aria-describedby="email-error" />
<span id="email-error" role="alert">Please enter a valid email</span>
\`\`\`

### Issue: Keyboard Traps
❌ Users can tab into a modal but can't escape
✅ Implement proper focus management and ESC key handling

## Semantic HTML is Your Friend

Use the right HTML elements:
- \`<button>\` for buttons, not \`<div onclick>\`
- \`<nav>\` for navigation
- \`<main>\` for main content
- \`<header>\` and \`<footer>\` appropriately
- \`<h1>\` through \`<h6>\` in proper hierarchy

## ARIA: Use Sparingly

ARIA (Accessible Rich Internet Applications) should be used only when semantic HTML isn't enough.

**First Rule of ARIA**: Don't use ARIA if you can use native HTML instead.

**Common ARIA attributes**:
- \`aria-label\`: Provides accessible name
- \`aria-describedby\`: Associates description
- \`aria-hidden\`: Hides decorative elements
- \`role\`: Defines element's role

## Testing Your Accessibility

### Automated Tools
- WAVE (browser extension)
- aXe DevTools
- Lighthouse in Chrome DevTools

### Manual Testing
1. **Keyboard navigation**: Can you use Tab, Enter, Arrow keys to navigate?
2. **Screen reader**: Test with NVDA (Windows), JAWS (Windows), or VoiceOver (Mac)
3. **Zoom to 200%**: Is content still usable?
4. **Color contrast**: Use WebAIM's contrast checker

## Quick Wins for Better Accessibility

1. Add alt text to all images
2. Ensure color contrast meets WCAG AA standards
3. Make sure all interactive elements are keyboard accessible
4. Use proper heading hierarchy
5. Add labels to all form inputs
6. Provide skip links for keyboard users
7. Ensure focus indicators are visible
8. Test with keyboard only
9. Don't autoplay videos
10. Make error messages clear and helpful

## Accessibility Statement

Consider adding an accessibility statement to your website that:
- States your commitment to accessibility
- Lists known issues
- Provides contact information for reporting issues
- Describes available accessibility features

## Resources

- WebAIM: [webaim.org](https://webaim.org)
- W3C WCAG: [w3.org/WAI/WCAG21/quickref](https://w3.org/WAI/WCAG21/quickref)
- A11y Project: [a11yproject.com](https://a11yproject.com)
    `,
  },
  {
    id: 'neurodivergent-design',
    title: 'Designing for Neurodivergent Users',
    description: 'Create inclusive experiences for ADHD, autism, dyslexia, and other neurodivergent conditions',
    category: 'neurodivergent',
    difficulty: 'advanced',
    readTime: '22 min',
    tags: ['Neurodiversity', 'ADHD', 'Autism', 'Dyslexia', 'Inclusive Design'],
    author: 'Anthro-Pologica Team',
    publishedDate: '2024-10-10',
    content: `
# Designing for Neurodivergent Users

## Understanding Neurodiversity

Neurodiversity recognizes that brain differences are normal variations in the human population, not deficits. This includes ADHD, autism, dyslexia, dyspraxia, and more.

**Key Principle**: Design flexibility benefits everyone, not just neurodivergent users.

## Designing for ADHD

### Challenges
- Difficulty focusing on one task
- Easily distracted by visual noise
- Executive dysfunction (starting/completing tasks)
- Working memory issues

### Design Solutions

**1. Minimize Distractions**
- Reduce visual clutter
- Use whitespace generously
- Avoid unnecessary animations
- Provide "focus mode" options

**2. Clear Visual Hierarchy**
- Strong contrast between important and less important elements
- Clear call-to-action buttons
- Obvious next steps

**3. Progress Indicators**
- Show completion status
- Break large tasks into smaller steps
- Celebrate small wins

**4. Time Management Support**
- Visible timers for time-sensitive tasks
- Reminders and notifications (with user control)
- Save progress automatically

**Example**: Task management app with:
- Visual progress bars
- One task visible at a time
- Gentle reminder notifications
- Distraction-blocking mode

## Designing for Autism

### Challenges
- Sensory sensitivities (bright colors, animations)
- Preference for routine and predictability
- Difficulty with abstract concepts
- May take language literally

### Design Solutions

**1. Predictable Patterns**
- Consistent navigation
- No unexpected changes
- Clear cause-and-effect
- Warnings before time-sensitive actions

**2. Sensory Considerations**
- Option to reduce motion
- Adjustable brightness/contrast
- Muted color palettes available
- No auto-playing media

**3. Clear Communication**
- Literal, straightforward language
- Avoid idioms and metaphors
- Provide examples
- Visual instructions alongside text

**4. Routine Support**
- Save user preferences
- Predictable layouts
- Minimal changes to familiar interfaces

**Example**: Calendar app with:
- High contrast mode
- Reduced motion option
- Clear, literal labels ("Add Event" not "New +")
- Consistent visual patterns

## Designing for Dyslexia

### Challenges
- Difficulty reading text
- Letter and word confusion
- Fatigue from reading
- Comprehension issues with dense text

### Design Solutions

**1. Typography**
- Use dyslexia-friendly fonts (OpenDyslexic, Comic Sans)
- Minimum 16px font size
- 1.5x line height or greater
- Left-aligned text (not justified)
- Increased letter spacing

**2. Text Formatting**
- Short paragraphs (3-4 lines max)
- Bullet points over long sentences
- Headings to break up content
- Avoid italics and all-caps

**3. Color & Contrast**
- Avoid pure white backgrounds (use cream/off-white)
- Sufficient contrast, but not stark
- Option to change background color

**4. Alternative Content**
- Provide audio versions
- Use images and icons to support text
- Video captions and transcripts

**Example**: Reading app with:
- Font customization
- Line spacing controls
- Background color options
- Text-to-speech integration

## Universal Design Principles for Neurodiversity

### 1. Provide Choices
Allow users to customize their experience:
- Motion preferences
- Color schemes
- Font choices
- Content density

### 2. Multi-Modal Content
Present information in multiple ways:
- Text + icons
- Written + audio
- Video + captions
- Interactive + static

### 3. Reduce Cognitive Load
- One task at a time
- Clear next steps
- Minimal decision-making required
- Helpful defaults

### 4. Error Prevention & Recovery
- Clear error messages
- Suggest corrections
- Easy undo/redo
- Auto-save functionality

### 5. Flexibility in Pace
- No time limits (or generous ones)
- Option to pause
- Save and return later
- Control over notifications

## Testing with Neurodivergent Users

### Research Considerations
- Longer sessions may be overwhelming
- Provide breaks
- Consider remote testing
- Be flexible with interview formats
- Share questions in advance
- Allow text-based responses

### What to Test
- Can users customize the interface?
- Are transitions predictable?
- Is information clear and literal?
- Can users complete tasks at their own pace?
- Are there overwhelming elements?

## Creating Neurodivergent-Friendly Spaces

### Physical Spaces
- Quiet rooms available
- Control over lighting
- Fidget tools provided
- Clear signage

### Digital Spaces
- Customization options
- Clear navigation
- Reduced sensory input
- Flexible interaction methods

## Resources for Further Learning

- **Books**: 
  - "Neurodiversity Design" by Kat Holmes
  - "Design Meets Disability" by Graham Pullin

- **Organizations**:
  - ADHD Foundation
  - Autism Society
  - British Dyslexia Association

- **Research**:
  - Microsoft Inclusive Design Toolkit
  - BBC's accessibility guidelines for neurodiversity
    `,
  },
  {
    id: 'ai-ux-tools-2025',
    title: 'AI-Powered UX Tools You Need in 2025',
    description: 'Comprehensive guide to leveraging AI for research, design, and testing',
    category: 'ai-tools',
    difficulty: 'intermediate',
    readTime: '16 min',
    tags: ['AI', 'Tools', 'Automation', 'Figma', 'ChatGPT'],
    author: 'Anthro-Pologica Team',
    publishedDate: '2024-10-18',
    content: `
# AI-Powered UX Tools You Need in 2025

## The AI Revolution in UX

AI is transforming every stage of the UX process, from research to prototyping. Here's how to leverage it effectively.

## Research & Analysis

### 1. AI-Powered User Interview Analysis
**Tools**: Dovetail, UserTesting AI Insights, Notably

**Capabilities**:
- Auto-transcription of interviews
- Sentiment analysis
- Theme identification
- Insight clustering

**Best Practices**:
- Review AI-generated themes manually
- Use AI for speed, not replacement of analysis
- Look for patterns AI might miss

### 2. Predictive Analytics
**Tools**: Amplitude, Mixpanel, Google Analytics 4

**Capabilities**:
- Predict user churn
- Forecast feature adoption
- Identify at-risk users
- Recommend personalization strategies

### 3. AI Research Assistants
**Tools**: ChatGPT, Claude, Perplexity

**Use Cases**:
- Generate interview questions
- Analyze survey responses
- Summarize research findings
- Create user personas

**Example Prompts**:
\`\`\`
"Generate 10 open-ended interview questions for understanding 
how small business owners manage their inventory"

"Analyze these 50 survey responses and identify the top 3 
pain points mentioned"

"Create a user persona based on these interview transcripts"
\`\`\`

## Design & Ideation

### 1. AI Design Assistants
**Tools**: Figma AI, Uizard, Galileo AI

**Capabilities**:
- Generate UI from text descriptions
- Auto-layout suggestions
- Design system recommendations
- A/B test variant generation

**Example Workflow**:
1. Describe your component: "Create a pricing card for a SaaS product"
2. AI generates multiple options
3. Refine and customize
4. Add to design system

### 2. Content Generation
**Tools**: ChatGPT, Copy.ai, Jasper

**Use Cases**:
- Placeholder content that's realistic
- Microcopy variations
- Error message suggestions
- UI labels and descriptions

**Tips**:
- Provide context about your users
- Specify tone of voice
- Review for brand consistency
- Test with real users

### 3. Design QA & Accessibility
**Tools**: Stark, Adee, Figma plugins

**Capabilities**:
- Automated accessibility checks
- Color contrast analysis
- Component consistency verification
- Design token validation

## Prototyping & Testing

### 1. AI-Powered Prototyping
**Tools**: Anima, Framer AI, v0.dev

**Capabilities**:
- Convert designs to code
- Generate responsive layouts
- Create interactive prototypes
- Suggest micro-interactions

### 2. Automated Usability Testing
**Tools**: Maze AI, Lyssna, UserZoom

**Capabilities**:
- Analyze heatmaps automatically
- Identify usability issues
- Generate test reports
- Predict task success rates

### 3. Synthetic User Testing
**Tools**: Synthetic Users (Maze), AI test participants

**Use Cases**:
- Quick validation before real user testing
- Testing edge cases
- Scenario exploration
- Hypothesis generation

**⚠️ Important**: Never replace real user testing entirely

## Workflow Automation

### 1. Design Handoff
**Tools**: Zeplin, Figma Dev Mode

**AI Features**:
- Auto-generate code snippets
- Suggest component names
- Identify reusable patterns
- Generate documentation

### 2. Design System Maintenance
**AI Capabilities**:
- Detect component inconsistencies
- Suggest variants to add
- Identify unused components
- Auto-generate documentation

## How to Integrate AI into Your Workflow

### Week 1: Experiment
- Try 3-5 AI tools
- Use for small tasks
- Note what works well

### Week 2: Integrate
- Add AI tools to daily workflow
- Create prompts library
- Share learnings with team

### Week 3: Optimize
- Refine your process
- Create automation workflows
- Measure time savings

### Week 4: Scale
- Train team on AI tools
- Establish best practices
- Document workflows

## Ethical Considerations

### Data Privacy
- Don't input confidential user data into AI tools
- Check terms of service
- Use enterprise versions when possible

### Bias & Fairness
- AI can perpetuate biases
- Always review AI output critically
- Test with diverse user groups

### Transparency
- Disclose AI use to users when appropriate
- Don't claim AI work as entirely your own
- Credit tools and collaborators

## Best Practices

### DO:
✅ Use AI for speed and scale
✅ Combine AI with human judgment
✅ Verify AI outputs
✅ Iterate on AI-generated content
✅ Stay updated on new tools

### DON'T:
❌ Replace user research with AI
❌ Trust AI outputs blindly
❌ Use AI without understanding the output
❌ Ignore privacy concerns
❌ Over-rely on automation

## The Future of AI in UX

**Emerging Trends**:
- Real-time design generation
- AI-powered personalization
- Predictive UX
- Autonomous testing
- Multi-modal interfaces

**Skills to Develop**:
- Prompt engineering
- AI tool evaluation
- Critical analysis of AI outputs
- Ethical AI implementation

## Resources

- **Courses**: AI for UX on Coursera, LinkedIn Learning
- **Communities**: AI in Design Slack, UX AI Discord
- **Newsletters**: AI UX Weekly, Design Tools Survey
- **Podcasts**: AI in UX, Design Systems Podcast
    `,
  },
  {
    id: 'figma-design-system-template',
    title: 'Figma Design System Starter Template',
    description: 'Free downloadable template with tokens, components, and documentation',
    category: 'templates',
    difficulty: 'beginner',
    readTime: '5 min',
    tags: ['Figma', 'Template', 'Design System', 'Free Download'],
    author: 'Anthro-Pologica Team',
    publishedDate: '2024-10-05',
    downloadUrl: 'https://www.figma.com/community/file/your-template-id',
    content: `
# Figma Design System Starter Template

## What's Included

This free Figma template provides everything you need to kickstart your design system:

### 1. Design Tokens
- **Colors**: Primary, secondary, neutral, semantic palettes
- **Typography**: Complete type scale with responsive sizes
- **Spacing**: 8-point grid system
- **Shadows**: Elevation system (6 levels)
- **Border Radius**: Consistent corner radius values
- **Icons**: 50+ essential UI icons

### 2. Core Components
- Buttons (primary, secondary, ghost, danger)
- Input fields (text, email, password, textarea)
- Checkboxes and radio buttons
- Dropdowns and selects
- Cards
- Modals and dialogs
- Tooltips
- Badges and tags
- Navigation (top nav, sidebar)
- Tables

### 3. Layout Templates
- Landing page
- Dashboard
- Form layouts
- Content pages
- Settings pages

### 4. Documentation Pages
- Component usage guidelines
- Best practices
- Accessibility notes
- Code examples

## How to Use

1. **Duplicate the Template**: Click "Duplicate" in Figma
2. **Customize Tokens**: Update colors, fonts to match your brand
3. **Extend Components**: Add variants specific to your needs
4. **Document**: Fill in your own guidelines
5. **Share with Team**: Enable team library

## Features

✅ Auto-layout throughout
✅ Responsive design
✅ Dark mode variants
✅ Accessibility-focused
✅ Well-organized layers
✅ Component descriptions
✅ Variant properties

## Video Tutorial

Watch our 10-minute walkthrough on YouTube showing how to customize this template for your brand.

## Support

Questions? Join our Discord community or email hello@anthropologica.design

## License

Free for commercial and personal use. Attribution appreciated but not required.
    `,
  },
  {
    id: 'user-interview-guide',
    title: 'User Interview Script Template',
    description: 'Proven interview script and question bank for effective user research',
    category: 'templates',
    difficulty: 'beginner',
    readTime: '8 min',
    tags: ['Research', 'Template', 'Interviews', 'Questions'],
    author: 'Dr. Maya Chen',
    publishedDate: '2024-09-20',
    downloadUrl: '/downloads/interview-template.pdf',
    content: `
# User Interview Script Template

## Pre-Interview Checklist

- [ ] Recruit appropriate participants
- [ ] Send calendar invite with video link
- [ ] Share consent form
- [ ] Prepare recording equipment
- [ ] Review research goals
- [ ] Print or open digital script

## Interview Structure (60 minutes)

### Introduction (5 minutes)
- [ ] Welcome and thank participant
- [ ] Explain purpose of interview
- [ ] Review consent and recording
- [ ] Set expectations (no right/wrong answers)
- [ ] Address questions

### Warm-Up (5 minutes)
Get participant comfortable with easy questions:
- "Tell me a bit about yourself and what you do"
- "How long have you been in your current role?"
- "What does a typical day look like for you?"

### Context Questions (10 minutes)
Understand the user's environment:
- "Walk me through how you currently [accomplish task]"
- "What tools do you use for this?"
- "Who else is involved in this process?"

### Deep Dive (30 minutes)
Explore pain points and needs:
- "What's most challenging about [topic]?"
- "Tell me about the last time you [specific scenario]"
- "What would make this easier for you?"
- "If you could wave a magic wand, what would you change?"

### Closing (10 minutes)
- "Is there anything we haven't covered that you think is important?"
- "Do you have any questions for me?"
- Thank participant
- Explain next steps

## Question Framework

### The 5 Whys Technique
Start with a surface-level question, then ask "why" to dig deeper:
1. "Why do you do it that way?"
2. "Why is that important?"
3. "Why does that matter?"
4. "Why hasn't it been solved?"
5. "Why would that work better?"

### Follow-Up Prompts
- "Tell me more about that"
- "Can you give me an example?"
- "How did that make you feel?"
- "What happened next?"
- "Interesting, say more about that"

## Do's and Don'ts

### DO:
✅ Ask open-ended questions
✅ Listen more than you talk (80/20 rule)
✅ Stay curious and non-judgmental
✅ Take notes on direct quotes
✅ Observe body language
✅ Allow comfortable silences
✅ Adapt questions based on responses

### DON'T:
❌ Ask leading questions ("Don't you think...?")
❌ Ask yes/no questions when you need details
❌ Interrupt or finish sentences
❌ Jump to solutions
❌ Defend your design
❌ Ask hypothetical questions
❌ Multi-task during interview

## Remote Interview Tips

**Technical Setup**:
- Test video/audio beforehand
- Use high-quality microphone
- Good lighting
- Quiet environment
- Screen sharing ready (if needed)

**Engagement Strategies**:
- Make eye contact (look at camera)
- Use reactions and nods
- Share screen to show examples
- Use digital whiteboard for collaboration
- Send follow-up materials via chat

## Analysis

After each interview:
1. Listen to recording same day
2. Note key themes and quotes
3. Identify patterns across interviews
4. Share insights with team
5. Update research questions as needed

## Question Bank by Topic

### Product Discovery
- "What problem are you trying to solve?"
- "How are you solving this today?"
- "What works well about current solution?"
- "What frustrates you about it?"

### Feature Validation
- "Would this be useful? Why or why not?"
- "How would you use this feature?"
- "What's missing from this concept?"
- "How does this compare to what you use now?"

### Usability
- "What do you think this button does?"
- "Where would you expect to find [feature]?"
- "What would you do next?"
- "Was that what you expected to happen?"

### Workflow & Process
- "Take me through your process for [task]"
- "What do you do before this step?"
- "What happens after?"
- "Who do you collaborate with?"
- "What tools do you switch between?"

## Template Downloads

Download our interview templates:
- Interview script (Word/Google Doc)
- Note-taking template (Notion)
- Consent form template (PDF)
- Research plan template (Google Docs)
    `,
  },
  {
    id: 'netflix-redesign-case-study',
    title: 'Case Study: Netflix Discovery Redesign',
    description: 'Deep dive into redesigning content discovery for reduced decision fatigue',
    category: 'case-studies',
    difficulty: 'advanced',
    readTime: '30 min',
    tags: ['Case Study', 'Netflix', 'Product Design', 'User Research'],
    author: 'Alex Rivera',
    publishedDate: '2024-08-12',
    content: `
# Case Study: Netflix Discovery Redesign

## Project Overview

**Challenge**: Users spend average of 18 minutes browsing before choosing content (decision fatigue)

**Goal**: Reduce browsing time while maintaining satisfaction with content chosen

**Timeline**: 3 months
**Team**: 2 UX designers, 1 researcher, 3 engineers, 1 PM

## Research Phase (4 weeks)

### User Interviews (n=20)
Key findings:
- "I spend more time looking than watching"
- Paralysis from too many options
- Difficulty finding "right mood" content
- Frustration with same recommendations

### Analytics Review
- 60% of users browse 3+ categories before selecting
- 23% abandon without watching anything
- Most engagement from first 3 rows of content
- Mood-based queues (like "Date Night") perform 2x better

### Competitive Analysis
Reviewed: Disney+, HBO Max, Hulu, Amazon Prime
- Disney+ has better categorization
- HBO Max has superior curation
- Hulu's "Keep Watching" placement is optimal

## Problem Definition

**Core Issue**: Netflix prioritizes algorithm-driven recommendations over user intent

**User Needs**:
1. Quick content for specific moods/situations
2. Discovery without overwhelming choices
3. More control over browsing experience

## Ideation

### Concept 1: Mood-Based Navigation
- Primary navigation by mood/situation
- "What mood are you in?" entry point
- AI-suggested moods based on time/history

### Concept 2: Quick Pick Mode
- "I have 30 minutes" / "Full movie" filters
- Time-based recommendations
- "Surprise Me" for decision-averse users

### Concept 3: Social Curation
- "Your friends are watching..."
- Watch parties integration
- Social proof for recommendations

### Testing Results
- Concept 1 tested best (NPS +18 points)
- Concept 2 elements merged into Concept 1
- Concept 3 saved for future iteration

## Design Solution

### New Features

**1. Smart Filters**
Prominent filters at top:
- Mood (Relaxing, Exciting, Thought-provoking, etc.)
- Time Available (< 30min, 30-60min, 90min+, Binge)
- Viewing Context (Solo, Date Night, Family, Background)

**2. Refined Algorithm**
- Reduced recommendations from 75 to 30 per category
- Increased diversity in first 3 rows
- Rotation every 12 hours (fresher content)

**3. Quick Pick Button**
- Prominent placement on homepage
- 3-question flow to instant recommendation
- 85% user satisfaction in testing

**4. Improved "Continue Watching"**
- Moved to top (previously row 3)
- Larger thumbnails
- Time remaining visible

### Information Architecture Changes

**Before**:
- 15-20 recommendation rows
- Hidden categories
- Generic labels ("Popular on Netflix")

**After**:
- 8-10 curated rows
- Mood-based top navigation
- Specific labels ("Critically Acclaimed Thrillers")

## Testing & Iteration

### Prototype Testing (n=15)
**Metrics**:
- Time to selection: 18min → 9min (50% reduction)
- User satisfaction: 6.5/10 → 8.2/10
- Zero abandonments in test sessions

**User Quotes**:
- "Finally! This is what I've been wanting"
- "The Quick Pick is a game-changer"
- "I love the mood filters"

### Iteration Based on Feedback
- Added "I'm Feeling Lucky" option
- Made filters collapsible (some users wanted them hidden)
- Increased thumbnail size by 20%
- Added "Not Interested" quick action

## Implementation

### Phase 1: Core Features (Weeks 1-6)
- Smart filters
- Quick Pick button
- Updated algorithm

### Phase 2: Refinements (Weeks 7-10)
- Continue Watching improvements
- Mobile optimization
- Loading state improvements

### Phase 3: Monitoring (Weeks 11-12)
- A/B testing at 10% rollout
- Analytics monitoring
- User feedback collection

## Results

### Quantitative
- **47% reduction** in average browsing time (18min → 9.5min)
- **31% increase** in content started
- **19% reduction** in browsing abandonment
- **23% increase** in overall watch time

### Qualitative
- NPS increased from 64 to 78
- "Decision fatigue" mentions in support tickets down 55%
- Social media sentiment improved

### Business Impact
- Projected $127M annual revenue increase
- Improved retention (churn down 3.2%)
- Reduced server costs (fewer abandoned sessions)

## Lessons Learned

### What Worked
1. **Mood-based navigation** resonated strongly with users
2. **Quick Pick** addressed decision fatigue directly
3. **Reducing options** paradoxically increased satisfaction
4. **Research-driven design** led to confident decisions

### What We'd Do Differently
1. **Earlier technical feasibility** check (Quick Pick required significant ML work)
2. **Include engineers** in early ideation (they had great ideas we missed)
3. **Mobile-first approach** (we designed desktop first, mobile adaptations were harder)
4. **Accessibility testing** earlier in process

### Surprising Findings
- Users wanted fewer, not more, recommendations
- "I'm Feeling Lucky" was used more than expected (18% of users)
- Time-based filters more popular than genre filters

## Key Takeaways

1. **Less is more**: Reducing choices often improves UX
2. **Understand the job to be done**: Users weren't trying to browse, they wanted to watch
3. **Quick wins matter**: Fast prototyping and testing saved months
4. **Data + empathy**: Combined quantitative and qualitative insights

## Resources

- Interactive prototype: [figma.com/proto/...]
- Research synthesis: [miro.com/board/...]
- Final designs: [figma.com/file/...]

---

*This case study is a conceptual project for educational purposes.*
    `,
  },
];

export const categories = [
  { id: 'all', name: 'All Resources', icon: '🎨' },
  { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
  { id: 'research', name: 'User Research', icon: '🔍' },
  { id: 'design-systems', name: 'Design Systems', icon: '🎯' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿' },
  { id: 'neurodivergent', name: 'Neurodivergent Design', icon: '🧠' },
  { id: 'ai-tools', name: 'AI Tools', icon: '🤖' },
  { id: 'templates', name: 'Templates & Downloads', icon: '📥' },
  { id: 'case-studies', name: 'Case Studies', icon: '📚' },
];

export function getResourcesByCategory(category: ResourceCategory | 'all'): Resource[] {
  if (category === 'all') {
    return resources;
  }
  return resources.filter(r => r.category === category);
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find(r => r.id === id);
}

export function getResourcesByDifficulty(difficulty: DifficultyLevel): Resource[] {
  return resources.filter(r => r.difficulty === difficulty);
}

export function searchResources(query: string): Resource[] {
  const lowercaseQuery = query.toLowerCase();
  return resources.filter(r => 
    r.title.toLowerCase().includes(lowercaseQuery) ||
    r.description.toLowerCase().includes(lowercaseQuery) ||
    r.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    r.content.toLowerCase().includes(lowercaseQuery)
  );
}
