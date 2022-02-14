import Head from 'next/head'
import styles from '../styles/RPS.module.css'
import {useState} from 'react'
import Layout from '../components/layout'
import Link from 'next/link'

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Rock Paper Scissors Spock Lizard</title>
        <meta name="description" content="Rock Paper Scissors Spock Lizard app" />
      </Head>
      <div className="my-32">
        <h1 className="text-4xl font-bold text-center text-slate-900 my-6">Rock Paper Scissors Spock Lizard</h1>
        <h2 className="text-xl text-center text-slate-500 my-6">An extended version of Rock Paper Scissors, running on a blockchain</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-12 mb-16">
        <Link href="/new">
          <a className="block p-8 rounded-xl bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">
            <h3 className="text-2xl font-bold text-white">Start a new round</h3>
            <p className="text-lg text-slate-200 my-3">Stake some ETH and challenge someone to a round</p>
          </a>
        </Link>
        <Link href="/join">
          <a className="block p-8 rounded-xl bg-gradient-to-r from-purple-800 to-fuchsia-600 hover:bg-gradient-to-r hover:from-purple-900 hover:to-fuchsia-700 hover:drop-shadow-lg">
          <h3 className="text-2xl font-bold text-white">Join an existing round</h3>
          <p className="text-lg text-slate-200 my-3">Match someone's stake in ETH and take them on in a round</p>
          <p className="text-slate-100 my-3"><small>You will need the contract address of the round you want to join.</small></p>
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default Home
