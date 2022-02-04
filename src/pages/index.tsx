
import Head from "next/head";
import { GetStaticProps} from "next";
import { SubscribeButton } from "../components/SubscribeButton";
import styles from './home.module.scss'
import { stripe } from "../services/stripe";

interface homeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({product}: homeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
       <main className={styles.contentContainer}>
         <section className={styles.hero}>
            <span>👏 Hey, Welcome</span>
            <h1>News about <br /> the <span>React</span> world.</h1>
            <p>
              Get access to all the publications<br />
              <span>for {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(product.amount)} month</span>
            </p>
            <SubscribeButton priceId={product.priceId} />
         </section>

         <img src='/images/avatar.svg' alt='Girl Coding' />
       </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KPVBeLObmBwTP4i3HbUUkeO')

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100
  }

  return { 
    props: {
      product
    },

    revalidate: 60 * 60 * 24,
  }
}
