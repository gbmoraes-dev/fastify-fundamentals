import request from 'supertest'

import { describe, it, beforeAll, afterAll, beforeEach } from 'vitest'

import { execSync } from 'node:child_process'

import { app } from '../src/app'

describe('Transactions Tests', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	beforeEach(() => {
		execSync('npm run knex migrate:rollback --all')
		execSync('npm run knex migrate:latest')
	})

	it('should be able to create a new transaction', async () => {
		await request(app.server)
			.post('/transactions')
			.send({
				title: 'New Transaction',
				amount: 5000,
				type: 'credit',
			})
			.expect(201)
	})
})
