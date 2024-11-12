import type { FastifyInstance } from 'fastify'

import { knex } from '../database'

import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export function accountSummary(app: FastifyInstance) {
	app.get(
		'/transactions/summary',
		{
			preHandler: [checkSessionIdExists],
		},
		async (request) => {
			const { sessionId } = request.cookies

			const summary = await knex('transactions')
				.where('session_id', sessionId)
				.sum('amount', { as: 'amount' })
				.first()

			return summary
		},
	)
}
