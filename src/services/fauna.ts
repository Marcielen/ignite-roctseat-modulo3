import { Client } from 'faunadb';

export const fauna = new Client({
  secret: process.env.FAUNADN_KEY
})