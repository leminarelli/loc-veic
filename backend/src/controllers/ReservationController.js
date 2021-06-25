const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query

		const count = await connection('reservation').count()

		response.header('X-Total-Count', count['count(x)'])

		const cars = await connection('reservation')
			.join('cars', 'cars.id', '=', 'reservation.user_id')
			.limit(5)
			.offset((page - 1) * 5)
			.select([
				'reservation.*',
				'reervation.name',
				'reservation.document',
				'reservation.dateStart',
				'reservation.dateEnd',
			])

		return response.json(reservation)
	},

	async create(request, response) {
		const { name, document, dateStart, dateEnd } = request.body
		const user_id = request.headers.authorization

		const [id] = await connection('reservation').insert({
			user_id,
			name,
			document,
			dateStart,
			dateEnd,
		})
		return response.json({ id })
	},
}
