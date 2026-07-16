# 🚀 ClientSphere

> An AI-powered Freelancer CRM built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.

ClientSphere is a modern CRM platform designed for freelancers, agencies, and startups to manage clients, projects, invoices, notes, and tasks from a single dashboard.

---

## ✨ Features

### 📊 Dashboard
- Modern analytics dashboard
- Revenue overview
- Project summary
- Client statistics
- Responsive UI

### 👥 Client Management
- Add clients
- Edit client details
- Delete clients
- Search clients
- Company information
- Contact management

### 📁 Project Management
- Create projects
- Track project status
- Set priorities
- Assign clients
- Project timeline

### ✅ Task Management
- Create tasks
- Track progress
- Priority management
- Task status updates

### 📝 Notes
- Personal notes
- Edit/Delete notes
- Rich note management

### 💳 Invoice Management
- Generate invoices
- Invoice status
- Tax & discount support
- Due dates

### ⚙ Settings
- Company profile
- Currency selection
- Timezone settings
- Theme preference
- Notification preferences

### 🔍 Global Search
Search instantly across:
- Clients
- Projects

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

## Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)

## Authentication

- NextAuth.js
- Prisma Adapter

---

# 📂 Folder Structure

```
src/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   └── auth/
│
├── components/
│   ├── dashboard/
│   ├── clients/
│   ├── projects/
│   ├── notes/
│   └── invoices/
│
├── lib/
├── hooks/
└── utils/

prisma/
├── schema.prisma
└── migrations/
```

---

# ⚡ Installation

Clone the repository

```bash
git clone https://github.com/shambhavi614/clientsphere.git
```

Move into the project

```bash
cd clientsphere
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=your_database_url

AUTH_SECRET=your_secret

AUTH_URL=http://localhost:3000
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate deploy
```

Start development server

```bash
npm run dev
```

---

# 📸 Screenshots

> Add screenshots here

Dashboard

Clients

Projects

Invoices

Notes

Settings

---

# 🚀 Upcoming Features

- 🔔 Real-time Notifications
- 📅 Calendar
- 🤖 AI Assistant
- 📈 Revenue Analytics
- 💬 Client Chat
- 📂 File Uploads
- 📧 Email Integration
- 📄 PDF Invoice Export
- 🌙 Dark / Light Theme
- 📱 Mobile App

---

# 🤝 Contributing

Contributions are welcome!

Fork the repository and submit a Pull Request.

---

# 📄 License

MIT License

---

# 👩‍💻 Developer

**Shambhavi Jha**

B.Tech CSE (AI)

Frontend Developer | AI Enthusiast

GitHub:
https://github.com/shambhavi614

---

⭐ If you like this project, don't forget to star the repository!