import { PropsWithChildren } from 'react'
import '@/assets/styles/globals.css'
import { Inter, Manrope } from 'next/font/google'
import { cx } from '@/utils'
import Header from '@/components/header'
import Footer from '@/components/footer'
import siteMetaData from '@/utils/siteMetadata'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], display: "swap", variable: "--font-in" })
const manrope = Manrope({ subsets: ['latin'], display: "swap", variable: "--font-mr" })

export const metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: {
    template: `%s | ${siteMetaData.title}`,
    default: siteMetaData.title
  },
  description: siteMetaData.description,
  openGraph: {
    title: siteMetaData.title,
    description: siteMetaData.description,
    url: siteMetaData.siteUrl,
    siteName: siteMetaData.title,
    images: [
      siteMetaData.socialBanner
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetaData.title,
    description: siteMetaData.description,
    images: [siteMetaData.socialBanner],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cx(inter.variable, manrope.variable, 'font-mr bg-light dark:bg-dark')}>
      <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }`}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
