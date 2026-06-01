Based on everything we've discussed, here's your complete Figma prompt:

---

## Figma / FigJam AI Prompt

---

**PROJECT NAME:** MamaSkills — Income & Infant Survival Platform

---

**PROMPT:**

Design a complete, production-ready web and mobile application called **MamaSkills**. This platform equips low-income mothers in rural and peri-urban Uganda with income-generating skills, connects them to buyers for their products, and provides infant health guidance — with the goal of reducing infant mortality by addressing its root cause: maternal economic insecurity.

---

### BRAND & VISUAL IDENTITY

**Primary colour:** Deep navy blue `#003366`
**Secondary colour:** Warm gold `#B48C00`
**Accent:** Soft green `#1F5C2E`
**Background:** Off-white `#F8FAFC`
**Text:** Charcoal `#1A1A2E`
**Card backgrounds:** Light blue `#EEF4FB`
**Success states:** `#D5F0D5`
**Warning/alert:** `#FFF8EE`

**Typography:**
- Headings: **Poppins Bold**
- Body: **Inter Regular**
- Labels: **Inter Medium**

**Design language:** Clean, warm, accessible. Think community health meets modern fintech. No cold corporate feel. The interface must feel welcoming to a mother with limited digital experience. Large touch targets. High contrast. Icon-heavy navigation. Minimal text density on screens.

**Logo concept:** A stylised flame/leaf merged with a mother-and-child silhouette inside a circle. Colours: gold on navy.

---

### USER PERSONAS TO DESIGN FOR

**Primary user — Grace, 26, Mukono District:**
- Basic Android smartphone, 2GB RAM
- Intermittent internet (often offline)
- Primary school education, reads Luganda better than English
- Two children under 3
- Wants to bake and sell but has no market access
- Distrusts new apps; needs social proof upfront

**Secondary user — Local Buyer (Restaurant owner, school administrator, church coordinator):**
- Wants to source locally made goods
- Needs a simple ordering interface
- Desktop or mid-range smartphone

**Admin user — UCU / NGO Programme Coordinator:**
- Manages content, monitors enrolments, views analytics
- Desktop-first

---

### SCREENS TO DESIGN

#### 1. ONBOARDING FLOW (5 screens)

**Screen 1 — Splash / Welcome**
- MamaSkills logo centred on navy background
- Tagline below: *"Learn. Earn. Protect Your Baby."*
- Tagline in both English and Luganda: *"Genda Ku Mukwano Gwa Omwana Wo"*
- Two large CTA buttons: **Get Started** (gold) and **I Already Have an Account** (outlined white)

**Screen 2 — Language Select**
- Card grid: English / Luganda / Runyankore / Acholi
- Each card has a flag-style illustration and large text
- "You can change this later" note at bottom

**Screen 3 — Who Are You?**
- Two large icon cards:
  - **Mother / Caregiver** (illustration of woman with baby)
  - **Buyer / Business** (illustration of shop stall)
- Simple, no jargon

**Screen 4 — Quick Profile Setup (Mother flow)**
- Fields: First name, District (dropdown), Number of children (stepper: 1–10+), Phone number
- Progress bar at top: Step 1 of 2
- "No email needed" reassurance note

**Screen 5 — Community Trust Banner**
- UCU logo + "Supported by Uganda Christian University"
- LC1 endorsement badge placeholder
- Short trust statement: *"This programme is free. We never sell your data."*
- **Enter App** CTA button

---

#### 2. MOTHER DASHBOARD (Home Screen)

**Top bar:**
- Avatar + "Hello, Grace 👋"
- Notification bell icon
- Offline indicator pill (green dot = online / orange = offline mode)

**Hero card (full width, navy gradient):**
- "Your Skills. Your Income. Your Baby's Health."
- Progress ring: X skills completed, Y products listed, UGX Z earned this month
- Quick action: **+ List a Product**

