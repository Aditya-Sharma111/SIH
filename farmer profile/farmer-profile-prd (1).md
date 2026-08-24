# Smart Crop — Farmer Profile Page
## Frontend-Only PRD & Implementation Specification

**Scope:** Farmer Profile page only. No backend, no APIs, no database, no
auth, no Agriculture Officer dashboard, no changes to the rest of Smart Crop.

---

## 1. Overview

The Farmer Profile is Smart Crop's data-foundation screen — the place a
farmer goes to see what the app knows about them and their farm, and to
correct or update it. It sits under **More → Profile** in the existing
farmer navigation and does not introduce a new navigation pattern.

It is not a settings page bolted onto a generic template. It is built
around four things Smart Crop already treats as central to its distress
loop: **who the farmer is, where their farm is, what they're growing, and
what language they want to be reached in** — with loan/financial context
included because it directly feeds the platform's risk score.

## 2. Page Objective

The page answers one question for the farmer:

> **"What does Smart Crop know about me and my farm?"**

And gives them two things to do about it:

- Correct anything that's wrong (Edit Profile)
- Adjust how they want to be reached (language, notifications)

Everything on the page exists to serve one of those two jobs. Risk
analytics, charts, and crop diagnostics are intentionally excluded — those
live on the Monitoring and Risk screens.

## 3. User Story

> As a farmer using Smart Crop, I want to see my personal, farm, crop, and
> financial information in one place, in my own language, so that I can
> trust the advisories I'm getting are based on accurate information about
> me — and fix anything that's wrong myself, without having to call
> someone.

Secondary stories:

- As a farmer, I want to change my preferred language without digging
  through menus, because I think and read best in Odia.
- As a farmer, I want to control which alerts I get, because not every
  notification is useful to me.
- As a farmer with more than one plot, I want to see all my farms in one
  place.

## 4. Functional Requirements

| # | Requirement | Priority |
|---|---|---|
| F1 | Display farmer identity: name, avatar, village, district | Must |
| F2 | Display personal information: name, phone (masked), village, district, language | Must |
| F3 | Display farm information: land area, location, current crop, sowing date, current stage | Must |
| F4 | Display a dedicated current-crop summary with a link toward crop detail | Must |
| F5 | Display financial information: loan amount, days remaining, due date | Must |
| F6 | Allow changing preferred language (English / Hindi / Odia) | Must |
| F7 | Allow toggling notification categories independently | Must |
| F8 | Allow editing personal fields (name, phone, village, district, language) via a dedicated edit flow | Must |
| F9 | Show profile completeness as a percentage | Should |
| F10 | Represent "My Farms" and support viewing/adding an additional farm | Should |
| F11 | Provide loading, empty, and error states | Should |
| F12 | Remain navigable to Dashboard, Crop, Monitor, Market via the existing bottom nav | Must |
| F13 | Validate edited fields before save and show inline errors | Must |
| F14 | Indicate unsaved changes while editing | Should |

Fields intentionally **not** included as required product data (not in the
source PRD or UI structure): crop yield history, payment methods, bank
account details, social features. If added later, they're optional UX
enhancements, not baseline requirements.

## 5. Information Architecture

```
Farmer Profile
├── Identity (name, avatar, location, completeness)
├── Personal Information (name, phone, village, district, language)
├── Farm Information (land, location, crop, sowing date, stage)
├── Current Crop (crop, acreage, sown date, stage, health, → View Crop)
├── Financial Information (loan amount, due-in, due date)
├── Preferences
│   ├── Language
│   └── Notifications
├── My Farms (farm list, + Add Farm)
└── Actions (Edit Profile → Save / Cancel)
```

This follows the source UI structure doc's Profile fields (Name, Village,
District, Language, Land, Current Crop, Sowing Date, Edit Profile, My
Farms, Language, Notifications) directly — nothing invented, one addition
flagged below.

**Optional UX enhancement (not required data):** a profile-completeness
percentage. It's not in the source PRD or UI structure, but it gives the
farmer a reason to finish filling in their profile, which improves
advisory personalization. Flagged here explicitly per the brief's
instruction not to silently add fields.

