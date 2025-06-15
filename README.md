# 🏃‍♂ HabitTrackr

**HabitTrackr** is a full-stack web application that helps users build and track personal habits with daily check-ins, progress charts, and motivational insights.


## 🚀 Live Demo

🌐 [https://simple-habit-tracker-app.vercel.app/](https://simple-habit-tracker-app.vercel.app/)

---

## 🧰 Tech Stack

| Layer        | Technology                    |
| ------------ | ----------------------------- |
| Frontend     | [Next.js 15+](https://nextjs.org/) (App Router) |
| Language     | TypeScript                    |
| Styling      | Tailwind CSS, [shadcn/ui](https://ui.shadcn.dev) |
| Authentication | [Better Auth](https://github.com/maticzav/better-auth) |
| ORM & DB     | Drizzle ORM + PostgreSQL (NeonDB) |
| Backend API  | Next.js API Routes (App Router) |
| State Mgmt   | React Server Components + TanStack React Query |
| Deployment   | [Vercel](https://vercel.com)  |
| Package Manager | [Bun](https://bun.sh)       |

---

## 📦 Features

### ✅ Core Features
- 🔐 User Authentication (Signup, Login, Logout)
- 🧠 Habit Management (Create, Edit, Delete)
- ✅ Daily Habit Completion Tracker
- 📊 Dashboard showing:
  - Category-based habit performance
  - Weekly/monthly summaries

### ✨ Bonus Features
- 📅 Calendar view of daily completions
- 🏆 Longest streak tracking
- 🎨 Color-coded habit categories
- 💬 Random motivational quotes on dashboard
- 📱 Fully responsive on mobile and desktop

---

## 🛠 Getting Started

### 1. Clone the Repository

bash
git clone https://github.com/DubaKanu/Simple-Habit-Tracker-App.git
cd habittrackr
`

### 2. Install Dependencies

Using **Bun**:

bash
bun install


### 3. Set Up Environment Variables

Create a `.env` file and configure the following:

env
DATABASE_URL=your_postgres_url
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000


You can also copy `.env.example`:

bash
cp .env.example .env


### 4. Run the App Locally

bash
bun run dev


### 5. Run Lint and Build

bash
bun run lint
bun run build


---


