import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';

const NavLink = ({ to, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`nav-link ${isActive ? 'active text-primary-500 dark:text-primary-400' : ''}`}
        >
            {children}
        </Link>
    );
};

// Sun icon SVG
const SunIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

// Moon icon SVG
const MoonIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

// Menu icon
const MenuIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

// Close icon
const CloseIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export default function Navbar() {
    const { isDark, toggle } = useDarkMode();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/blog', label: 'Blog' },
        { to: '/projects', label: 'Projects' },
        { to: '/about', label: 'About' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${scrolled
                    ? 'glass dark:glass-dark shadow-xl shadow-black/10 dark:shadow-black/30'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="group flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-sm font-mono">N</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                            nhat<span className="text-primary-500">.dev</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map(link => (
                            <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
                        ))}
                    </nav>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Dark mode toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggle}
                            className={`relative w-14 h-7 rounded-full transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isDark
                                ? 'bg-gradient-to-r from-primary-600 to-accent-600'
                                : 'bg-slate-200'
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            <motion.div
                                layout
                                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-colors duration-300 ${isDark ? 'text-accent-400' : 'text-amber-500'
                                    }`}
                                animate={{ x: isDark ? 28 : 2 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                                {isDark ? <MoonIcon /> : <SunIcon />}
                            </motion.div>
                        </motion.button>

                        {/* CTA */}
                        <Link
                            to="/about"
                            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-primary-500/25 cursor-pointer"
                        >
                            Hire me
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="px-4 py-4 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-4">
                                {navLinks.map(link => (
                                    <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                                        {link.label}
                                    </NavLink>
                                ))}
                                <Link
                                    to="/about"
                                    onClick={() => setMobileOpen(false)}
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-medium cursor-pointer"
                                >
                                    Hire me
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
