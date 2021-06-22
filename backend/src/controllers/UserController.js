const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
	async index(request, response) {
		const user = await connection('user').select('*')

		return response.json(user)
	},

	async create(request, response) {
		const { name, email, phone, city, uf } = request.body

		const id = crypto.randomBytes(4).toString('HEX')

		await connection('user').insert({
			id,
			name,
			email,
			phone,
			city,
			uf,
		})

		return response.json({ id })
	},
}
