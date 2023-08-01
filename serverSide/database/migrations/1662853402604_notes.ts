import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').onUpdate('CASCADE').notNullable()
      table.string('title').nullable()
      table.text('content').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.bigInteger('created_at')
      table.bigInteger('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
