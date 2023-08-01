import { DateTime } from 'luxon'
// import Hash from '@ioc:Adonis/Core/Hash'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  // @column({
  //   serializeAs: null,
  //   prepare: async (value) => await Hash.make(value),
  // })
  // public password: string

  // @column()
  // public rememberMeToken?: string

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
