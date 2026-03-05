// ===== Blog Posts Data =====
export const blogPosts = [
  {
    id: 1,
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization: A Deep Dive',
    excerpt: 'Explore advanced techniques to optimize React applications — from memoization to virtualization, bundle splitting, and Suspense boundaries.',
    date: '2026-02-20',
    readTime: '8 min read',
    tags: ['React', 'Performance', 'JavaScript'],
    category: 'Engineering',
    featured: true,
    coverGradient: 'from-blue-600 via-cyan-500 to-teal-400',
    content: `
## Introduction

React applications can become sluggish as they scale. In this guide, we'll explore battle-tested techniques to keep your app blazing fast.

## 1. Memoization with useMemo and useCallback

The most common performance issue in React is unnecessary re-renders. React provides two powerful hooks to address this:

\`\`\`javascript
// Before: Creates a new function on every render
function ParentComponent() {
  const handleClick = () => {
    console.log('clicked');
  };
  return <ExpensiveChild onClick={handleClick} />;
}

// After: Memoized function
function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Only recreated when deps change
  return <ExpensiveChild onClick={handleClick} />;
}
\`\`\`

## 2. Code Splitting with React.lazy

Don't load what users don't need immediately:

\`\`\`javascript
// Route-level code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Blog = React.lazy(() => import('./pages/Blog'));

function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

## 3. Virtualization for Long Lists

Render only what's visible in the viewport:

\`\`\`javascript
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemCard item={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}
\`\`\`

## 4. Profiling with React DevTools

Always measure before you optimize. Use the React DevTools Profiler to identify bottlenecks:

> **Pro tip:** The "Why did this render?" feature in React DevTools is invaluable when hunting down unnecessary re-renders.

## Conclusion

Performance optimization is an iterative process. Measure, identify the bottleneck, optimize, then measure again. Don't optimize prematurely — focus on what actually impacts your users.
    `
  },
  {
    id: 2,
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques Every Developer Should Know',
    excerpt: 'From CSS Grid subgrid to container queries, scroll-driven animations, and new color functions — the CSS renaissance is here.',
    date: '2026-02-10',
    readTime: '6 min read',
    tags: ['CSS', 'Design', 'Frontend'],
    category: 'Design',
    featured: true,
    coverGradient: 'from-purple-600 via-pink-500 to-rose-400',
    content: `
## The CSS Renaissance

CSS đã phát triển vượt bậc. Hãy cùng xem các tính năng đang định hình lại cách chúng ta style web.

## Container Queries

Cuối cùng, responsive design theo component:

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## CSS Nesting (Native)

Không cần preprocessors nữa:

\`\`\`css
.nav {
  display: flex;
  
  & .nav-item {
    padding: 0.5rem 1rem;
    
    &:hover {
      color: var(--primary);
    }
    
    &.active {
      font-weight: bold;
    }
  }
}
\`\`\`

## Scroll-Driven Animations

Animate từ scroll position một cách native:

\`\`\`css
@keyframes reveal {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.scroll-reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
\`\`\`

## The :has() Pseudo-class

Style cha dựa trên con — "parent selector" mà chúng ta luôn mong chờ:

\`\`\`css
/* Style form có chứa input không hợp lệ */
.form:has(input:invalid) {
  border-color: red;
}

/* Layout 3 cột khi có sidebar */
.layout:has(.sidebar) {
  grid-template-columns: 250px 1fr 200px;
}
\`\`\`

## Conclusion

Modern CSS cực kỳ mạnh mẽ. Hãy tận dụng các tính năng này để viết stylesheet gọn hơn, dễ bảo trì hơn với ít JavaScript hơn.
    `
  },
  {
    id: 3,
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks Deep Dive: useEffect, useRef & Custom Hooks',
    excerpt: 'A deep dive into React Hooks — from useEffect pitfalls to powerful custom hook patterns that make code reuse effortless.',
    date: '2026-01-28',
    readTime: '10 min read',
    tags: ['React', 'Hooks', 'JavaScript'],
    category: 'Engineering',
    featured: false,
    coverGradient: 'from-indigo-600 via-blue-500 to-cyan-400',
    content: `
## Tại sao Hooks lại quan trọng?

Hooks cho phép bạn sử dụng state và các tính năng React khác mà không cần viết class component. Nhưng sử dụng đúng cách thì không dễ.

## useEffect Pitfalls

\`\`\`javascript
// ❌ Sai: Missing dependency
useEffect(() => {
  fetchData(userId); // userId thay đổi nhưng effect không re-run
}, []); 

// ✅ Đúng: Đủ dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ✅ Cleanup function cho subscriptions
useEffect(() => {
  const subscription = subscribe(userId);
  return () => subscription.unsubscribe(); // Quan trọng!
}, [userId]);
\`\`\`

## useRef: Không chỉ để DOM

\`\`\`javascript
// Lưu giá trị giữa renders mà không trigger re-render
function Timer() {
  const intervalRef = useRef(null);
  const countRef = useRef(0);

  const start = () => {
    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      console.log('Count:', countRef.current);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return <div><button onClick={start}>Start</button><button onClick={stop}>Stop</button></div>;
}
\`\`\`

## Custom Hooks Pattern

\`\`\`javascript
// useLocalStorage - Hook tái sử dụng
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Sử dụng:
const [theme, setTheme] = useLocalStorage('theme', 'dark');
\`\`\`

## Conclusion

Custom hooks là cách tốt nhất để chia sẻ logic giữa các components. Hãy nghĩ về hooks như "thư viện con" trong ứng dụng của bạn.
    `
  },
  {
    id: 4,
    slug: 'git-workflow-best-practices',
    title: 'Git Workflow Best Practices for Team Development',
    excerpt: 'Branching strategies, commit conventions, code review, and Git hooks — build a professional Git workflow for your team projects.',
    date: '2026-01-15',
    readTime: '7 min read',
    tags: ['Git', 'Teamwork', 'DevOps'],
    category: 'Engineering',
    featured: false,
    coverGradient: 'from-orange-500 via-amber-400 to-yellow-300',
    content: `
## Tại sao Git Workflow quan trọng?

Trong dự án nhóm, Git workflow quyết định đến 40% năng suất của team. Một workflow tốt giúp tránh conflict, dễ review code và rollback khi có lỗi.

## Git Flow Branching Strategy

\`\`\`bash
# Branch structure
main          # Production code
develop       # Development integration
feature/*     # New features
hotfix/*      # Production fixes
release/*     # Release preparation

# Tạo feature branch
git checkout develop
git checkout -b feature/user-authentication

# Sau khi hoàn thành
git add .
git commit -m "feat(auth): implement JWT login flow"
git push origin feature/user-authentication
# Mở Pull Request vào develop
\`\`\`

## Conventional Commits

\`\`\`bash
# Format: type(scope): description
feat(auth): add Google OAuth login
fix(cart): resolve quantity calculation bug
docs(readme): update installation steps
style(button): fix hover animation timing
refactor(api): extract HTTP client helper
test(login): add unit tests for validation
chore(deps): upgrade React to 19.0
\`\`\`

## Useful Git Commands

\`\`\`bash
# Xem history đẹp
git log --oneline --graph --all

# Stash khi cần đổi branch gấp
git stash push -m "wip: working on cart feature"
git stash pop

# Interactive rebase để clean up commits
git rebase -i HEAD~5

# Cherry-pick commit cụ thể
git cherry-pick abc1234
\`\`\`

## Conclusion

Đầu tư thời gian vào Git workflow ngay từ đầu dự án. Một team dùng Git tốt sẽ tránh được 90% các conflict và vấn đề hợp tác.
    `
  },
];