**Section: Continue Learning**
- Horizontal scroll of skill cards
- Each card: skill thumbnail image, skill name, progress bar (% complete), difficulty tag (Beginner / Intermediate), offline-available badge (cloud icon with tick)
- Skills shown: Baking, Tailoring, Soap Making, Candle Making, Basket Weaving, Charcoal Making

**Section: Your Marketplace Activity**
- Mini stats row: Products Listed / Orders Received / Income This Month
- **View My Shop** button

**Section: Baby Health Corner**
- Small card with baby icon
- "Your baby: 4 months old" (based on profile)
- Tip of the day: *"Watch for these danger signs this week..."*
- **Read More** link

**Bottom navigation (5 tabs):**
- 🏠 Home
- 📚 Learn
- 🛒 Market
- 👶 Baby Health
- 👤 Profile

---

#### 3. LEARN SCREEN — Skill Library

**Header:** "What do you want to learn today?"
**Search bar** with filter chips: All / Baking / Tailoring / Soap / Weaving / More

**Featured Skill Card (large, full-width):**
- Background photo of skill in action
- Skill name + short description
- Tags: Beginner · Offline Available · 6 Lessons
- **Start Learning** CTA (gold button)

**All Skills Grid (2 columns):**
Each card contains:
- Skill illustration (warm, colourful, African-context art style)
- Skill name
- Lesson count
- Offline badge if downloadable
- Enrolment count: "342 mothers learning this"
- **Enrol** or **Continue** button

---

#### 4. SKILL LESSON SCREEN

**Top:** Back arrow + skill name + lesson progress (Lesson 3 of 6)
**Progress bar:** full-width, gold fill

**Video/Illustration area (60% of screen):**
- Large video thumbnail with play button
- Below video: audio toggle button (for voice narration in Luganda)
- Caption toggle button

**Step-by-step instructions panel:**
- Numbered steps with illustrations
- Each step: bold action + supporting sentence
- Ingredient/material quantities highlighted in gold
- "Mark as done" checkbox per step

**Bottom sticky bar:**
- ← Previous Step | Next Step →
- "Download for offline" icon button

---

#### 5. MARKETPLACE — Browse (Buyer View)

**Header:** "Shop Local. Support Mothers."
**Search + filter row:** Category / District / Price range / Rating

**Product Grid (2 columns, card style):**
Each card:
- Product photo
- Product name
- Seller name + location tag (e.g. "Grace · Mukono")
- Price in UGX
- Star rating
- **Order** button (green)

**Featured Seller Banner:**
- "Mother of the Week" highlight card
- Photo, name, story snippet, products listed

---

#### 6. MARKETPLACE — Seller / My Shop (Mother View)

**Header:** "My Shop" + **+ Add Product** button (gold, top right)

**Earnings summary card:**
- Total earned: UGX X,XXX
- Orders pending: X
- Products active: X
- **Income Tracker** button (opens chart modal)

**My Products list:**
Each item:
- Product thumbnail
- Name, price, stock status (In Stock / Out of Stock toggle)
- Orders received count
- Edit / Delete icons

**Add Product modal / screen:**
- Photo upload (camera or gallery)
- Product name, category, price, description, quantity available
- District auto-filled from profile
- **Publish to Market** CTA

---

#### 7. INCOME TRACKER SCREEN

**Page title:** "Your Earnings"

**Monthly earnings chart:**
- Bar chart: last 6 months, gold bars
- Current month highlighted

**Stats row:**
- Total earned all-time / This month / Last month

**Transaction history list:**
- Each row: product name + buyer initials + date + amount (UGX)
- Colour-coded: green = received, orange = pending

**Share button:** "Show my earnings" — generates a simple shareable card (for showing family members)

---

#### 8. BABY HEALTH CORNER

**Header:** "Baby Health Guide"
**Baby age tracker:** Slider or tap input — "My baby is X months old"

**Danger Signs Card (red-bordered, prominent):**
- Title: "Go to the clinic immediately if you see:"
- Icon list: High fever / Difficulty breathing / Refusing to feed / Convulsions / Sunken fontanelle
- **Find Nearest Clinic** button (maps link)

