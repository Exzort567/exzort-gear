import Link from 'next/link';
import { Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="text-2xl font-bold text-black dark:text-white">
              Exzort<span className="text-neutral-400">Gear</span>
            </Link>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              Premium tech gear for professionals who demand excellence. 
              Curated collection of keyboards, mice, and accessories.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Shop Links */}
            <div>
              <h4 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
                Shop
              </h4>
              <ul className="space-y-3">
                {['Products', 'Collections', 'Cart'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 inline-flex items-center group"
                    >
                      {item}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {['About', 'Contact', 'Privacy'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 inline-flex items-center group"
                    >
                      {item}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer */}
            <div>
              <h4 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
                Tech Stack
              </h4>
              <ul className="space-y-3">
                {['Next.js', 'React', 'Shopify', 'TypeScript'].map((item) => (
                  <li key={item}>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              © {currentYear} Exzort Gear. Portfolio Project.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Built with Next.js & Shopify
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
