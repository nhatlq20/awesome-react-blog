import React from 'react';
import { Link } from 'react-router-dom';

const GitHubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 border-t border-slate-200 dark:border-slate-800">
            {/* Background */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm font-mono">N</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">
                                nhat<span className="text-primary-500">.dev</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Sinh viên Kỹ thuật Phần mềm - FPT Cần Thơ. Đam mê Frontend & React.js.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="https://github.com/nhatlq20" target="_blank" rel="noreferrer" className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer">
                                <GitHubIcon />
                            </a>
                            <a href="https://linkedin.com/in/nhatlq20" target="_blank" rel="noreferrer" className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer">
                                <LinkedInIcon />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg text-slate-500 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer">
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Navigation</h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/blog', label: 'Blog' },
                                { to: '/projects', label: 'Projects' },
                                { to: '/about', label: 'About' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Get in Touch</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                            Open to interesting projects and opportunities.
                        </p>
                        <a
                            href="mailto:qnhat202005@gmail.com"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                        >
                            qnhat202005@gmail.com
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400 dark:text-slate-500">
                    <p>© {currentYear} Lê Quang Nhật. Built with React + Tailwind + Framer Motion.</p>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Đang tìm kiếm cơ hội thực tập</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
