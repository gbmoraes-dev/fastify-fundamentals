import type { FastifyInstance } from 'fastify'

import { z } from 'zod'

import { knex } from '../database'

import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

const getTransactionParamsSchema = z.object({
  id: z.string().uuid(),
})

export function getTransactionById(app: FastifyInstance) {
  app.get(
    '/transactions/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { id } = getTransactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      return { transaction }
    },
  )
}
