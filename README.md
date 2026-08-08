# 🛍️ E‑Commerce Product Showcase

A server‑side rendered (SSR) Vue 3 application built with **Nuxt 3** and **Vuetify**.  
It displays products from a JSON dataset in a responsive grid, with category navigation, dynamic filtering, sorting, and promotional spots – all powered by Pinia state management.

---

## ✨ Features

- **Product Listing Page (PLP)**
  - Responsive grid layout with uniform product cards.
  - Promotional spots inserted at defined grid positions.
  - Filter by brand (dropdown) and sort by price or name.
  - Filter and sort state reflected in the URL (`?category=...&sort=...`).

- **Product Detail Page (PDP)**
  - Full product details, images, and variant selection.
  - Selecting a color (variant) updates the displayed image(s) and stock count.
  - Breadcrumb navigation based on product categories.
  - SEO meta tags (title, description) injected dynamically.

- **Navigation**
  - Hierarchical category sidebar menu (fully expanded, nesting visible).
  - Clicking any category (parent or leaf) filters the product list.
  - Active category is highlighted.

- **Technical Highlights**
  - Vue 3 Composition API with `<script setup>`.
  - Server‑Side Rendering (SSR) for better SEO and performance.
  - Pinia store for centralized data (products, categories, promos).
  - Type‑safe with TypeScript.
  - Modular and reusable component architecture.

---

## 🛠️ Tech Stack

- **Framework** – [Nuxt 3](https://nuxt.com/) (SSR)
- **UI Library** – [Vuetify 3](https://next.vuetifyjs.com/)
- **State Management** – [Pinia](https://pinia.vuejs.org/)
- **Language** – TypeScript
- **Routing** – Nuxt's file‑based router
- **Data** – Static JSON file (`public/data.json`)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm / yarn / pnpm / bun

### 1. Clone the repository

```bash
git clone git@github.com:kazisazzadhassan/ecommerce-app.git
cd ecommerce-app

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Project Structure (key folders)

ecommerce-app/
├── components/          # Reusable Vue components (cards, nav, selector, etc.)
├── composables/         # Composition functions (filtering/sorting logic)
├── pages/               # Route pages (index, product/[id])
├── public/              # Static assets (data.json)
├── stores/              # Pinia store (dataStore.ts)
├── app.vue              # Main layout (app bar, drawer, main content)
└── nuxt.config.ts       # Nuxt configuration with Vuetify module


## Data Source

All product, category, and promotional data is stored in assets/data.json. You can replace it with your own API endpoint by modifying the loadData() action in stores/dataStore.ts.


## License

This project is open‑source.