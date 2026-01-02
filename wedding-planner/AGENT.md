# Agent Skills Configuration

## Available Skills Catalog

| Category | Skill | When to Use | Path |
|----------|-------|-------------|------|
| Creative | algorithmic-art | Generative art, p5.js visuals | ./project-skills/algorithmic-art/SKILL.md |
| Creative | canvas-design | PNG/PDF visual design | ./project-skills/canvas-design/SKILL.md |
| Creative | slack-gif-creator | Animated GIFs for Slack | ./project-skills/slack-gif-creator/SKILL.md |
| Creative | theme-factory | Apply themes to artifacts | ./project-skills/theme-factory/SKILL.md |
| Technical | frontend-design | UI components, React, CSS | ./project-skills/frontend-design/SKILL.md |
| Technical | web-artifacts-builder | Complex HTML artifacts | ./project-skills/web-artifacts-builder/SKILL.md |
| Technical | mcp-builder | MCP server creation | ./project-skills/mcp-builder/SKILL.md |
| Technical | webapp-testing | Playwright testing | ./project-skills/webapp-testing/SKILL.md |
| Technical | skill-creator | Create new skills | ./project-skills/skill-creator/SKILL.md |
| Documents | docx | Word documents | ./project-skills/docx/SKILL.md |
| Documents | pdf | PDF files | ./project-skills/pdf/SKILL.md |
| Documents | pptx | PowerPoint presentations | ./project-skills/pptx/SKILL.md |
| Documents | xlsx | Excel spreadsheets | ./project-skills/xlsx/SKILL.md |
| Documents | doc-coauthoring | Collaborative document editing | ./project-skills/doc-coauthoring/SKILL.md |
| Enterprise | brand-guidelines | Brand assets | ./project-skills/brand-guidelines/SKILL.md |
| Enterprise | internal-comms | Internal communications | ./project-skills/internal-comms/SKILL.md |
| **Wedding** | **wedding-invitation-designer** | **Design wedding invitations & stationery** | **./project-skills/wedding-invitation-designer/SKILL.md** |
| **Wedding** | **wedding-timeline-builder** | **Create wedding timelines & schedules** | **./project-skills/wedding-timeline-builder/SKILL.md** |
| **Wedding** | **vendor-management** | **Track vendors, contracts, payments** | **./project-skills/vendor-management/SKILL.md** |
| **Wedding** | **wedding-budget-tracker** | **Manage wedding budgets & expenses** | **./project-skills/wedding-budget-tracker/SKILL.md** |
| **Wedding** | **wedding-planning-assistant** | **AI wedding planning advice & suggestions** | **./project-skills/wedding-planning-assistant/SKILL.md** |
| **Wedding** | **wedding-website-template** | **Generate wedding website templates** | **./project-skills/wedding-website-template/SKILL.md** |
| **Wedding** | **seating-chart-designer** | **Design seating charts & arrangements** | **./project-skills/seating-chart-designer/SKILL.md** |
| **Wedding** | **client-wedding-manager** | **Manage wedding planner client portfolio** | **./project-skills/client-wedding-manager/SKILL.md** |

## Instructions

1. Before starting ANY task, check if a relevant skill exists above
2. If a skill matches the task, READ the SKILL.md file FIRST
3. Follow all instructions in the SKILL.md before proceeding
4. Skills contain best practices, scripts, and templates - USE THEM

## Task → Skill Mapping

### General Tasks
- Building UI/components → frontend-design
- Creating Word docs → docx
- Creating PDFs → pdf
- Creating presentations → pptx
- Creating spreadsheets → xlsx
- Testing web apps → webapp-testing
- Making GIFs → slack-gif-creator
- Generative art → algorithmic-art
- API integrations → mcp-builder
- Styling/theming → theme-factory
- Writing reports/newsletters → internal-comms
- Creating new skills → skill-creator
- Complex web artifacts → web-artifacts-builder
- Document collaboration → doc-coauthoring

### Wedding-Specific Tasks
- Designing invitations/stationery → wedding-invitation-designer
- Creating timelines/schedules → wedding-timeline-builder
- Managing vendors/contracts → vendor-management
- Tracking budgets/expenses → wedding-budget-tracker
- Planning advice/suggestions → wedding-planning-assistant
- Building wedding websites → wedding-website-template
- Creating seating charts → seating-chart-designer
- Managing client weddings → client-wedding-manager

## Wedding Planner App Integration

### When Building This App
**ALWAYS use wedding-specific skills FIRST** before general skills for wedding-related features.

### Priority Skills for This Project

1. **wedding-website-template** - Core feature for generating couple websites
   - Use when building the website builder feature
   - Generates multiple beautiful template styles
   - Includes all essential wedding website sections

2. **wedding-planning-assistant** - AI guidance engine
   - Use for chatbot/AI advisor features
   - Provides personalized recommendations
   - Answers wedding planning questions

3. **client-wedding-manager** - Business management
   - Use for wedding planner dashboard
   - Manages multiple client weddings
   - Tracks progress and timelines

4. **wedding-invitation-designer** - Digital invitations
   - Use for invitation creation feature
   - Multiple styles and formats
   - Print and digital outputs

5. **wedding-budget-tracker** - Financial management
   - Use for budget tracking features
   - Category breakdowns and reports
   - Payment schedules

6. **vendor-management** - Vendor coordination
   - Use for vendor directory features
   - Contract and payment tracking
   - Communication logs

7. **wedding-timeline-builder** - Schedule creation
   - Use for timeline generation features
   - Day-of and planning timelines
   - Vendor coordination schedules

8. **seating-chart-designer** - Guest management
   - Use for seating arrangement features
   - Visual floor plans
   - Escort card generation

### Feature Development Guidelines
- Use **frontend-design** for UI components (but follow wedding aesthetic)
- Use **canvas-design** for visual assets and graphics
- Use **pdf** for generating printable documents
- Use **xlsx** for data exports and spreadsheets
- Use **webapp-testing** for testing all features
- Use **wedding-specific skills** for domain logic and content
