exports.up = function (knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.string('vin', 17).notNullable().unique();
    tbl.string('make').notNullable();
    tbl.string('model').notNullable();
    tbl.decimal('mileage').notNullable();
    tbl.string('title');
    tbl.string('transmission');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('cars');
};