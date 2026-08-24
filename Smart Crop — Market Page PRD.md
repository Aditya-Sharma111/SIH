# Smart Crop — Market Page PRD

## 1. Objective

Build a production-quality **Market Page** for the existing Smart Crop farmer platform.

The purpose of this page is to help a farmer decide:

> **Where should I sell my crop to get the best net realization?**

The page should not simply display mandi prices.

It should combine:

- Current crop
- Nearby mandi prices
- Price trends
- Transport costs
- Net realization
- MSP comparison
- Best market recommendation
- Market comparison

The core decision flow is:

```text
Current Crop
      ↓
Nearby Mandis
      ↓
Mandi Prices
      ↓
Transport Cost
      ↓
Net Realization
      ↓
MSP Comparison
      ↓
🏆 Best Market
```

---

# 2. IMPORTANT — Existing Project

This page is part of an existing **Smart Crop Next.js application**.

Before coding:

1. Inspect the existing project.
2. Inspect the existing `crop-monitoring` folder.
3. Inspect existing farmer authentication.
4. Inspect existing crop data.
5. Inspect existing navigation/sidebar.
6. Inspect existing UI components.
7. Inspect existing API/service structure.
8. Inspect existing TypeScript types.
9. Inspect existing market-related code if available.

### Critical rule

**Do NOT create a separate market architecture if one already exists.**

Reuse existing:

- Authentication
- Farmer information
- Crop information
- Layout
- Navbar
- Sidebar
- Cards
- Buttons
- Modals
- Tables
- Charts
- API services
- Types
- Utilities
- Theme

If an existing market API exists, use it.

If market data does not yet exist, create a clean mock-data layer that can later be replaced by an API.

---

# 3. Technology

Use the technologies already used by the project.

Preferred:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Responsive design

Do not install unnecessary libraries.

If a chart library already exists in the project, reuse it.

If no chart library exists and a price-trend chart is required, use the lightest suitable solution.

---

# 4. Page Route

Follow the existing routing architecture.

Preferred route:

```text
/market
```

or, if the project already scopes farmer features under crop monitoring:

```text
/crop-monitoring/market
```

Do not create a conflicting route.

The Market page should be accessible from the existing farmer navigation:

```text
Dashboard
My Crops
Market
Equipment
Notifications
```

---

# 5. Core User Story

### Farmer

> "I have Paddy. Which nearby mandi should I sell it at after considering transport costs?"

The page should answer this question immediately.

Example:

```text
Current Crop: Paddy

Bhadrak
Mandi Price: ₹2,410/qtl
Transport: ₹120/qtl

Net Realization:
₹2,410 - ₹120
= ₹2,290/qtl

🏆 Best option: Bhadrak
```

---

# 6. Page Layout

Create the following structure:

```text
MARKET
│
├── Current Crop
│
├── Market Summary
│
├── Nearby Mandis
│
├── Best Market Recommendation
│
├── Price Trend
│
├── Transport Cost
│
├── Net Realization
│
├── MSP Comparison
│
└── Compare All Markets
```

---

# 7. Header

Create a clean page header:

```text
MARKET

Find the best market for your crop

Current crop:
🌾 Paddy
```

Allow the farmer to switch crops if they have multiple registered crops.

Example:

```text
Current Crop

[ 🌾 Paddy ▼ ]
```

The crop selector should use the farmer's existing registered crops.

Do NOT create a new crop-registration system.

---

# 8. Market Summary Cards

Create a row of summary cards.

### Current Market Price

```text
₹2,410/qtl

Highest Nearby Price
↑ 4.2%
```

### Best Net Realization

```text
₹2,290/qtl

Bhadrak
```

### MSP

```text
₹2,300/qtl

Paddy
```

### Nearby Markets

```text
4

Markets Available
```

Use the actual available data instead of hardcoding these values once APIs are connected.

---

# 9. Nearby Mandis

This is the most important section.

Title:

```text
Nearby Mandis
```

