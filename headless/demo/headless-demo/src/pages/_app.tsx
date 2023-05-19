import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// Global Styles
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
