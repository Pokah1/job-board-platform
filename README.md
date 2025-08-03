#  Talentra – Professional Job Platform

Talentra is a **modern, responsive job platform** built with **Next.js (App Router)** and **Tailwind CSS**.  
It connects job seekers with top companies by providing **dynamic job listings**, **advanced filtering options**, and a **beautiful landing experience**.

---

##  Features

### **Landing Page**
- **Hero Section** with search functionality (job title, location)
- **CTA Buttons** for quick actions (Browse Jobs, Post a Job)
- **Statistics Section** showing active jobs, companies, and professionals
- **Feature Highlights** to promote platform benefits
- **Brand-focused navigation** with company logo and consistent color theme

### **Job Listings**
- **Dynamic Data Fetching** from a backend API
- **Error Handling** and **Loading States** for smooth UX
- **Pagination** or infinite scrolling for large datasets (planned)

### **Advanced Filtering**
- **Category Filtering** – Filter jobs by industry or role
- **Location Filtering** – Search by location or remote work
- **Experience Level Filtering** – Entry-Level, Mid-Level, Senior

### **Brand & Theme**
- **Professional color palette** with light/dark mode support
- **Custom global CSS variables** for easy theming
- **Brand color for "Talentra"** – blend of yellow and green in light mode, contrasting highlight in dark mode
- **Favicon & branding assets** for a polished identity

### **Responsive & Accessible**
- Fully **responsive** design for mobile, tablet, and desktop
- Accessible, semantic HTML for **SEO optimization**
- `useIsMobile` hook for conditional mobile rendering

---

##  Tech Stack

**Frontend**
- [Next.js (App Router)](https://nextjs.org/) – React framework
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- [Radix UI](https://www.radix-ui.com/) – Accessible UI components
- [Lucide React](https://lucide.dev/) – Modern icons

**Styling Utilities**
- `class-variance-authority` – Component variants management
- `clsx` – Conditional class merging

---

## Project Structure

job-board-platform/
├── app/ # App Router pages & layouts
│ ├── layout.tsx # Global layout
│ ├── page.tsx # Landing page
│ ├── favicon.ico # Site favicon
│ └── globals.css # Global styles
├── components/ # Reusable components
│ ├── ui/ # UI components (button, input, etc.)
│ ├── HeroSection.tsx # Main landing hero
│ ├── JobList.tsx # Job listings with filters
│ └── FilterBar.tsx # Filtering UI
├── public/ # Public assets (logo, images)
├── package.json
└── README.md

##  Global Styling

We use **CSS variables** for consistent theming:

##  Installation

### Clone the repository
git clone https://github.com/Pokah1/job-board-platform.git

### Navigate into the project folder
cd job-board-platform

### Install dependencies
npm install

### Start the development server
npm run dev