Display a table or responsive cards.

Example:

```text
┌─────────────────────────────────────────────────────┐
│ Mandi       Price       Transport     Net           │
├─────────────────────────────────────────────────────┤
│ Baripada    ₹2,200      ₹100/qtl      ₹2,100        │
│ Balasore    ₹2,350      ₹140/qtl      ₹2,210        │
│ Jaleswar    ₹2,280      ₹110/qtl      ₹2,170        │
│ Bhadrak     ₹2,410      ₹120/qtl      ₹2,290  ⭐     │
└─────────────────────────────────────────────────────┘
```

Columns:

- Mandi
- Distance
- Mandi Price
- Transport Cost
- Net Realization
- MSP Difference
- Recommendation

---

# 10. Mandi Cards

On mobile, convert the table into cards.

Example:

```text
┌──────────────────────────────┐
│ ⭐ Bhadrak                   │
│                              │
│ Mandi Price                  │
│ ₹2,410/qtl                   │
│                              │
│ Transport                    │
│ ₹120/qtl                     │
│                              │
│ Net Realization              │
│ ₹2,290/qtl                   │
│                              │
│ ₹ -10 below MSP              │
│                              │
│ 🏆 Best Option               │
│                              │
│ [ View Details ]             │
└──────────────────────────────┘
```

---

# 11. Best Market Recommendation

Create a prominent recommendation card.

Example:

```text
🏆 BEST MARKET FOR YOUR CROP

Bhadrak Mandi

Mandi Price
₹2,410/qtl

Transport Cost
− ₹120/qtl

────────────────

Net Realization
₹2,290/qtl

Best among nearby markets

[ View Market Details ]
```

The recommendation must be calculated using:

```text
Net Realization =
Mandi Price - Transport Cost
```

Do not select the mandi solely based on the highest mandi price.

---

# 12. Net Realization

Create a dedicated section explaining the calculation.

Example:

```text
NET REALIZATION

Bhadrak

Mandi Price
₹2,410/qtl

−

Transport
₹120/qtl

────────────────

₹2,290/qtl
```

Add a small explanation:

```text
Estimated amount received after
transport cost.
```

If additional costs are supported later, the calculation should be extensible:

```text
Net Realization =
Mandi Price
− Transport
− Other Selling Costs
```

---

# 13. Price Comparison

Show the mandi prices visually.

Example:

```text
Nearby Mandi Prices

Bhadrak     ₹2,410  ████████████████████
Balasore    ₹2,350  ██████████████████
Jaleswar    ₹2,280  █████████████████
Baripada    ₹2,200  ███████████████
```

Make the highest price visually identifiable.

Do not use excessive colors.

---

# 14. Price Trend

Create:

```text
Price Trend
```

Show historical mandi price movement.

Example:

```text
Paddy Price — Bhadrak

₹2,500 ┤
       │             ╭──╮
₹2,400 ┤        ╭────╯  ╰──
       │   ╭────╯
₹2,300 ┤───╯
       │
₹2,200 ┤
       └────────────────────
        Jul  Aug  Sep  Oct
```

Provide timeframe controls:

```text
7 Days
30 Days
3 Months
6 Months
```

If real price-history data is unavailable, use mock data and clearly structure it for API replacement.

---

# 15. Price Trend Summary

Below the chart:

```text
30-Day Trend

Current Price
₹2,410/qtl

30 Days Ago
₹2,280/qtl

Change
↑ ₹130/qtl
+5.7%
```

Add:

```text
Trend: Increasing
```

Do not make unsupported predictions.

The page should show historical/current information, not claim that prices will definitely rise or fall.

---

# 16. Transport Section

Create:

```text
TRANSPORT
```

Show transport cost for each mandi.

Example:

```text
Bhadrak

Distance
~140 km

Estimated Transport
₹120/qtl
```

If the existing platform has location data:

Use the farmer's farm location and mandi location.

If routing/transport APIs are available, integrate them through the existing architecture.