## 6. Detailed Page Layout

**Mobile (360–430px), single column, top to bottom:**

```
┌───────────────────────────────┐
│  ← MY PROFILE      [Edit]     │
│                                │
│   (R)  Ramesh                 │
│        Farmer · Village, Dist │
│                                │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░  85%        │
├───────────────────────────────┤
│  PERSONAL INFORMATION   [Edit]│
│  Name · Phone · Village ·     │
│  District · State · Language  │
├───────────────────────────────┤
│  MY FARM                      │
│  Land · Location · Crop ·     │
│  Sowing Date · Stage          │
├───────────────────────────────┤
│  MY FARMS                     │
│  Farm 01 card      [View]     │
│  [+ Add Farm]                 │
├───────────────────────────────┤
│  CURRENT CROP                 │
│  🌾 Paddy   Moderate Stress   │
│  Sown / Stage    [View Crop]  │
├───────────────────────────────┤
│  FINANCIAL INFORMATION        │
│  Loan Amount · Due · Date     │
├───────────────────────────────┤
│  LANGUAGE                     │
│  [English] [Hindi] [Odia]     │
├───────────────────────────────┤
│  NOTIFICATIONS                │
│  Weather / Risk / Market /    │
│  Farming / Officer   (toggles)│
├───────────────────────────────┤
│  🏠  🌱  📊  💰  •••          │
└───────────────────────────────┘
```

**Desktop/tablet (≥640px):** hero stays full-width; everything below
becomes a two-column grid — Personal Info, Farm Info, My Farms in the left
column; Current Crop, Financial Info, Language, Notifications in the
right column. This groups "who/where" on the left and "what/how" on the
right, and keeps the two tallest cards (Personal Info, Notifications) from
stacking on top of each other.

## 7. Section-by-Section UI Specification

### 7.1 Profile Hero
**What the user sees:** their name, avatar initial, village/district, and
a profile-completeness bar, over a dark green textured background.
**Why it exists:** immediate self-identification — the farmer should know
in one glance this profile is theirs and is accurate.
**Behavior:** Edit button opens the edit flow; completeness bar is
read-only, computed from filled fields.
**Mobile:** avatar shrinks slightly, hero corners square off to the
viewport edges; on desktop it gets rounded on all sides.

### 7.2 Personal Information
**What the user sees:** name, masked phone, village, district, state,
language — six labeled fields.
**Why it exists:** the baseline identity data every other feature
(advisories, SMS delivery, officer contact) depends on.
**Behavior:** Edit opens the same edit flow as the hero's Edit button.
**Mobile:** two-column field grid; three columns on desktop.

### 7.3 Farm Information
**What the user sees:** land area, location, current crop, sowing date,
current stage.
**Why it exists:** this is what makes the profile agricultural rather than
a generic account page — it's the data the advisory and risk engines
actually consume.
**Behavior:** read-only here; farm-level edits belong to the farm/crop
flows, not this page (avoids duplicating edit surfaces).

### 7.4 Current Crop
**What the user sees:** crop icon, name, acreage, a health badge, sown
date, current stage, and a "View Crop" button.
**Why it exists:** connects the profile to the platform's core loop
(Monitor → Detect → Predict) without duplicating the Monitoring page.
**Behavior:** "View Crop" conceptually routes to My Crop → Farming
Calendar → Crop Guide (frontend placeholder handler in this prototype).
**Mobile:** health badge wraps to its own line if the crop name is long.

### 7.5 Financial Information
**What the user sees:** loan amount, days until due, due date.
**Why it exists:** loan due-date proximity is one of the three inputs to
the platform's distress score, so it belongs in "what Smart Crop knows
about me."
**Behavior:** if due-in ≤ 10 days, an inline note appears pointing to
Support — deliberately text+icon, not color-only, and styled like the
rest of the page rather than a bank statement.

### 7.6 Language
**What the user sees:** three tappable chips — English, हिंदी, ଓଡ଼ିଆ —
with the native script as the primary label.
**Why it exists:** language changes are frequent enough (a family member
helping set up the phone, then handing it to the farmer) that they
shouldn't require entering an edit mode.
**Behavior:** tapping a chip changes the language immediately and shows a
"Saved successfully" confirmation.

