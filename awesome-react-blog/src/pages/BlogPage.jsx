import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../content/data';
import { FadeInWhenVisible, TagBadge } from '../components/UI';

const categories = ['All', 'Engineering', 'Design'];

function BlogListCard({ post, onClick, index }) {
    return (
        <FadeInWhenVisible delay={index * 0.08}>
            <article
                onClick={onClick}
                className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-primary-300 dark:hover:border-primary-700/50 card-hover shadow-sm hover:shadow-lg hover:shadow-primary-500/10 cursor-pointer"
            >
                {/* Cover */}
                <div className={`flex-shrink-0 w-full md:w-48 h-36 rounded-xl bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/15" />
                    <div className="absolute bottom-3 left-3">
                        <span className="text-xs text-white/90 font-medium">{post.category}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-2">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                        {post.featured && (
                            <>
                                <span>·</span>
                                <span className="text-amber-500 font-medium">Featured</span>
                            </>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors leading-snug">
                        {post.title}
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-shrink-0 items-center">
                    <motion.div
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300"
                    >
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.div>
                </div>
            </article>
        </FadeInWhenVisible>
    );
}

export default function BlogPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTags, setActiveTags] = useState([]);

    const allTags = [...new Set(blogPosts.flatMap(p => p.tags))];

    const filtered = blogPosts.filter(post => {
        const matchCat = activeCategory === 'All' || post.category === activeCategory;
        const matchSearch = !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchTags = activeTags.length === 0 || activeTags.some(t => post.tags.includes(t));
        return matchCat && matchSearch && matchTags;
    });

    const toggleTag = (tag) => {
        setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    return (
        <div className="min-h-screen pt-24">
            {/* Header */}
            <section className="px-6 py-16 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-primary-500 dark:text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">
                        Writing
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
                        Blog & Articles
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                        Deep dives into React, TypeScript, CSS, and modern web development. Written for developers who want to level up.
                    </p>
                </motion.div>
            </section>

            {/* Filters */}
            <section className="px-6 max-w-6xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm transition-all"
                        />
                    </div>

                    {/* Category filter */}
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${activeCategory === cat
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-300'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <TagBadge
                            key={tag}
                            tag={tag}
                            active={activeTags.includes(tag)}
                            onClick={() => toggleTag(tag)}
                        />
                    ))}
                </div>
            </section>

            {/* Posts */}
            <section className="px-6 max-w-6xl mx-auto pb-20">
                {filtered.length > 0 ? (
                    <div className="space-y-4">
                        {filtered.map((post, i) => (
                            <BlogListCard
                                key={post.id}
                                post={post}
                                index={i}
                                onClick={() => navigate(`/blog/${post.slug}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-4xl mb-4 opacity-30">
                            <svg className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">No articles found. Try different filters.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
