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
<img width="1879" height="915" alt="image" src="https://github.com/user-attachments/assets/76d71108-9aed-4de4-a860-bd8cb61d005b" />


Clients
<img width="1885" height="884" alt="image" src="https://github.com/user-attachments/assets/33d1b3bb-a421-40cd-8471-588068233488" />


Projects
<img width="1895" height="904" alt="image" src="https://github.com/user-attachments/assets/26b82520-76a9-48b3-b5a8-ee3a7cd894bd" />


Invoices
<img width="1901" height="911" alt="image" src="https://github.com/user-attachments/assets/24097537-5f1b-4bd0-a60f-c3d5a0d10a43" />


Notes
<img width="1902" height="892" alt="image" src="https://github.com/user-attachments/assets/27a89597-6a79-4526-9286-096181b0c2bd" />


Settings
<img width="1891" height="915" alt="image" src="https://github.com/user-attachments/assets/95acf07b-3ed8-496c-93f0-2a17daed4680" />


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
