import { Inter } from 'next/font/google'
import './globals.css'
import Header from "../components/Header";
import AuthProvider from "../providers/AuthProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Captify',
  description: 'Create thumbnails hassle free for your videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gradient-to-b from-bgGradientFrom to-bgGradientTo min-h-screen text-white"}>
        <AuthProvider>
          <main className="p-4 max-w-2xl mx-auto">
            <Header />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
