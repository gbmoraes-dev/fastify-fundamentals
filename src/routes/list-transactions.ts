import type { FastifyInstance } from 'fastify'

import { knex } from '../database'

import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export function listTransactions(app: FastifyInstance) {
  app.get(
    '/transactions',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )
}
