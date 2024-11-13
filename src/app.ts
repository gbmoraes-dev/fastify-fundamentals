import fastify from 'fastify'

import cookie from '@fastify/cookie'

import {
  accountSummary,
  createTransaction,
  getTransactionById,
  listTransactions,
} from './routes'

export const app = fastify()

app.register(cookie)

app
  .register(createTransaction)
  .register(listTransactions)
  .register(getTransactionById)
  .register(accountSummary)
