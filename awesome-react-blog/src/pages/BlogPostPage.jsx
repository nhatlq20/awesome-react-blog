import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogPosts } from '../content/data';
import { useReadingProgress } from '../hooks/useReadingProgress';

// SVG Icons
const ArrowLeftIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);
const ClipboardIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);
const CheckIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// Code block with copy button
function CodeBlock({ language, code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="code-block-wrapper my-6">
            <div className="code-block-header">
                <div className="code-dots">
                    <div className="code-dot dot-red" />
                    <div className="code-dot dot-yellow" />
                    <div className="code-dot dot-green" />
                </div>
                <span className="text-xs text-slate-400 font-mono">{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                    {copied ? <CheckIcon /> : <ClipboardIcon />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <SyntaxHighlighter
                language={language || 'text'}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    padding: '1.5rem',
                }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

// Table of Contents
function TableOfContents({ headings, activeId }) {
    return (
        <nav className="sticky top-28">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                Table of Contents
            </h4>
            <ul className="space-y-1">
                {headings.map(heading => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className={`block py-1 text-sm transition-all duration-200 cursor-pointer ${heading.level === 3 ? 'pl-4' : ''
                                } ${activeId === heading.id
                                    ? 'text-primary-500 dark:text-primary-400 font-medium'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function BlogPostPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const progress = useReadingProgress();
    const [activeHeading, setActiveHeading] = useState('');
    const contentRef = useRef(null);

    const post = blogPosts.find(p => p.slug === slug);

    // Extract headings from markdown
    const headings = useMemo(() => {
        if (!post) return [];
        const lines = post.content.split('\n');
        const h = [];
        lines.forEach(line => {
            const m2 = line.match(/^## (.+)/);
            const m3 = line.match(/^### (.+)/);
            if (m2) {
                const text = m2[1];
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                h.push({ id, text, level: 2 });
            }
            if (m3) {
                const text = m3[1];
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                h.push({ id, text, level: 3 });
            }
        });
        return h;
    }, [post]);

    // Active heading on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveHeading(entry.target.id);
                });
            },
            { rootMargin: '0px 0px -70% 0px', threshold: 0 }
        );

        const headingEls = contentRef.current?.querySelectorAll('h2, h3');
        headingEls?.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-black text-primary-500 mb-4">404</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Post not found.</p>
                    <Link to="/blog" className="text-primary-500 hover:text-primary-600 font-medium cursor-pointer">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.tags.some(t => post.tags.includes(t))).slice(0, 2);

    return (
        <>
            {/* Reading Progress Bar */}
            <div id="reading-progress" style={{ width: `${progress}%` }} />

            <div className="min-h-screen pt-24">
                {/* Hero */}
                <section className={`relative overflow-hidden bg-gradient-to-br ${post.coverGradient} h-64 md:h-80`}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="flex items-center gap-3 text-white/70 text-sm mb-4">
                                <button
                                    onClick={() => navigate('/blog')}
                                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                                >
                                    <ArrowLeftIcon />
                                    Blog
                                </button>
                                <span>/</span>
                                <span>{post.category}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 mt-4 text-white/70 text-sm">
                                <span>{post.date}</span>
                                <span>·</span>
                                <span>{post.readTime}</span>
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-xs text-white">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content */}
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="flex gap-12">
                        {/* Main content */}
                        <motion.article
                            ref={contentRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex-1 min-w-0 prose-custom"
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h2: ({ children }) => {
                                        const text = String(children);
                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                        return <h2 id={id}>{children}</h2>;
                                    },
                                    h3: ({ children }) => {
                                        const text = String(children);
                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                        return <h3 id={id}>{children}</h3>;
                                    },
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
                                        ) : (
                                            <code className={className} {...props}>{children}</code>
                                        );
                                    },
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>

                            {/* Tags footer */}
                            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="tag-badge cursor-default">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>

                        {/* Sidebar ToC */}
                        {headings.length > 0 && (
                            <aside className="hidden xl:block w-64 flex-shrink-0">
                                <TableOfContents headings={headings} activeId={activeHeading} />
                            </aside>
                        )}
                    </div>

                    {/* Related posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Articles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map(p => (
                                    <article
                                        key={p.id}
                                        onClick={() => { navigate(`/blog/${p.slug}`); window.scrollTo(0, 0); }}
                                        className="group p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 card-hover cursor-pointer shadow-sm"
                                    >
                                        <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${p.coverGradient} mb-4`} />
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2">
                                            {p.title}
                                        </h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{p.excerpt}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
