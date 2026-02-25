# Premium Arabic Bags Landing Page

Landing page for a premium bag-printing business in Algeria (Arabic RTL), built with Next.js App Router.
It includes animated hero visuals, product pricing cards, specs accordion tables, and an order form with WhatsApp CTAs.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open:
```text
http://localhost:3000
```

## Folder Structure

```text
s_public/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProductCards.tsx
│   │   ├── SpecsAccordion.tsx
│   │   └── OrderForm.tsx
│   └── ui/
│       ├── FadeInSection.tsx
│       ├── ScrollProgress.tsx
│       ├── WaveDivider.tsx
│       └── WhatsAppFloat.tsx
├── public/
├── tailwind.config.ts
├── package.json
└── README.md
```

## Customization Guide

### 1. Change WhatsApp Number

Update these files:
- `components/ui/WhatsAppFloat.tsx`
- `components/sections/HeroSection.tsx`
- `components/sections/OrderForm.tsx`

Replace URL format:
```text
https://wa.me/213XXXXXXXXX
```

### 2. Change Colors and Theme

Primary global tokens are in:
- `app/globals.css` (`@theme inline` CSS variables)
- `tailwind.config.ts` (extended colors/shadows/radius)

Main section backgrounds are in:
- `HeroSection.tsx`
- `ProductCards.tsx`
- `SpecsAccordion.tsx`
- `OrderForm.tsx`

### 3. Change Products and Pricing

Edit hardcoded product datasets in:
- `components/sections/ProductCards.tsx`
- `components/sections/SpecsAccordion.tsx`

Data includes:
- Product names (Arabic/French)
- Sizes
- Quantities
- Unit prices
- Feature bullets

### 4. Change Form Fields/Validation

Edit:
- `components/sections/OrderForm.tsx`

Key areas:
- `FormData` interface
- `useForm` rules in `register(...)`
- Submission behavior in `onSubmit`

## Build and Lint

```bash
npm run lint
npm run build
```
