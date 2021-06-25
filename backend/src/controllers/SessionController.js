const connection = require('../database/connection')

module.exports = {
	async create(request, response) {
		const { email } = request.body

		const user = await connection('user')
			.where('email', email)
			.select('name')
			.first()

		if (!user) {
			return response
				.status(400)
				.json({ error: 'Nenhum usuário encontrado com esse e-mail' })
		}

		return response.json(user)
	},
}
