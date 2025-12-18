import { Metadata } from 'next';
import Link from 'next/link';
import { Code2, Layers, Zap, Shield, Palette, Globe, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About - Exzort Gear',
  description: 'Learn more about Exzort Gear',
};

export default function AboutPage() {
  const techStack = [
    { name: 'Next.js 16', desc: 'React framework with App Router' },
    { name: 'TypeScript', desc: 'Type-safe development' },
    { name: 'Tailwind CSS v4', desc: 'Utility-first styling' },
    { name: 'Shopify Storefront API', desc: 'Headless commerce integration' },
    { name: 'React 19', desc: 'Latest React features' },
    { name: 'Server Components', desc: 'Performance optimization' },
  ];

  const features = [
    'Dynamic product catalog with Shopify integration',
    'Product detail pages with variant selection',
    'Shopping cart with localStorage persistence',
    'Checkout flow with form validation',
    'Search functionality',
    'Collection browsing',
    'Responsive design for all devices',
    'Global Shipping',
    'Optimized images with Next.js Image component',
    'SEO-friendly with dynamic metadata',
  ];

  const skills = [
    { icon: Code2, title: 'API Integration', desc: 'Shopify Storefront API' },
    { icon: Layers, title: 'UI Development', desc: 'Complex React interfaces' },
    { icon: Zap, title: 'State Management', desc: 'Lightweight solutions' },
    { icon: Shield, title: 'Type Safety', desc: 'Full TypeScript coverage' },
    { icon: Palette, title: 'Modern Design', desc: 'Beautiful, responsive UI' },
    { icon: Globe, title: 'Production Ready', desc: 'Deploy & maintain apps' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-neutral-200/50 to-neutral-300/50 dark:from-neutral-800/20 dark:to-neutral-700/20 rounded-full blur-3xl"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-full mb-6">
              Portfolio Project
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6">
              About Exzort Gear
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A showcase of modern web development skills, built to demonstrate proficiency 
              in creating full-featured Shopify-integrated stores using cutting-edge technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12 text-center animate-fade-in">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <div 
                  key={tech.name}
                  className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-bold text-black dark:text-white mb-1">{tech.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Implemented */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12 text-center animate-fade-in">
              Features Implemented
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature}
                  className="flex items-center gap-4 p-5 bg-neutral-50 dark:bg-neutral-900 rounded-2xl animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Demonstrated */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 text-center animate-fade-in">
              Skills Demonstrated
            </h2>
            <p className="text-center text-neutral-600 dark:text-neutral-400 mb-12 animate-fade-in">
              This project showcases the ability to build production-ready e-commerce applications
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div 
                    key={skill.title}
                    className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl text-center hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <h3 className="font-bold text-black dark:text-white mb-2">{skill.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{skill.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              I'm available for freelance Shopify development projects. Let's build something amazing.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
