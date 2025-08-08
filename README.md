
# Weather-Driven Polygon Dashboard

This project is a weather visualization dashboard that enables users to draw polygons on a Leaflet map and apply threshold-based color rules based on real-time weather data using the Open-Meteo API. The application allows for temporal data filtering via a timeline slider and visual updates of polygons based on selected weather parameters like temperature.

## Live Demo

**Deployed URL:** [https://mind-webs-ventures-dashboard-6h37.vercel.app](https://mind-webs-ventures-dashboard-6h37.vercel.app)

---

## Features

- Interactive Leaflet map with polygon drawing tools.
- Drawn polygons are validated to have 3–12 points.
- Each polygon can be associated with a weather data source (e.g., temperature).
- Users can set multiple threshold-based coloring rules (e.g., `< 10 = red`, `>= 25 = green`).
- The dashboard uses the Open-Meteo API to fetch hourly weather data.
- Supports hourly data averaging when the selected timeline range spans multiple hours.
- Polygons dynamically update their color based on live weather data and timeline changes.
- Timeline slider for controlling the time range of data visualization.
- Sidebar interface for managing data source selection and threshold rules per polygon.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-polygon-dashboard.git
cd weather-polygon-dashboard
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

### 4. Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

---

## Technologies Used

### Frontend & UI

* **Next.js (App Router)** – React framework for SSR and routing
* **React** – UI development
* **Tailwind CSS** – Utility-first CSS framework
* **Lucide React** – Icon library for action buttons
* **Zustand** – Global state management for timeline, polygons, and data sources
* **date-fns** – Date formatting and utility functions

### Map & Visualization

* **Leaflet.js** – Map rendering and manipulation
* **React-Leaflet** – React bindings for Leaflet
* **React-Leaflet-Draw** – Leaflet.draw integration for drawing/editing polygons

### APIs & Data

* **Open-Meteo API** – Free weather API used to fetch historical hourly temperature data based on polygon centroid coordinates
  Example Endpoint Used:

  ```
  https://archive-api.open-meteo.com/v1/archive
  ```

---

## Design and Development Remarks

* Polygons are drawn using Leaflet’s draw plugin and validated to enforce minimum/maximum vertex limits.
* Each polygon is identified by a unique ID and stores associated data rules and source configurations.
* Open-Meteo API is used to fetch hourly temperature data for given coordinates and date ranges.
* Rule-based color application is modular, making the app extensible to multiple data types (e.g., precipitation, wind).
* State management is handled cleanly using Zustand, ensuring separation of concern between UI and logic.
* Components like `Sidebar`, `TimelineSlider`, and `MapDashboard` are structured for reusability and clarity.
* Uses centralized utility functions (`getPolygonCentroid`, `applyColorFromRules`) for core logic.




## License

This project is for academic or demonstrational purposes only. API usage must comply with [Open-Meteo's terms of service](https://open-meteo.com/en/docs#terms).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
