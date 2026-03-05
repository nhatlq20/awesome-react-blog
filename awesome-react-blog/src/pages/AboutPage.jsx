import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, experiences, skills } from '../content/data';
import { FadeInWhenVisible, SectionHeader } from '../components/UI';

const LocationIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const MailIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const WorkIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const EduIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

function TimelineItem({ experience, index }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <FadeInWhenVisible delay={index * 0.1}>
            <div className="relative pl-16">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 shadow-lg ring-2 z-10 ${experience.type === 'work'
                    ? 'bg-primary-500 ring-primary-200 dark:ring-primary-900'
                    : 'bg-accent-500 ring-accent-200 dark:ring-accent-900'
                    }`} />

                {/* Icon badge */}
                <div className={`absolute left-0 top-3 w-8 h-8 rounded-lg flex items-center justify-center ${experience.type === 'work'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400'
                    }`}>
                    {experience.type === 'work' ? <WorkIcon /> : <EduIcon />}
                </div>

                {/* Card */}
                <div
                    className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{experience.role}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-primary-500 dark:text-primary-400 font-medium text-sm">{experience.company}</span>
                                <span className="text-slate-300 dark:text-slate-600">·</span>
                                <span className="text-slate-400 dark:text-slate-500 text-sm font-mono">{experience.period}</span>
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-1"
                        >
                            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-4 mb-4">
                                    {experience.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {experience.tags.map(tag => (
                                        <span key={tag} className="tag-badge cursor-default">{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </FadeInWhenVisible>
    );
}

const skillCategories = ['All', 'Frontend', 'Backend', 'DevOps'];

export default function AboutPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const filteredSkills = activeCategory === 'All'
        ? skills
        : skills.filter(s => s.category === activeCategory);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormState({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen pt-24">
            {/* ===== PROFILE HERO ===== */}
            <section className="px-6 py-20 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-primary-500 dark:text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">
                            About me
                        </p>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            Hi, I'm <span className="text-gradient">{profile.name.split(' ')[1]}</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                            {profile.bio}
                        </p>
                        <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-2">
                                <LocationIcon />
                                {profile.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <MailIcon />
                                {profile.email}
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 shadow" />
                                {profile.availability}
                            </span>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <a
                                href="mailto:qnhat202005@gmail.com"
                                className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                            >
                                Get in touch
                            </a>
                            <a
                                href="#"
                                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                            >
                                Download CV
                            </a>
                        </div>
                    </motion.div>

                    {/* Avatar */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-primary-500/20 dark:bg-primary-500/10 backdrop-blur-sm border border-primary-200/30 dark:border-primary-700/20 flex items-center justify-center animate-float">
                                <span className="text-2xl font-black text-primary-500">4+</span>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-28 h-16 rounded-2xl bg-accent-500/20 dark:bg-accent-500/10 backdrop-blur-sm border border-accent-200/30 dark:border-accent-700/20 flex flex-col items-center justify-center" style={{ animation: 'float 6s ease-in-out 2s infinite' }}>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Projects</span>
                                <span className="text-xl font-black text-accent-500">30+</span>
                            </div>

                            {/* Main avatar */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl shadow-primary-500/20 relative">
                                <div className="w-full h-full bg-gradient-to-br from-primary-400 via-accent-500 to-teal-400 flex items-center justify-center">
                                    <svg className="w-40 h-40 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                {/* Overlay gradient */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-900/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="font-bold">{profile.name}</p>
                                    <p className="text-xs text-white/70">{profile.title}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== SKILLS ===== */}
            <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        eyebrow="Expertise"
                        title="Technical Skills"
                    />

                    {/* Category filter */}
                    <div className="flex gap-2 justify-center mb-10">
                        {skillCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${activeCategory === cat
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filteredSkills.map(skill => (
                                <motion.div
                                    key={skill.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700/50 transition-all duration-300 cursor-pointer group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-white font-bold text-sm"
                                        style={{ backgroundColor: skill.color }}
                                    >
                                        {skill.name[0]}
                                    </div>
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{skill.name}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{skill.category}</p>
                                    <div className="mt-3 skill-bar">
                                        <div
                                            className="skill-bar-fill"
                                            style={{
                                                width: `${skill.level}%`,
                                                background: `linear-gradient(90deg, #0ea5e9, ${skill.color})`,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ===== TIMELINE ===== */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <SectionHeader
                        eyebrow="Journey"
                        title="Experience & Education"
                        subtitle="Click on any item to expand details."
                    />

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="timeline-line" style={{ left: '28px' }} />

                        <div className="space-y-6">
                            {experiences.map((exp, i) => (
                                <TimelineItem key={exp.id} experience={exp} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT FORM ===== */}
            <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="max-w-2xl mx-auto">
                    <SectionHeader
                        eyebrow="Contact"
                        title="Get in Touch"
                        subtitle="Have a project idea or want to collaborate? I'd love to hear from you."
                    />

                    <FadeInWhenVisible>
                        <div className="rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-8 shadow-sm">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message sent!</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-5"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="name">Name</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    value={formState.name}
                                                    onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                                                    placeholder="john@example.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="message">Message</label>
                                            <textarea
                                                id="message"
                                                rows={5}
                                                required
                                                value={formState.message}
                                                onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                                                placeholder="Tell me about your project..."
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm resize-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 cursor-pointer"
                                        >
                                            Send message
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}
