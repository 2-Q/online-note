import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public title: (string | null)

  @column()
  public content: (string | null)

  @column.dateTime({
    autoCreate: true,
    prepare: (value) => value.toUnixInteger(),
    consume: (value) => value ? DateTime.fromSeconds(value).toUnixInteger() : null
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    prepare: (value) => value.toUnixInteger(),
    consume: (value) => value ? DateTime.fromSeconds(value).toUnixInteger() : null
  })
  public updatedAt: DateTime
}
