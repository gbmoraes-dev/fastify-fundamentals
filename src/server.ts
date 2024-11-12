import fastify from 'fastify'

import { env } from './env'

import { createTransaction, listTransactions } from './routes'

const app = fastify()

app.register(createTransaction).register(listTransactions)

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log(`🚀 HTTP server is running on port ${env.PORT}`)
	})
