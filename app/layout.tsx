import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <main className="flex min-h-screen items-center justify-between p-24">
      {children}
    </main>
    </body>
    </html>
  )
}
