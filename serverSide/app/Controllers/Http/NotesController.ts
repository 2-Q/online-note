import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Note from 'App/Models/Note'

export default class NotesController {

  public async index({ auth, response }: HttpContextContract) {
    const notes = await Note.query().where({ user_id: auth.user?.id })
    response.status(200).json({
      notes: notes
    })
  }


  public async store({ auth, request, response }: HttpContextContract) {
    // ========== validate payload ==========
    const validatorSchema = schema.create({
      title: schema.string.nullable(),
      content: schema.string.nullable(),
    })
    const payload = await request.validate({ schema: validatorSchema })

    // ========== store data ==========
    if (!(payload.title || payload.content)) {
      return response.status(422).json({})
    }
    const note = await Note.create({ ...payload, user_id: auth.user?.id })

    return response.json({ note })
  }



  public async show({ auth, response, params }: HttpContextContract) {
    const note = await Note.query().where({ id: params.id, user_id: auth.user?.id }).firstOrFail()
    return response.json({ note })
  }



  public async update({ auth, request, response, params }: HttpContextContract) {
    // ========== validate payload ==========
    const validatorSchema = schema.create({
      title: schema.string.nullable(),
      content: schema.string.nullable(),
    })
    const payload = await request.validate({ schema: validatorSchema })

    // ========== update data ==========
    const note = await Note.query().where({ id: params.id, user_id: auth.user?.id }).firstOrFail()
    note.merge(payload).save()

    return response.json({ note })
  }




  public async destroy({ auth, response, params }: HttpContextContract) {
    const note = await Note.query().where({ id: params.id, user_id: auth.user?.id }).firstOrFail()
    note.delete()

    return response.json({
      message: "Note berhasil dihapus"
    })
  }
}
