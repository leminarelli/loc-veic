const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query

		const count = await connection('reservation').count()

		response.header('X-Total-Count', count['count(x)'])

		const reservation = await connection('reservation')
			.join('cars', 'cars.id', '=', 'reservation.car_id')
			.limit(5)
			.offset((page - 1) * 5)
			.select([
				'reservation.*',
				'reservation.name',
				'reservation.document',
				'reservation.dateStart',
				'reservation.dateEnd',
			])

		return response.json(reservation)
	},

	async create(request, response) {
		const { name, document, dateStart, dateEnd } = request.body
		const car_id = request.headers.authorization

		const [id] = await connection('reservation').insert({
			car_id,
			name,
			document,
			dateStart,
			dateEnd,
		})
		return response.json({ id })
	},
}