// ===== Profile Data =====
export const profile = {
  name: 'Quang Nhật',
  title: 'Frontend Developer & Intern',
  tagline: 'I build beautiful, fast, and user-friendly web experiences.',
  bio: `Software Engineering student at FPT University Can Tho. Passionate about Front-end development with React.js and expanding into Full-stack (MERN Stack). I focus on clean UI/UX, high performance, and maintainable code.`,
  avatar: null,
  email: 'qnhat202005@gmail.com',
  phone: '0769759512',
  github: 'https://github.com/nhatlq20',
  linkedin: 'https://linkedin.com/in/nhatlq20',
  twitter: 'https://twitter.com/nhatlq20',
  website: 'https://github.com/nhatlq20',
  location: 'Ninh Kieu, Can Tho',
  availability: 'Open to internship / Part-time opportunities',
  gpa: '3.2/4.0',
  university: 'FPT University Can Tho',
  major: 'Software Engineering',
};

// ===== Skills Data =====
export const skills = [
  { name: 'React.js / React Hooks', level: 78, category: 'Frontend', color: '#61dafb' },
  { name: 'HTML / CSS', level: 90, category: 'Frontend', color: '#e34f26' },
  { name: 'JavaScript (ES6+)', level: 80, category: 'Frontend', color: '#f7df1e' },
  { name: 'Bootstrap', level: 82, category: 'Frontend', color: '#7952b3' },
  { name: 'Git & GitHub', level: 85, category: 'Tools', color: '#f05032' },
  { name: 'Figma / Canva', level: 70, category: 'Design', color: '#f24e1e' },
  { name: 'Java Web (JSP/Servlet)', level: 65, category: 'Backend', color: '#ed8b00' },
  { name: 'SQL Server / MySQL', level: 68, category: 'Backend', color: '#336791' },
];

