// ===== Blog Posts Data =====
export const blogPosts = [
  {
    id: 1,
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization: A Deep Dive',
    excerpt: 'Khám phá các kỹ thuật nâng cao để tối ưu hóa ứng dụng React — từ memoization đến virtualization, bundle splitting và Suspense boundaries.',
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

## 4. Profiling với React DevTools

Luôn đo lường trước khi tối ưu. Dùng React DevTools Profiler để xác định bottleneck:

> **Pro tip:** Tính năng "Why did this render?" trong React DevTools rất hữu ích khi tìm kiếm re-render không cần thiết.

## Conclusion

Tối ưu hiệu suất là quá trình lặp đi lặp lại. Đo lường, xác định bottleneck, tối ưu, rồi đo lại. Đừng tối ưu sớm — tập trung vào những gì thực sự ảnh hưởng đến người dùng.
    `
  },
  {
    id: 2,
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques Every Developer Should Know',
    excerpt: 'Từ CSS Grid subgrid đến container queries, scroll-driven animations và các color functions mới — kỷ nguyên phục hưng của CSS đã đến.',
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
    excerpt: 'Hiểu sâu về React Hooks — từ pitfalls của useEffect đến pattern custom hooks mạnh mẽ giúp code tái sử dụng dễ dàng.',
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
    title: 'Git Workflow Best Practices cho Team Development',
    excerpt: 'Branching strategies, commit conventions, code review và Git hooks — xây dựng quy trình Git chuyên nghiệp cho dự án nhóm.',
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
  title: 'Frontend Developer & Thực tập sinh',
  tagline: 'Tôi xây dựng những trải nghiệm web đẹp mắt, nhanh chóng và thân thiện với người dùng.',
  bio: `Sinh viên ngành Kỹ thuật phần mềm tại Trường Đại học FPT Cần Thơ (2023 - Hiện tại). Đam mê Front-end với React.js và đang mở rộng sang Full-stack (MERN Stack). Tôi luôn tập trung vào UI/UX sạch sẽ, hiệu suất cao và code có thể bảo trì dài hạn.`,
  avatar: null,
  email: 'qnhat202005@gmail.com',
  phone: '0769759512',
  github: 'https://github.com/nhatlq20',
  linkedin: 'https://linkedin.com/in/nhatlq20',
  twitter: 'https://twitter.com/nhatlq20',
  website: 'https://github.com/nhatlq20',
  location: 'Ninh Kiều, Cần Thơ',
  availability: 'Đang tìm kiếm cơ hội thực tập / Part-time',
  gpa: '3.2/4',
  university: 'Đại học FPT Cần Thơ',
  major: 'Kỹ thuật phần mềm',
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
    role: 'Frontend Developer (Thực tập)',
    company: 'Đang tìm kiếm cơ hội',
    period: '2026 — Hiện tại',
    description: 'Đang tích cực tìm kiếm vị trí thực tập Front-end hoặc Junior Developer. Mục tiêu áp dụng kiến thức React.js, MERN Stack vào dự án thực tế và học hỏi từ các senior developer trong môi trường chuyên nghiệp.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'REST API'],
    type: 'work',
  },
  {
    id: 2,
    role: 'Trưởng nhóm Frontend',
    company: 'Dự án PharmacyLife (FPT University)',
    period: '01/2026 — Hiện tại',
    description: 'Dự án nhóm 5 thành viên - Hệ thống Quản lý Nhà thuốc. Phụ trách xử lý nghiệp vụ bán hàng đa đơn vị (Hộp/Vỉ/Viên), thiết kế ERD, quản lý giỏ hàng & thanh toán, phân quyền Admin/User và quản lý mã nguồn với Git.',
    tags: ['Java Web', 'JSP/Servlet', 'SQL Server', 'Git', 'MVC'],
    type: 'work',
  },
  {
    id: 3,
    role: 'Sinh viên Kỹ thuật phần mềm',
    company: 'Trường Đại học FPT Cần Thơ',
    period: '2023 — Hiện tại',
    description: 'Ngành Kỹ thuật phần mềm, GPA 3.2/4. Học các môn chuyên ngành như Software Engineering, Database Design, Web Development. Tích cực tham gia các dự án nhóm và hackathon trong trường.',
    tags: ['Software Engineering', 'Database', 'Web Dev', 'GPA 3.2/4'],
    type: 'education',
  },
  {
    id: 4,
    role: 'Học viên các khóa học online',
    company: 'Coursera / Self-Learning',
    period: '2025 — Hiện tại',
    description: 'Hoàn thành các chứng chỉ: Web Design for Everybody (05/2025), Software Development Lifecycle (09/2025), User Experience Research and Design (01/2026). Tự học React.js, Node.js và MERN Stack qua các tài liệu online.',
    tags: ['Web Design', 'UX Research', 'SDLC', 'React.js'],
    type: 'education',
  },
];

// ===== Projects Data =====
export const projects = [
  {
    id: 1,
    title: 'PharmacyLife',
    description: 'Hệ thống Quản lý Nhà thuốc — dự án nhóm 5 thành viên. Bán hàng đa đơn vị (Hộp/Vỉ/Viên), quản lý kho, giỏ hàng, hóa đơn, phân quyền Admin/User với Java Web (JSP/Servlet).',
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
    description: 'Blog cá nhân (dự án này!) — Blog Profile kết hợp trang cá nhân với React.js, Tailwind CSS, Framer Motion. Dark/Light mode, Custom Cursor, Reading Progress Bar, Code Highlighting.',
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
    description: 'Bộ sưu tập các React components tái sử dụng — Button, Card, Modal, Form, với Tailwind CSS. Được xây dựng trong quá trình học React Hooks và component patterns.',
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
    description: 'Bộ sưu tập các landing page đẹp với HTML, CSS, Bootstrap và JavaScript. Responsive design, animation CSS, hover effects. Thực hành trong quá trình học Web Design.',
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