If not, use mock transport data.

---

# 17. Transport Comparison

Create a simple comparison:

```text
Transport Cost

Baripada     ₹100/qtl
Balasore     ₹140/qtl
Jaleswar     ₹110/qtl
Bhadrak      ₹120/qtl
```

The farmer should be able to understand why a mandi with a higher price may not necessarily produce the best net realization.

---

# 18. MSP Comparison

Create:

```text
MSP COMPARISON
```

Example:

```text
Paddy MSP

₹2,300/qtl

Bhadrak Mandi

₹2,410/qtl

Market Price vs MSP

+₹110/qtl
```

Show status:

```text
✓ Above MSP
```

or:

```text
⚠ Below MSP
```

Calculate:

```text
Price Difference =
Mandi Price - MSP
```

Important:

Do not hardcode MSP permanently.

Create a data structure so MSP can later come from an official/current source.

---

# 19. Net Realization vs MSP

Show the farmer the important distinction:

```text
Mandi Price
₹2,410/qtl

MSP
₹2,300/qtl

Transport
₹120/qtl

Net Realization
₹2,290/qtl
```

This makes it clear that:

> A mandi price above MSP does not automatically mean the farmer's net realization is above MSP after transport.

---

# 20. Compare All Markets

Add a primary action:

```text
[ Compare All Markets ]
```

Clicking this should open either:

- A dedicated comparison page
- A modal
- A full-screen comparison view

Use whichever pattern already exists in the project.

The comparison should include:

```text
Mandi
Price
Distance
Transport
Net Realization
MSP Difference
Rank
```

Example:

```text
1. Bhadrak
₹2,410
₹120 transport
₹2,290 net
⭐ Best

2. Balasore
₹2,350
₹140 transport
₹2,210 net

3. Jaleswar
₹2,280
₹110 transport
₹2,170 net

4. Baripada
₹2,200
₹100 transport
₹2,100 net
```

---

# 21. Market Details

When a farmer clicks a mandi:

Show:

```text
Bhadrak Mandi

Current Price
₹2,410/qtl

Price Trend
↑ 5.7%

Distance
140 km

Transport
₹120/qtl

Net Realization
₹2,290/qtl

MSP
₹2,300/qtl

MSP Difference
−₹10/qtl
```

Add:

```text
[ Back to Markets ]
```

---

# 22. Market Recommendation Logic

Create a reusable function:

```typescript
calculateNetRealization(
  mandiPrice,
  transportCost
)
```

Formula:

```text
Net Realization =
Mandi Price - Transport Cost
```

Then:

```typescript
findBestMarket(markets)
```

should select the market with the highest net realization.

Example:

```typescript
const bestMarket = markets.reduce((best, market) =>
  market.netRealization > best.netRealization
    ? market
    : best
);
```

Do not manually mark Bhadrak as the best market.

The UI should calculate the recommendation from the data.

---

# 23. Market Data Type

Create or reuse a TypeScript type.

Example:

```typescript
interface Market {
  id: string;
  name: string;
  crop: string;
  pricePerQuintal: number;
  distanceKm: number;
  transportCostPerQuintal: number;
  msp: number;
  updatedAt: string;
}
```

Computed values:

```typescript
netRealization
mspDifference
rank
```

should preferably be calculated rather than stored redundantly.

---

# 24. Mock Data

If no market API exists yet, create a temporary mock data file.

Example:

```typescript
const marketData = [
  {
    id: "baripada",
    name: "Baripada",
    crop: "Paddy",
    pricePerQuintal: 2200,
    distanceKm: 40,
    transportCostPerQuintal: 100,
    msp: 2300,
    updatedAt: "2026-08-23",
  },
  {
    id: "balasore",
    name: "Balasore",
    crop: "Paddy",
    pricePerQuintal: 2350,
    distanceKm: 100,
    transportCostPerQuintal: 140,
    msp: 2300,
    updatedAt: "2026-08-23",
  },
  {
    id: "jaleswar",
    name: "Jaleswar",
    crop: "Paddy",
    pricePerQuintal: 2280,
    distanceKm: 80,
    transportCostPerQuintal: 110,
    msp: 2300,
    updatedAt: "2026-08-23",
  },
  {
    id: "bhadrak",
    name: "Bhadrak",
    crop: "Paddy",
    pricePerQuintal: 2410,
    distanceKm: 140,
    transportCostPerQuintal: 120,
    msp: 2300,
    updatedAt: "2026-08-23",
  },
];
```

