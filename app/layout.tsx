import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dynamic Web',
  description: 'A dynamic web application using Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white relative`}>
        {/* Background with Gradient and SVG Pattern */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-black opacity-20" />
          {/* SVG Background Pattern */}
          <div className="absolute inset-0 bg-[url('/background-pattern.svg')] bg-cover bg-center opacity-10" />
        </div>

        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-purple-700/80 backdrop-blur-md shadow-lg px-6 py-4 lg:px-12">
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide font-alice drop-shadow-md">
                Dynamic Web Analyst
              </h1>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-20">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-purple-500/30">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-4 text-sm text-purple-300 border-t border-purple-700/40">
              © {new Date().getFullYear()} Dynamic Web. Crafted with 💻 and ☕
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
