'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase/config'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Si la autenticación es exitosa, redirige al usuario a la página de inicio
      router.push('/notifications/all')
    } catch (error) {
      setError('Failed to log in. Please check your email and password.')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
        style={{
          background: 'rgba( 255, 255, 255, 0.25 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 4px )',
          WebkitBackdropFilter: 'blur( 4px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
        }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white rounded-lg bg-white bg-opacity-20 p-2 hover:bg-white hover:bg-opacity-30 transition duration-300 ease-in-out cursor-pointer"
          >
            Login
          </button>
        </form>
        <div>
          <p className="text-white mt-4">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="font-bold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
