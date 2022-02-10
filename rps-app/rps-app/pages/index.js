import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Rock Paper Scissors Spock Lizard</h1>
      <p>An enhanced version of Rock Paper Scissors, running on the blockchain</p>
    </div>
  )
}
