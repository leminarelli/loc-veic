exports.up = function (knex) {
	return knex.schema.createTable('cars', function (table) {
		table.increments()
		table.string('model').notNullable()
		table.decimal('year', 4).notNullable()
		table.string('description').notNullable()
		table.string('city').notNullable()
		table.decimal('price').notNullable()
		table.string('user_id').notNullable()
		table.foreign('user_id').references('id').inTable('user')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('cars')
}
