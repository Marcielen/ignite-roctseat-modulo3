import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";


interface subscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({priceId}: subscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    /* if(!session) {
      signIn('github')
      return;
    } */

    try { 
      const response = await axios.post('/api/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId})
    } catch (err) {
      alert(err.message)
    }

  }
  return <button type="button" onClick={handleSubscribe} className={styles.subscribeButton}>Subscribe now</button>;
}
