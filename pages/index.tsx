import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'
import NoResults from '../components/NoResults'

interface IProps {
  products: Product[]
}

// const inter = Inter({ subsets: ['latin'] })

 const Home = ( { products }: IProps ) => {
  return (
    <>
      <Head>
        <title>Everything Cedar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className='grid grid-cols-2 md:grid-cols-3 w-full gap-4 lg:gap-1 pr-2 videos h-full'>
        {products.length ? (
          products.map((product: Product) => (
            <ProductCard list={product} key={product._id} />
          ))
        ) : (
          <NoResults text={'NO New Products... Check Back Later'} />
        )
        }
      </div>
      </main>
    </>
  )
}


export const getServerSideProps = async () => {
  const { data } = await axios.get(`https://e-cedar.vercel.app/api/products`);

  

  return {
    props: {
      products: data
    },
  }
}

export default Home