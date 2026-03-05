import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Reusable animation wrapper
export function FadeInWhenVisible({ children, delay = 0, direction = 'up', className = '' }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            scale: direction === 'scale' ? 0.85 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                delay,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Skeleton component
export function Skeleton({ className = '' }) {
    return <div className={`skeleton ${className}`} />;
}

// Tag badge component
export function TagBadge({ tag, onClick, active = false }) {
    return (
        <button
            onClick={onClick}
            className={`tag-badge cursor-pointer ${active
                    ? 'bg-primary-500 text-white dark:bg-primary-500 dark:text-white border-primary-500'
                    : ''
                }`}
        >
            {tag}
        </button>
    );
}

// Section header
export function SectionHeader({ eyebrow, title, subtitle }) {
    return (
        <div className="text-center mb-16">
            {eyebrow && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-primary-500 dark:text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3"
                >
                    {eyebrow}
                </motion.p>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}

// Blog card
export function BlogCard({ post, index = 0 }) {
    return (
        <FadeInWhenVisible delay={index * 0.1}>
            <a
                href={`/blog/${post.slug}`}
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    // Use React Router programmatic navigation
                    window._navigate && window._navigate(`/blog/${post.slug}`);
                }}
                className="group block rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 card-hover cursor-pointer shadow-sm hover:shadow-lg hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5"
            >
                {/* Cover gradient */}
                <div className={`h-48 bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/30">
                            {post.category}
                        </span>
                    </div>
                    {post.featured && (
                        <div className="absolute top-4 right-4">
                            <span className="px-2.5 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold">
                                Featured
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-3">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors leading-snug">
                        {post.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </FadeInWhenVisible>
    );
}

// Project card
export function ProjectCard({ project, index = 0 }) {
    const GitHubIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );

    const ExternalIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );

    const StarIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );

    const ForkIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
    );

    return (
        <FadeInWhenVisible delay={index * 0.1}>
            <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 card-hover shadow-sm hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 cursor-pointer">
                {/* Gradient top */}
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-sm">{project.title[0]}</span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <a href={project.repo} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                                <GitHubIcon />
                            </a>
                            <a href={project.demo} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-500 transition-colors cursor-pointer">
                                <ExternalIcon />
                            </a>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 cursor-pointer">
                            <StarIcon />
                            {project.stars.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1.5 cursor-pointer">
                            <ForkIcon />
                            {project.forks}
                        </span>
                    </div>
                </div>
            </div>
        </FadeInWhenVisible>
    );
}
