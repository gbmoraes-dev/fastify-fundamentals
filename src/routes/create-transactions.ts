import type { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { knex } from '../database'

import crypto from 'node:crypto'

const createTransactionBodySchema = z.object({
	title: z.string(),
	amount: z.number(),
	type: z.enum(['credit', 'debit']),
})

export function createTransaction(app: FastifyInstance) {
	app.post('/transactions', async (request, reply) => {
		const body = createTransactionBodySchema.parse(request.body)

		const { title, amount, type } = body

		await knex('transactions').insert({
			id: crypto.randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
		})

		return reply.status(201).send()
	})
}