// ===== Experience Timeline =====
export const experiences = [
  {
    id: 1,
    role: 'Frontend Developer (Internship)',
    company: 'Seeking Opportunities',
    period: '2026 — Present',
    description: 'Actively looking for a Front-end internship or Junior Developer position. Goal: apply React.js and MERN Stack knowledge to real-world projects and learn from senior developers in a professional environment.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST API'],
    type: 'work',
  },
  {
    id: 2,
    role: 'Frontend Team Lead',
    company: 'PharmacyLife Project (FPT University)',
    period: '01/2026 — Present',
    description: 'A 5-member team project — Pharmacy Management System. Responsible for multi-unit sales logic (Box/Blister/Tablet), ERD design, cart & checkout flow, Admin/User role management, and Git version control.',
    tags: ['Java Web', 'JSP/Servlet', 'SQL Server', 'Git', 'MVC'],
    type: 'work',
  },
  {
    id: 3,
    role: 'Software Engineering Student',
    company: 'FPT University Can Tho',
    period: '2023 — Present',
    description: 'Software Engineering major, GPA 3.2/4. Coursework includes Software Engineering, Database Design, and Web Development. Actively participates in group projects and on-campus hackathons.',
    tags: ['Software Engineering', 'Database', 'Web Dev', 'GPA 3.2/4'],
    type: 'education',
  },
  {
    id: 4,
    role: 'Online Course Learner',
    company: 'Coursera / Self-Learning',
    period: '2025 — Present',
    description: 'Completed certifications: Web Design for Everybody (05/2025), Software Development Lifecycle (09/2025), User Experience Research and Design (01/2026). Self-studying React.js, Node.js, and the MERN Stack through online resources.',
    tags: ['Web Design', 'UX Research', 'SDLC', 'React.js'],
    type: 'education',
  },
];

// ===== Projects Data =====
export const projects = [
  {
    id: 1,
    title: 'PharmacyLife',
    description: 'Pharmacy Management System — a 5-member team project. Multi-unit sales (Box/Blister/Tablet), inventory management, cart, invoicing, and Admin/User role management with Java Web (JSP/Servlet).',
    tags: ['Java Web', 'JSP/Servlet', 'SQL Server', 'Git', 'MVC'],
    gradient: 'from-blue-600 to-cyan-500',
    stars: 12,
    forks: 4,
    demo: '#',
    repo: 'https://github.com/nhatlq20/SWP391',
    featured: true,
  },
  {
    id: 2,
    title: 'Awesome React Blog',
    description: 'Personal blog (this project!) — a Blog + Portfolio site built with React.js, Tailwind CSS, and Framer Motion. Features Dark/Light mode, Custom Cursor, Reading Progress Bar, and Code Highlighting.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'React Router'],
    gradient: 'from-purple-600 to-pink-500',
    stars: 8,
    forks: 2,
    demo: 'http://localhost:3000',
    repo: 'https://github.com/nhatlq20/awesome-react-blog',
    featured: true,
  },
  {
    id: 3,
    title: 'UI Components Library',
    description: 'A collection of reusable React components — Button, Card, Modal, Form — styled with Tailwind CSS. Built while studying React Hooks and component design patterns.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript'],
    gradient: 'from-orange-500 to-yellow-400',
    stars: 5,
    forks: 1,
    demo: '#',
    repo: 'https://github.com/nhatlq20',
    featured: false,
  },
  {
    id: 4,
    title: 'Landing Page Collection',
    description: 'A collection of beautiful landing pages built with HTML, CSS, Bootstrap, and JavaScript. Responsive design, CSS animations, and hover effects — created while learning Web Design.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    gradient: 'from-teal-500 to-emerald-400',
    stars: 3,
    forks: 1,
    demo: '#',
    repo: 'https://github.com/nhatlq20',
    featured: false,
  },
];

// ===== Certifications =====
export const certifications = [
  {
    id: 1,
    title: 'Web Design for Everybody: Basics of Web Development & Coding',
    issuer: 'Coursera',
    date: '05/2025',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    title: 'Software Development Lifecycle',
    issuer: 'Coursera',
    date: '09/2025',
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 3,
    title: 'User Experience Research and Design',
    issuer: 'Coursera',
    date: '01/2026',
    color: 'from-orange-500 to-yellow-400',
  },
];

// ===== GitHub Contribution Data (simulated) =====
export const generateGitHubData = () => {
  const weeks = 52;
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      let count = 0;
      if (rand > 0.4) count = Math.floor(Math.random() * 3) + 1;
      if (rand > 0.7) count = Math.floor(Math.random() * 6) + 3;
      if (rand > 0.9) count = Math.floor(Math.random() * 10) + 8;
      week.push(count);
    }
    data.push(week);
  }
  return data;
};