IMPORTANT:

This is demonstration data only.

Do not present mock data as verified live mandi prices.

Make it easy to replace with a real API.

---

# 25. API Architecture

Prepare the code so the UI can later consume:

```text
GET /api/markets?crop=paddy
GET /api/markets/:id
GET /api/markets/:id/prices
GET /api/markets/:id/transport
GET /api/markets/:id/trends
GET /api/crops/:cropId/markets
```

If APIs already exist in the project, use them instead.

Do not create duplicate APIs.

---

# 26. Loading State

Create loading states for:

- Current crop
- Mandi list
- Price trend
- Transport
- MSP
- Recommendation

Use the existing project's skeleton components if available.

---

# 27. Error State

If market data cannot be loaded:

```text
Unable to load market information.

Please try again.

[ Retry ]
```

Do not show fake values after an API failure unless the application explicitly has a fallback/mock mode.

---

# 28. Empty State

If there are no nearby markets:

```text
No nearby markets found.

Try expanding your search radius.
```

Add:

```text
[ Search More Markets ]
```

---

# 29. Mobile Design

The page must be mobile-first.

Desktop:

```text
┌──────────────────────────────────────────────┐
│ MARKET                                       │
│ Current Crop: Paddy                          │
├──────────────────────────────────────────────┤
│ Summary Cards                                │
├──────────────────────────────────────────────┤
│ Nearby Mandis                                │
│                                              │
│ Mandi | Price | Transport | Net              │
├──────────────────────────────────────────────┤
│ 🏆 Best Market                               │
├──────────────────────────────────────────────┤
│ Price Trend                                  │
├──────────────────────────────────────────────┤
│ MSP Comparison                               │
└──────────────────────────────────────────────┘
```

Mobile:

```text
MARKET

Current Crop
🌾 Paddy

Summary
────────────

🏆 Best Market
Bhadrak

₹2,410/qtl
− ₹120 transport

₹2,290/qtl net

Nearby Mandis
────────────

Bhadrak
₹2,410 → ₹2,290 net

Balasore
₹2,350 → ₹2,210 net

Jaleswar
₹2,280 → ₹2,170 net

Baripada
₹2,200 → ₹2,100 net

Price Trend
────────────

MSP Comparison
────────────

[ Compare All Markets ]
```

Do not simply shrink the desktop table.

---

# 30. Visual Design

Follow the existing Smart Crop design system.

Use:

- Clean white/light background
- Agricultural green accent
- Neutral text
- Rounded cards
- Soft borders
- Subtle shadows
- Clear hierarchy
- Accessible contrast
- Professional typography

Use green for positive outcomes.

Use warning colors only for warnings.

Avoid excessive:

- Gradients
- Animations
- Emojis
- Colors
- Decorative elements

The interface should look like a professional agriculture/fintech decision-support platform.

---

# 31. Icons

Use Lucide React icons if already installed.

Suggested:

```text
Store
MapPin
Truck
TrendingUp
TrendingDown
IndianRupee
Award
Navigation
BarChart3
ArrowRight
Info
RefreshCw
```

Do not use huge icons.

---

# 32. Important UX Principle

The farmer should understand the answer within a few seconds:

> **Which mandi gives me the best money after transport?**

Therefore the visual hierarchy should be:

```text
1. 🏆 Best Market
2. 💰 Net Realization
3. Nearby Mandi Comparison
4. Transport Cost
5. Mandi Price
6. MSP Comparison
7. Price Trend
```

