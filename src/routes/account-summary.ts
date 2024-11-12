import type { FastifyInstance } from 'fastify'

import { knex } from '../database'

export function accountSummary(app: FastifyInstance) {
	app.get('/transactions/summary', async () => {
		const summary = await knex('transactions')
			.sum('amount', { as: 'amount' })
			.first()

		return summary
	})
}
