import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Dropdown from '../component/demo/hook'
import Counter from '../component/demo/class/headless_class'

const inter = Inter({ subsets: ['latin'] })

const item = [{ label: '1', value: 1 }, { label: '2', value: 2 }];


export default function Home() {
  return (
    <>
      <Head>
        <title>headless</title>
        <meta name="description" content="headless demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Dropdown
          items={item}
          onSelectItem={(item) => { console.warn(item) }}
        />
        <Counter initialCount={10} />
      </main>
    </>
  )
}