### 7.7 Notifications
**What the user sees:** five labeled toggles — Weather, Risk, Market,
Farming Reminders, Officer Updates.
**Why it exists:** not every farmer wants every alert; officer-initiated
updates in particular should be optional, not forced.
**Behavior:** each toggle is independent and takes effect immediately
(no separate save step — this matches how a phone's own settings toggles
behave, which farmers already know).

### 7.8 My Farms
**What the user sees:** one farm card (land, location, crop) plus an
"+ Add Farm" action.
**Why it exists:** the source UI structure lists "My Farms" as a distinct
entry point; this demonstrates multi-farm support without building a full
farm-management system.
**Behavior:** Add Farm appends a second mock farm card in this prototype,
proving the pattern scales past one farm.

## 8. View State

Default state. All sections render read-only, as specified above. Edit
actions are visible (pencil/"Edit" affordances) but nothing is editable
inline — this avoids accidental edits on a touch device.

## 9. Edit State

Triggered by either Edit button (hero or Personal Information card).
Opens a bottom sheet (mobile) / centered modal (desktop) containing:

- Name, Phone, Village, District — text inputs
- Language — select dropdown

Behavior:
- Inputs are pre-filled with current values.
- An "Unsaved changes" pill appears once any field differs from the
  original.
- **Validation:** Name/Village/District cannot be empty; phone must match
  a simple pattern. Errors show inline under the field, in plain language
  ("Enter a valid phone number"), never only as a red border.
- **Save Changes** commits to local state, closes the sheet, shows a
  "Saved successfully" toast.
- **Cancel** and the Escape key discard changes and close without
  prompting (values are cheap to re-enter; a confirm-to-discard step would
  add friction for low digital-literacy users more often than it'd save
  someone from a real mistake).

Farm/crop fields are **not** editable from this form — they're
informational here, sourced from the farm/crop flows elsewhere in the
product.

## 10. Interaction Behavior

| Action | Result |
|---|---|
| Tap Edit Profile | Opens edit sheet with current values |
| Edit a field with invalid input, tap Save | Sheet stays open, inline error shown, no save |
| Edit a field validly, tap Save | Sheet closes, profile updates, "Saved successfully" toast for ~2s |
| Tap Cancel / Escape | Sheet closes, no changes applied |
| Tap a language chip | Language updates immediately, toast confirms |
| Tap a notification toggle | Toggles instantly, no confirmation needed |
| Tap View Crop | Navigates toward crop detail (placeholder route in this prototype) |
| Tap + Add Farm | New farm card appended to My Farms |
| Tap bottom nav item | Navigates to Home / Crop / Monitor / Market (placeholder routes) |

## 11. Mock Data

```ts
export const farmer = {
  name: "Ramesh",
  village: "Demo Village",
  district: "Mayurbhanj",
  state: "Odisha",
  language: "or",       // "en" | "hi" | "or"
  phone: "+91 9XXXX XX210",
  landArea: "2.5 acres",
  currentCrop: "Paddy",
  sowingDate: "12 July 2026",
  cropStage: "Vegetative Stage",
  cropHealth: "Moderate Stress",
  loanAmount: "₹1,20,000",
  loanDueDate: "30 August 2026",
  loanDueInDays: 8,
  profileCompleteness: 85,
};
```

Matches the demo narrative in both source documents exactly — no invented
identity details, phone number visually masked per the brief.

## 12. Component Architecture

```
FarmerProfilePage
│
├── ProfileHeader          (avatar, identity, completeness bar, Edit trigger)
├── PersonalInfoCard        (name, phone, village, district, state, language)
├── FarmInfoCard             (land, location, crop, sowing date, stage)
├── MyFarms                  (farm list, Add Farm)
├── CurrentCropCard          (crop summary, health badge, View Crop)
├── FinancialInfoCard        (loan amount, due-in, due date)
├── LanguageCard              (language chip selector)
├── NotificationPreferences  (toggle list)
├── EditProfileForm          (bottom sheet / modal, shown conditionally)
├── ProfileLoadingSkeleton | ProfileEmptyState | ProfileErrorState
├── SavedToast
└── BottomNav
```

