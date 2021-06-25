const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query

		const count = await connection('cars').count()

		response.header('X-Total-Count', count['count(x)'])

		const cars = await connection('cars')
			.join('user', 'user.id', '=', 'cars.user_id')
			.limit(5)
			.offset((page - 1) * 5)
			.select([
				'cars.*',
				'cars.model',
				'cars.year',
				'cars.color',
				'cars.quilometragem',
				'cars.description',
				'cars.city',
				'cars.price',
			])

		return response.json(cars)
	},

	async create(request, response) {
		const { model, year, description, city, price, quilometragem, color } =
			request.body
		const user_id = request.headers.authorization

		const [id] = await connection('cars').insert({
			model,
			year,
			description,
			quilometragem,
			user_id,
			color,
			city,
			price,
		})
		return response.json({ id })
	},
	async delete(request, response) {
		const { id } = request.params
		const user_id = request.headers.authorization

		const cars = await connection('cars')
			.where('id', id)
			.select('user_id')
			.first()

		if (cars.user_id != user_id) {
			return response.status(401).json({ error: 'Operation not Permitted' })
		}
		await connection('cars').where('id', id).delete()
		return response.status(204).send()
	},
}
