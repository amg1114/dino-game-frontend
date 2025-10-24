
# 🦖 DinoGame Frontend

DinoGame is a modern web platform designed for buying and selling video games, connecting developers and players in a dynamic and secure environment.  
This repository contains the **frontend application**, built with React and TypeScript, focused on delivering an intuitive, responsive, and high-performance user experience.

---

## 🚀 Overview

The DinoGame frontend provides an interactive interface where users can explore games, read news, purchase titles, and manage their profiles.  
Developers can publish and manage their games, while administrators oversee the platform through dedicated dashboards.

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|--------------|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Form Validation | Zod |
| Charts & Widgets | Recharts |
| Icons & UI | Lucide React, shadcn/ui |
| Routing | React Router |
| Hosting | Railway + Caddy |
| Linting & Formatting | ESLint + Prettier + Lefthook |

---

## 🏗️ Architecture

The project follows a **modular architecture** organized by features and contexts:

- `pages/` – Views grouped by feature (auth, dashboard, videogames, etc.).  
- `components/` – Reusable UI components and form inputs.  
- `hooks/` – Custom React hooks for logic abstraction.  
- `providers/` – Context providers for authentication and alert management.  
- `utils/` – Helpers for data formatting, validation, and constants.  
- `models/` – TypeScript interfaces and DTO definitions.

---

## ⚙️ Main Features

- 🕹️ **Game Marketplace** – Explore, buy, and review games.  
- 🧑‍💻 **Developer Tools** – Upload games, track stats, and manage discounts.  
- 📰 **Blog & News System** – Publish and browse community posts.  
- 📊 **Admin Dashboard** – Manage users, games, categories, and reports.  
- 🧠 **Smart UI Hooks** – Custom pagination, auth, alerts, and dynamic routing.  
- 🌙 **Responsive Design** – Built for desktop and mobile with Tailwind CSS.  

---

## 👥 User Roles

| Role | Description |
|------|--------------|
| **Administrator** | Full control of content, users, and moderation tools. |
| **Developer** | Can publish and manage games, discounts, and statistics. |
| **User** | Browse, purchase, and review games while following news. |

---

## 🧪 Testing & Quality

Frontend testing strategy includes:  
- **Unit & Integration Tests:** Jest + React Testing Library.  
- **E2E Tests:** Cypress for user flows.  
- **Accessibility Tests:** axe-core + cypress-axe.  
- **Visual Regression:** Percy or Chromatic snapshots.

Continuous integration ensures every commit is linted, tested, and validated automatically.

---

## 🧰 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/amg1114/dino-game-frontend.git
cd dino-game-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Lint & format code
npm run lint
npm run format
```

---

## 📂 Project Structure (simplified)

```
src/
├─ pages/
├─ components/
├─ hooks/
├─ providers/
├─ models/
├─ utils/
└─ assets/
```

---

## 👨‍💻 Team & Credits

| Member | Role |
|---------|------|
| **Johan Alejandro Moreno Gil** | 💼 Lead Full-Stack Developer, Scrum Master, UI/UX Designer |
| Andrés Felipe Cabal Correa | Full-Stack Developer |
| Daniel José Cuestas Parada | Frontend Developer / QA |
| Natalia Gómez Delacruz | Frontend Developer |
| Gina Paola Moreno Caicedo | Frontend Developer |

> **Project developed at Universidad del Valle – Tuluá Campus (2025)**  
> Under the course *Software Product Quality* – guided by *Ing. Luis Adrián Lasso C., M.Sc.*

---

## 🏁 License

This project is for academic and portfolio purposes.  
All rights reserved © 2025 – DinoGame Team.