**Weekly tip card:**

- Illustrated tip based on baby age
- Audio play button for Luganda narration

**ANC Reminder section:**
- Checklist of ANC visits (tick those completed)
- Next appointment reminder with calendar add button

**Nutrition guide:**
- Age-appropriate feeding guide
- Simple illustrated food groups

---

#### 9. COMMUNITY GROUP SCREEN

**Header:** "Mothers Near You"
**Your group:** "Mukono Bakers Group · 12 members"

**Group feed (chat-style):**
- Posts with avatar, name, message, timestamp
- Reaction icons (heart, clap, fire)
- Post types: text / photo / milestone celebration ("Grace just made her first sale! 🎉")

**Post composer at bottom:**
- Text input + photo attach + voice note button

**Pinned resources panel:**
- Group facilitator posts (UCU coordinator)
- Upcoming group session date

---

#### 10. ADMIN DASHBOARD (Desktop — UCU Coordinator)

**Sidebar navigation:**
- Overview / Mothers / Skills / Marketplace / Health / Reports / Settings

**Overview cards (top row):**
- Total enrolled mothers / Active this week / Products listed / Total income generated / Infant health tips accessed

**Charts section:**
- Line chart: Enrolments over time
- Bar chart: Skills by popularity
- Map of Uganda: dots showing mother locations by district

**Mothers table:**
- Name / District / Skills completed / Products listed / Income earned / Last active
- Search + filter + export CSV

---

### ADDITIONAL DESIGN REQUIREMENTS

**Accessibility:**
- Minimum touch target size: 48×48px
- All body text minimum 16px
- Contrast ratio minimum 4.5:1
- Icon + label always together (never icon only)

**Offline states:**

- Every screen must have an offline version mockup
- Offline banner: orange strip at top — "You are offline. Saved content still available."
- Greyed-out actions that require internet with tooltip: "Connect to internet to do this"

**Empty states:**
- Every list screen needs an empty state illustration
- Warm, illustrated style — no stock photos
- Encouraging copy: "You haven't listed any products yet. Your first sale starts here."

**Loading states:**
- Skeleton screens (not spinners) for all content cards

**Micro-interactions to annotate:**
- Skill completion: confetti burst + "Well done, Grace!" modal
- First product listed: celebration animation
- First sale: push notification mock + in-app toast

**Component library to build:**
- Buttons: Primary (gold) / Secondary (outlined navy) / Destructive (red) / Ghost
- Input fields: Default / Focused / Error / Disabled
- Cards: Skill card / Product card / Health tip card / Group post card
- Navigation: Bottom tab bar / Sidebar (admin) / Top app bar
- Badges: Offline available / Beginner / New / Sold Out
- Modals: Confirmation / Success / Error
- Progress: Bar / Ring / Step indicator

---

### PROTOTYPE FLOWS TO BUILD

1. **Mother onboarding** → language select → profile setup → home dashboard
2. **Start a skill lesson** → watch video → complete steps → mark lesson done → progress update
3. **List a product** → upload photo → set price → publish → appears in marketplace
4. **Buyer orders a product** → seller receives notification → income tracker updates
5. **Baby health check** → enter baby age → view danger signs → find nearest clinic

---

### NOTES FOR FIGMA

- Build as a **mobile-first** design (375px wide base frame) with a **1440px desktop** frame for the admin dashboard
- Use **Auto Layout** on all components
- Create a full **design system page** with all colours, typography, spacing, and components documented
- Name all frames clearly: `Onboarding/01-Splash`, `Dashboard/Mother-Home`, etc.
- Use **Figma variables** for colour tokens so light/dark mode can be toggled
- All illustrations should be warm, Africa-context art style — avoid generic Western stock imagery

---

This is your complete Figma build brief. Paste the entire prompt into Figma AI, or hand it to a designer as a spec document. Everything maps directly back to what the Mukono community told us they need.