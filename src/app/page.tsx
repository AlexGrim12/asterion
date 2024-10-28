// pages/index.tsx
'use client'
import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Asterion - Futuristic Hotel Security Solutions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? 'bg-black bg-opacity-70 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-400">Asterion</div>
            <div className="hidden md:flex space-x-6">
              <a
                href="#features"
                className="text-blue-300 hover:text-blue-100 transition duration-300 m-3"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-blue-300 hover:text-blue-100 transition duration-300 m-3"
              >
                Benefits
              </a>
              <a
                href="#contact"
                className="text-blue-300 hover:text-blue-100 transition duration-300 m-3"
              >
                Contact
              </a>
              <a
                href="/login"
                className="text-blue-300 hover:text-blue-100 transition duration-300 rounded-xl p-2 bg-white bg-opacity-10 hover:bg-opacity-30"
              >
                Admin
              </a>
            </div>
            <button
              className="md:hidden text-blue-300 hover:text-blue-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <div className="mt-4 md:hidden">
              <a
                href="#features"
                className="block py-2 text-blue-300 hover:text-blue-100"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="block py-2 text-blue-300 hover:text-blue-100"
              >
                Benefits
              </a>
              <a
                href="#contact"
                className="block py-2 text-blue-300 hover:text-blue-100"
              >
                Contact
              </a>
              <a
                href="/login"
                className="block py-2 text-blue-300 hover:text-blue-100"
              >
                Login
              </a>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-70"></div>
            <video autoPlay loop muted className="w-full h-full object-cover">
              <source src="/hotel-technology.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
              Welcome to the Future of Hotel Security
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Powered by Advanced AI and Computer Vision
            </p>
            <a
              href="#contact"
              className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-400 transition duration-300 animate-bounce"
            >
              Discover Asterion
            </a>
          </div>
        </section>

        <section
          id="features"
          className="py-20 bg-gradient-to-b from-black to-blue-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-300">
              Cutting-Edge Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <FeatureCard
                title="AI-Powered Computer Vision"
                description="Detect accidents and ensure compliance with unparalleled accuracy."
                icon={
                  <svg
                    className="w-12 h-12 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                }
              />
              <FeatureCard
                title="Biometric Access Control"
                description="State-of-the-art facial recognition for seamless and secure hotel access."
                icon={
                  <svg
                    className="w-12 h-12 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
              <FeatureCard
                title="AI Virtual Concierge"
                description="24/7 personalized assistance for emergencies, cultural queries, and language support."
                icon={
                  <svg
                    className="w-12 h-12 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        <section
          id="benefits"
          className="py-20 bg-gradient-to-b from-blue-900 to-black"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-300">
              Transformative Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <BenefitCard
                title="Unparalleled Guest Safety"
                description="Create a secure environment that redefines peace of mind for your guests."
              />
              <BenefitCard
                title="Futuristic Guest Experience"
                description="Offer a glimpse into the future of hospitality with cutting-edge technology."
              />
              <BenefitCard
                title="Intelligent Compliance"
                description="Stay ahead of regulations with our AI-driven monitoring and reporting systems."
              />
              <BenefitCard
                title="Operational Excellence"
                description="Streamline operations and reduce costs with our advanced AI solutions."
              />
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-20 bg-gradient-to-b from-black to-blue-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-300">
              Connect with the Future
            </h2>
            <form className="max-w-lg mx-auto">
              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-blue-900 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-blue-900 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-blue-900 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-400 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="bg-blue-900 bg-opacity-30 p-8 rounded-lg shadow-lg hover:shadow-blue-500/50 transition duration-300 transform hover:-translate-y-1">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4 text-blue-300">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  )
}

function BenefitCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="bg-blue-900 bg-opacity-30 p-8 rounded-lg shadow-lg hover:shadow-blue-500/50 transition duration-300">
      <h3 className="text-2xl font-semibold mb-4 text-blue-300">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  )
}
