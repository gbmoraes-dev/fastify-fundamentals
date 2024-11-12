import type { FastifyInstance } from 'fastify'

import { knex } from '../database'

export function listTransactions(app: FastifyInstance) {
	app.get('/transactions', async () => {
		const transactions = await knex('transactions').select()

		return { transactions }
	})
}