Shared primitives: `Card` (the one card treatment used everywhere),
`Button` (primary/secondary/ghost/destructive), `Toggle`.

## 13. Frontend File Structure

```
app/
  farmer/
    profile/
      page.tsx

components/
  farmer/
    profile/
      ProfileHeader.tsx
      PersonalInfoCard.tsx
      FarmInfoCard.tsx
      CurrentCropCard.tsx
      FinancialInfoCard.tsx
      LanguageCard.tsx
      NotificationPreferences.tsx
      MyFarms.tsx
      EditProfileForm.tsx
      ProfileStates.tsx      (loading / empty / error / toast)
      BottomNav.tsx
  ui/
    Card.tsx
    Button.tsx
    Toggle.tsx

data/
  farmer.ts

types/
  farmer.ts

lib/
  cn.ts
```

### A note on your project's current layout

Your explorer shows a top-level `farmer profile/` folder (containing an
`image/` subfolder with an empty `farmer profile.tsx`), sitting alongside
your real `app/` folder rather than inside it. Next.js only resolves
routes from files inside `app/` — a page at
`farmer profile/image/farmer profile.tsx` won't be reachable at
`/farmer/profile`. For this to route correctly, the page file needs to
live at `app/farmer/profile/page.tsx` inside your actual `app/` directory.
If `farmer profile/image/` is meant to be a separate mockup/reference
folder rather than live code, that's fine — just don't expect Next.js to
route through it.

## 14. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| 360–430px (mobile) | Single column, cards stacked, bottom tab bar visible |
| 768px (tablet) | Hero full-width; content begins two-column grid |
| 1024–1440px (desktop) | Two-column grid, max content width ~768px centered, bottom tab bar hidden (assume top-level nav instead) |

Cards never go below a minimum comfortable width; on very narrow devices
the two-column field grids inside cards (e.g. Personal Information)
collapse to a single column automatically via wrapping, not by shrinking
text.

## 15. Accessibility

