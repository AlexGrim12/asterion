import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Asterion',
  description: 'Futuristic Hotel Security Solutions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-r from-blue-900 to-purple-900 opacity-70 text-white`}
      >
        {children}
        <footer className="bg-black text-blue-300 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">Asterion</h3>
                <p>
                  &copy; 2024 Asterion. Shaping the Future of Hotel Security.
                </p>
              </div>
              <div className="text-center"></div>
              <div className="text-center md:text-right">
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p className="mb-2">
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    WhatsApp: +52 (565) 323-9357
                  </a>
                </p>
                <p>
                  <a
                    href="https://t.me/asterionsecurity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Telegram: @asterionsecurity
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
