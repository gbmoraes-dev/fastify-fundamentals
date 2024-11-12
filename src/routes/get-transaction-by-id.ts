import type { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { knex } from '../database'

const getTransactionParamsSchema = z.object({
	id: z.string().uuid(),
})

export function getTransactionById(app: FastifyInstance) {
	app.get('/transactions/:id', async (request) => {
		const { id } = getTransactionParamsSchema.parse(request.params)

		const transaction = await knex('transactions').where('id', id).first()

		return { transaction }
	})
}
