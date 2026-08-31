import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' })
export const metadata: Metadata = { title: 'GeoEcoz — Earth observation control panel', description: 'A field monitoring register for habitat risk and conservation response.' }
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#14181A' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className={`${inter.variable} ${mono.variable} ${newsreader.variable}`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
