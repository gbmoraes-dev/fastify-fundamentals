import fastify from 'fastify'

import cookie from '@fastify/cookie'

import { env } from './env'

import {
	accountSummary,
	createTransaction,
	getTransactionById,
	listTransactions,
} from './routes'

const app = fastify()

app.register(cookie)

app
	.register(createTransaction)
	.register(listTransactions)
	.register(getTransactionById)
	.register(accountSummary)

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log(`🚀 HTTP server is running on port ${env.PORT}`)
	})
