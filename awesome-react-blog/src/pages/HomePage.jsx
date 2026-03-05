import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile, projects, skills, generateGitHubData } from '../content/data';
import { FadeInWhenVisible, SectionHeader, ProjectCard } from '../components/UI';

// GitHub contributions colors
const getContributionColor = (count) => {
    if (count === 0) return 'bg-slate-200 dark:bg-slate-800';
    if (count <= 2) return 'bg-primary-200 dark:bg-primary-900';
    if (count <= 5) return 'bg-primary-400 dark:bg-primary-700';
    if (count <= 9) return 'bg-primary-500 dark:bg-primary-500';
    return 'bg-primary-700 dark:bg-primary-400';
};

function TypingEffect({ words }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];
        let timeout;

        if (!isDeleting && currentText === word) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentWordIndex(prev => (prev + 1) % words.length);
        } else {
            const speed = isDeleting ? 60 : 100;
            timeout = setTimeout(() => {
                setCurrentText(prev =>
                    isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <span className="text-gradient">
            {currentText}
            <span className="border-r-2 border-primary-500 animate-pulse ml-0.5">&nbsp;</span>
        </span>
    );
}

function GitHubGraph() {
    const [data] = useState(() => generateGitHubData());

    return (
        <div className="relative">
            <div className="flex gap-1 overflow-x-auto pb-2">
                {data.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                        {week.map((count, di) => (
                            <div
                                key={di}
                                className={`w-3 h-3 rounded-sm github-cell cursor-pointer ${getContributionColor(count)}`}
                                title={`${count} contributions`}
                                onMouseEnter={() => { }}
                                onMouseLeave={() => { }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mt-2">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                    {['bg-slate-200 dark:bg-slate-800', 'bg-primary-200 dark:bg-primary-900', 'bg-primary-400 dark:bg-primary-700', 'bg-primary-500', 'bg-primary-700 dark:bg-primary-400'].map((c, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    );
}

function SkillBar({ skill, delay }) {
    const [animated, setAnimated] = useState(false);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!ref) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
            { threshold: 0.3 }
        );
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref]);

    return (
        <div ref={setRef} className="group">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{skill.level}%</span>
            </div>
            <div className="skill-bar">
                <div
                    className="skill-bar-fill"
                    style={{
                        transform: animated ? 'scaleX(1)' : 'scaleX(0)',
                        width: `${skill.level}%`,
                        transitionDelay: `${delay * 0.1}s`,
                        background: `linear-gradient(90deg, #0ea5e9, ${skill.color})`,
                    }}
                />
            </div>
        </div>
    );
}

export default function HomePage() {
    const navigate = useNavigate();
    const featuredProjects = projects.filter(p => p.featured);

    // Store navigate in window for BlogCard to use
    useEffect(() => {
        window._navigate = navigate;
        return () => { delete window._navigate; };
    }, [navigate]);

    const roleWords = ['Frontend Intern', 'React.js Specialist', 'UI/UX Enthusiast', 'Software Engineering Student'];

    return (
        <div className="min-h-screen">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated background blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-3xl animate-blob" />
                    <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-500/10 dark:bg-accent-500/5 blur-3xl animate-blob-delay" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-teal-500/8 dark:bg-teal-500/4 blur-3xl animate-blob-delay-2" />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Open to internship opportunities
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
                    >
                        {profile.name.split(' ')[0]}{' '}
                        <span className="text-gradient">{profile.name.split(' ')[1]}</span>
                    </motion.h1>

                    {/* Typing effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6 h-10"
                    >
                        <TypingEffect words={roleWords} />
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {profile.tagline}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link
                            to="/blog"
                            className="px-8 py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-base shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            Read my blog
                        </Link>
                        <Link
                            to="/projects"
                            className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-base border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            View projects
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="flex flex-wrap justify-center gap-12 mt-16 pt-8 border-t border-slate-200/70 dark:border-slate-800"
                    >
                        {[
                            { value: '3+', label: 'Years of Coding' },
                            { value: '4+', label: 'Projects Completed' },
                            { value: '3.2', label: 'GPA / 4.0' },
                            { value: '3', label: 'Certifications' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-400 dark:text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-slate-400">scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== SKILLS SECTION ===== */}
            <section className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        eyebrow="Expertise"
                        title="Skills & Technologies"
                        subtitle="Technologies I've mastered over years of building production applications."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {skills.map((skill, i) => (
                            <SkillBar key={skill.name} skill={skill} delay={i} />
                        ))}
                    </div>

                    {/* Tech logos strip */}
                    <FadeInWhenVisible delay={0.3}>
                        <div className="mt-16 flex flex-wrap justify-center gap-4">
                            {['React.js', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Git', 'Java Web', 'SQL Server', 'Figma', 'Tailwind CSS', 'Node.js'].map(tech => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

            {/* ===== GITHUB ACTIVITY ===== */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        eyebrow="Open Source"
                        title="GitHub Activity"
                        subtitle="GitHub activity over the past year."
                    />

                    <FadeInWhenVisible>
                        <div className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">@nhatlq20</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">GitHub activity over the past year</p>
                                </div>
                                <a
                                    href="https://github.com/nhatlq20"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                                >
                                    GitHub Profile
                                </a>
                            </div>
                            <GitHubGraph />
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>


            {/* ===== FEATURED PROJECTS ===== */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <p className="text-primary-500 dark:text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">Work</p>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
                        </div>
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors cursor-pointer"
                        >
                            View all
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredProjects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <FadeInWhenVisible>
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-12 text-center shadow-2xl shadow-primary-500/30">
                            {/* Background grid */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                                    backgroundSize: '40px 40px',
                                }}
                            />
                            <div className="relative">
                                <h2 className="text-4xl font-black text-white mb-4">
                                    Let's build something amazing
                                </h2>
                                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                                    Have a project in mind? I'm currently available for freelance work and interesting collaborations.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="mailto:qnhat202005@gmail.com"
                                        className="px-8 py-4 rounded-2xl bg-white text-primary-600 font-bold hover:bg-slate-50 transition-all duration-200 shadow-xl cursor-pointer"
                                    >
                                        Get in touch
                                    </a>
                                    <Link
                                        to="/about"
                                        className="px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white/30 transition-all duration-200 border border-white/30 cursor-pointer"
                                    >
                                        Learn more about me
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}
