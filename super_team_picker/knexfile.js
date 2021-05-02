// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'super_team_picker',
      user:     'me2',
      password: ' '
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    }
  }
};
