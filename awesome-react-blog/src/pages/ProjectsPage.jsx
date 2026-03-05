import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../content/data';
import { FadeInWhenVisible, SectionHeader, ProjectCard } from '../components/UI';

const allTags = [...new Set(projects.flatMap(p => p.tags))];

export default function ProjectsPage() {
    const [filter, setFilter] = useState('All');

    const filtered = filter === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(filter));

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
                        Portfolio
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
                        Projects
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                        A selection of products, libraries, and experiments I've built. Most are open source.
                    </p>
                </motion.div>
            </section>

            {/* Stats banner */}
            <section className="px-6 max-w-6xl mx-auto mb-10">
                <FadeInWhenVisible>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: '4+', label: 'Dự án Hoàn Thành', color: 'from-blue-500 to-cyan-400' },
                            { value: '3.2', label: 'GPA / 4.0', color: 'from-purple-500 to-pink-400' },
                            { value: '3', label: 'Chứng Chỉ', color: 'from-orange-500 to-yellow-400' },
                            { value: '2026', label: 'Sắp Tốt Nghiệp', color: 'from-teal-500 to-emerald-400' },
                        ].map(stat => (
                            <div key={stat.label} className="p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-center shadow-sm">
                                <div className={`text-3xl font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400 dark:text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </FadeInWhenVisible>
            </section>

            {/* Filter */}
            <section className="px-6 max-w-6xl mx-auto mb-10">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('All')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${filter === 'All'
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-300'
                            }`}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${filter === tag
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-300'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 max-w-6xl mx-auto pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </section>

            {/* Open Source CTA */}
            <section className="px-6 max-w-6xl mx-auto pb-20">
                <FadeInWhenVisible>
                    <div className="rounded-3xl bg-slate-900 dark:bg-slate-800 p-10 text-center border border-slate-800 dark:border-slate-700">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">All projects are open source</h3>
                        <p className="text-slate-400 mb-6 max-w-md mx-auto">
                            Explore the code, open issues, submit PRs. I love collaborating with the community.
                        </p>
                        <a
                            href="https://github.com/nhatlq20"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            View GitHub Profile
                        </a>
                    </div>
                </FadeInWhenVisible>
            </section>
        </div>
    );
}
