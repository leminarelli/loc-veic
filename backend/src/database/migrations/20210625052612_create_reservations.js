exports.up = function (knex) {
	return knex.schema.createTable('reservation', function (table) {
		table.increments()
		table.string('name').notNullable()
		table.string('document').notNullable()
		table.string('dateStart').notNullable()
		table.string('dateEnd').notNullable()
		table.string('user_id').notNullable()
		table.foreign('user_id').references('id').inTable('cars')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('reservation')
}
