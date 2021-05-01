
exports.up = function(knex) {
  return knex.schema.createTable('cohorts', t => {
      t.increments('id')
      t.string('name')
      t.text('members')
      t.text('logoUrl')
      t.timestamps(true,true)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cohorts')
};