Do not make the price chart more prominent than the actual selling decision.

---

# 33. Data Accuracy Principles

This is a financial/agricultural decision-support feature.

Therefore:

- Clearly show when prices were last updated.
- Clearly label estimated transport costs.
- Do not claim prices are live unless they come from a live source.
- Do not make guaranteed future price predictions.
- Do not claim a market is objectively "best" unless the calculation supports it.
- Show the calculation behind the recommendation.

Example:

```text
Last updated:
23 Aug 2026, 10:30 AM
```

For estimated values:

```text
Estimated transport
```

---

# 34. Future Extensibility

The architecture should allow future features such as:

```text
Mandi Map
Distance-based market search
Real-time mandi prices
Historical price trends
Transport booking
Vehicle availability
Farmer-to-mandi route
Market demand
Expected selling quantity
Other selling costs
Storage costs
Commission
```

Do not implement all of these now.

Build the current page cleanly so they can be added later.

---

# 35. Component Structure

Reuse existing components first.

If new components are required, use something similar to:

```text
components/
└── market/
    ├── MarketHeader.tsx
    ├── CropSelector.tsx
    ├── MarketSummary.tsx
    ├── NearbyMarkets.tsx
    ├── MarketCard.tsx
    ├── BestMarketCard.tsx
    ├── PriceTrendChart.tsx
    ├── TransportSummary.tsx
    ├── MSPComparison.tsx
    └── MarketComparison.tsx
```

Do not create duplicates if equivalent components already exist.

---

# 36. Acceptance Criteria

The implementation is complete only when:

- [ ] Market page exists in the correct existing route structure.
- [ ] Existing farmer authentication is respected.
- [ ] Current farmer's crop can be selected.
- [ ] Nearby mandis are displayed.
- [ ] Mandi prices are displayed.
- [ ] Transport costs are displayed.
- [ ] Net realization is calculated.
- [ ] Best market is calculated automatically.
- [ ] MSP is displayed.
- [ ] Market price vs MSP is displayed.
- [ ] Price trend is displayed.
- [ ] Last updated time is displayed.
- [ ] Estimated values are clearly labelled.
- [ ] All markets can be compared.
- [ ] Market details can be opened.
- [ ] Loading state exists.
- [ ] Error state exists.
- [ ] Empty state exists.
- [ ] Mobile UI works properly.
- [ ] Desktop UI works properly.
- [ ] No unnecessary duplicate architecture is created.
- [ ] No TypeScript errors.
- [ ] No console errors.
- [ ] No broken buttons or navigation.
- [ ] Existing Smart Crop design system is respected.

---

# 37. Final Product Flow

The finished feature should provide this experience:

```text
Farmer Login
      ↓
Smart Crop Dashboard
      ↓
MARKET
      ↓
Select Current Crop
      ↓
🌾 Paddy
      ↓
Nearby Mandis
      ↓
Mandi Prices
      ↓
Transport Costs
      ↓
Calculate Net Realization
      ↓
Compare with MSP
      ↓
🏆 Recommend Best Market
      ↓
[ Compare All Markets ]
```

The central product value is:

> **Don't just show the farmer the highest mandi price. Show the farmer where they can potentially get the best net realization after considering transport costs.**

---

# 38. Final Development Instruction

Before coding:

1. Inspect the existing project.
2. Inspect the existing `crop-monitoring` folder.
3. Find existing crop/farmer data.
4. Find existing navigation.
5. Find existing UI components.
6. Find existing API/service patterns.
7. Find any existing market functionality.
8. Reuse everything possible.
9. Only then implement the Market Page.
10. Run lint/build checks.
11. Fix all errors.
12. Verify desktop and mobile layouts.

**Do not rewrite the existing application.**

**Do not create duplicate authentication, crop registration, farmer data, or APIs.**

Build the Market Page as a clean, reusable module that fits naturally into the existing Smart Crop application.