- Contrast: body text (#1E2A22) on cream/white backgrounds exceeds WCAG AA
  for normal text; muted text (#7A8B6F) is reserved for secondary labels
  only, not for anything essential.
- All custom controls use correct ARIA roles: `role="switch"` for
  notification toggles, `role="radiogroup"`/`role="radio"` for the
  language selector, `role="dialog"` + `aria-modal` for the edit sheet.
- Every interactive element has a visible focus ring
  (`focus-visible:outline`), not just a hover state.
- Form fields have real `<label>` elements tied via `htmlFor`/`id`;
  errors are linked with `aria-describedby` and `aria-invalid`.
- Minimum touch target 44×44px on all buttons and toggles.
- Urgency (loan due soon) is conveyed with an icon and text, never color
  alone.
- Errors state what's wrong and how to fix it in plain language ("Enter a
  valid phone number"), not generic "Invalid input."

## 16. Visual Design System

*(See §17 — there was no usable reference image, so this system was
authored from the written brief rather than extracted from a mockup.)*

| Token | Value | Use |
|---|---|---|
| Field Deep | `#1F3D2B` | Hero gradient start |
| Field Mid | `#2F6B3C` | Primary actions, active states |
| Harvest Gold | `#D8A13B` | Avatar accent, progress fill |
| Cream | `#FAF6EE` | Page background |
| Card | `#FFFFFF` | Card surface |
| Sand Border | `#E7DFC9` | Card borders |
| Ink | `#1E2A22` | Primary text |
| Ink Muted | `#7A8B6F` | Secondary text |
| Warning | `#C97A1E` | Loan-due urgency |
| Error | `#C0473B` | Validation errors |

**Typography:** serif display face (Fraunces) for the farmer's name and
card titles — gives the page warmth instead of a corporate-dashboard
feel; sans (Inter) for body copy; monospace (JetBrains Mono) for every
numeric value — land area, dates, loan amount, days remaining — so
measured farm data reads distinctly from prose at a glance.

**Cards:** 20px radius, 1px sand border, soft warm-tinted shadow (never
pure black), 20–24px padding, no hover elevation change (this is a
touch-first product; hover states aren't load-bearing).

**Buttons:** primary (solid green), secondary (green outline, white
fill), ghost (text-only), destructive (red outline) — pill-shaped,
44px minimum height.

**Icons:** a small set of agricultural emoji (🌾 🌱 💧) used sparingly as
accents, not as the primary icon system — chosen because they render
consistently without an icon-font dependency and read as warm rather than
corporate.

## 17. Reference-Image Analysis

No usable reference image was provided. Both images shared across this
project are screenshots of your Antigravity/VS Code IDE — showing your
file explorer and an empty `farmer profile.tsx` — not a visual mockup of
the profile page itself. There is no background, palette, card treatment,
or typography to extract from either screenshot.

Because the brief treats the reference image as the primary visual
source of truth, and none was actually available, §16 above is the
design system built from the *written* direction instead: "premium,
modern, farmer-first," "not a generic SaaS account page," "real
agricultural product." If you do have an actual design mockup (a Figma
export, a screenshot of a designed screen, a photo of a sketch), share
that and this section — along with the token table in §16 — should be
revised to match it. The component structure and behavior in §12–§13
would not need to change, only the visual tokens.

## 18. Loading / Empty / Error States

**Loading:** skeleton blocks matching each card's approximate shape and
the hero's height, using a soft pulse animation. Shown briefly on mount
to simulate a real fetch.

**Empty** *(no farm on record)*:
```
🌱
No farm added yet
Add your farm information to receive more personalized advice.
[Add Farm]
```

**Error** *(profile failed to load)*:
```
⚠️
Something went wrong
We couldn't load your profile.
[Try Again]
```

Both states reuse the page's card/typography language rather than a
generic system error screen.

## 19. Acceptance Criteria

- [x] The page clearly identifies the farmer (name, avatar, hero)
- [x] Farmer location is visible (village, district)
- [x] Land information is visible
- [x] Current crop is visible
- [x] Sowing date is visible
- [x] Crop stage is visible
- [x] Language is visible and changeable
- [x] Loan information is represented, styled non-banking
- [x] Profile editing is supported through frontend state, with validation
- [x] Notification preferences can be toggled independently
- [x] My Farms is represented, with an Add Farm path
- [x] Navigation remains consistent with existing Smart Crop bottom nav
- [x] Mobile layout is single-column and polished at 360–430px
- [x] Desktop layout becomes a two-column grid at ≥640px
- [x] Loading, empty, and error states exist and match the visual system
- [x] Accessibility requirements addressed (contrast, focus, labels, ARIA roles, touch targets)
- [ ] Visual styling follows a supplied reference image — **not applicable; no usable reference image was provided (see §17)**
- [x] The page reads as part of Smart Crop, not a generic profile template
- [x] No backend/API implementation required
- [x] All data demonstrated using mock frontend data

## 20. Frontend Implementation Notes

- **Stack:** Next.js App Router, TypeScript, Tailwind CSS, React state
  only (`useState`) — no server-side data fetching, matching your existing
  project's stack.
- **State lives in `page.tsx`** and is passed down as props; no global
  state library needed for a single page.
- **Fonts:** Fraunces / Inter / JetBrains Mono via `next/font/google` in
  your root layout (optional — the page degrades gracefully to your
  default sans-serif if skipped).
- **Path alias:** components import via `@/*`; confirm your
  `tsconfig.json` has that path mapped to project root.
- **Placement:** files should land inside your real `app/`, `components/`,
  `data/`, and `types/` folders — see §13's note on your current project
  layout.
- **Out of scope, confirmed:** no Prisma/Supabase, no API routes, no real
  SMS/notifications, no file upload, no authentication — everything here
  is a self-contained, demoable frontend.

---

*Companion implementation (all components listed in §12–§13, already
built and typechecked) is available in the previously shared
`smart-crop-farmer-profile.zip`. This document is the written
specification behind that code.*
