# 🚀 Awesome React Blog — Blog Profile of Quang Nhật

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

**A modern Blog Profile combining personal portfolio and technical blog, built with React.js**

[🌐 Live Demo](https://github.com/nhatlq20/awesome-react-blog) · [👤 My GitHub](https://github.com/nhatlq20) · [📧 Contact](mailto:qnhat202005@gmail.com)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌙 **Dark / Light Mode** | Smooth toggle with spring animation, persisted via localStorage |
| 🖱️ **Custom Cursor** | Animated follower cursor with hover & click effects |
| ⌨️ **Typing Effect** | Auto-cycling role titles in hero section |
| 📊 **Reading Progress Bar** | Gradient scroll progress bar on blog posts |
| 📋 **Table of Contents** | Auto-generated from headings, highlights active section |
| 💻 **Code Highlighting** | VS Code dark theme (vscDarkPlus) with copy-to-clipboard |
| 🔍 **Search & Filter** | Filter blog posts by search query, category, and tags |
| 📅 **Interactive Timeline** | Click to expand/collapse experience & education items |
| 📈 **Skill Progress Bars** | Animated skill bars triggered on scroll into viewport |
| 🐙 **GitHub Activity Graph** | Contribution heatmap visualization |
| ⚡ **Lazy Loading** | All pages code-split with `React.lazy` + `Suspense` |
| 💀 **Skeleton Loading** | Elegant loading placeholders while pages load |
| 🎭 **Page Transitions** | Smooth AnimatePresence route transitions |
| 📬 **Contact Form** | With animated success state |
| 📱 **Responsive** | Mobile-first, works on all screen sizes |

---

## 🛠️ Tech Stack

```
Frontend:   React 19, React Router v6, Framer Motion
Styling:    Tailwind CSS 3, Custom CSS Variables
Content:    react-markdown, remark-gfm
Code:       react-syntax-highlighter (vscDarkPlus)
Animation:  Framer Motion (page transitions, scroll animations)
Hooks:      react-intersection-observer, custom hooks
```

---

## 📁 Project Structure

```
awesome-react-blog/
├── public/
│   └── index.html          # SEO meta tags, Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Glassmorphism floating navbar
│   │   ├── Footer.jsx       # Footer with social links
│   │   ├── CustomCursor.jsx # Custom animated cursor
│   │   └── UI.jsx           # Shared components (BlogCard, ProjectCard, etc.)
│   ├── pages/
│   │   ├── HomePage.jsx     # Hero, Skills, GitHub Graph, Featured posts
│   │   ├── BlogPage.jsx     # Blog listing with search & filter
│   │   ├── BlogPostPage.jsx # Individual post with ToC & code highlighting
│   │   ├── ProjectsPage.jsx # Projects grid with tag filter
│   │   └── AboutPage.jsx    # Profile, Skills, Timeline, Contact form
│   ├── hooks/
│   │   ├── useDarkMode.js   # Dark mode with localStorage
│   │   └── useReadingProgress.js # Scroll progress tracker
│   ├── content/
│   │   └── data.js          # All site data (posts, profile, skills, projects)
│   ├── App.js               # Router setup with AnimatePresence
│   └── index.css            # Global styles, Tailwind, animations
└── tailwind.config.js       # Custom theme (colors, fonts, animations)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nhatlq20/awesome-react-blog.git

# Navigate to project directory
cd awesome-react-blog/awesome-react-blog

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

---

## 📄 Pages Overview

**🏠 Home** — Hero with typing effect, skill bars, GitHub activity graph, featured posts & projects

**📝 Blog** — Article listing with search, category filter (Engineering / Design), tag filter

**📖 Blog Post** — Reading progress bar, VS Code syntax highlighting, auto Table of Contents, related posts

**💼 Projects** — Cards with tech stack tags, GitHub/demo links, tag filter

**👤 About** — Profile hero, animated skill cards, interactive timeline, contact form

---

## 🎨 Design Highlights

- **Glassmorphism** navbar with backdrop blur
- **Gradient mesh** background with animated blobs
- **Color scheme**: Sky blue primary, purple accent, dark navy dark mode
- **Typography**: Inter (UI) + JetBrains Mono (code)
- **Micro-animations** on every interactive element

---

## 👨‍💻 About the Author

**Lê Quang Nhật (Quang Nhật)**

Sinh viên Kỹ thuật phần mềm tại **Đại học FPT Cần Thơ** (2023 — Hiện tại), GPA 3.2/4.
Đam mê Frontend với React.js, đang hướng đến Full-stack MERN.

- 🌐 GitHub: [@nhatlq20](https://github.com/nhatlq20)
- 📧 Email: qnhat202005@gmail.com
- 📍 Ninh Kiều, Cần Thơ

**Certifications:**
- Web Design for Everybody — Coursera (05/2025)
- Software Development Lifecycle — Coursera (09/2025)
- User Experience Research and Design — Coursera (01/2026)

---

## 📝 License

MIT © [Quang Nhật](https://github.com/nhatlq20)
