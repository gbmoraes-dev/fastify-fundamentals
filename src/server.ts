import fastify from 'fastify'

import { env } from './env'

const app = fastify()

app.get('/', async () => {
	return 'Hello World'
})

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log(`🚀 HTTP server is running on port ${env.PORT}`)
	})
