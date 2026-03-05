import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Skeleton loading fallback
function PageSkeleton() {
  return (
    <div className="min-h-screen pt-28 px-6 max-w-6xl mx-auto space-y-6 animate-pulse">
      <div className="skeleton h-10 w-40 rounded-xl" />
      <div className="skeleton h-16 w-2/3 rounded-2xl" />
      <div className="skeleton h-6 w-1/2 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <div className="skeleton h-48 w-full" />
            <div className="p-4 space-y-3 bg-white dark:bg-slate-800">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Suspense fallback={<PageSkeleton />}>
              <HomePage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/blog" element={
          <PageTransition>
            <Suspense fallback={<PageSkeleton />}>
              <BlogPage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/blog/:slug" element={
          <PageTransition>
            <Suspense fallback={<PageSkeleton />}>
              <BlogPostPage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <Suspense fallback={<PageSkeleton />}>
              <ProjectsPage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <Suspense fallback={<PageSkeleton />}>
              <AboutPage />
            </Suspense>
          </PageTransition>
        } />
        {/* 404 */}
        <Route path="*" element={
          <PageTransition>
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
              <div className="text-9xl font-black text-gradient mb-4">404</div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Page not found</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Looks like this page wandered off into the void.</p>
              <a href="/" className="px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors cursor-pointer">
                Back to Home
              </a>
            </div>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="min-h-screen transition-colors duration-400">
        <AnimatedRoutes />
      </main>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}
