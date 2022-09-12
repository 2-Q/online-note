import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    async login({ auth, request, response }: HttpContextContract) {
        // ========== validate payload ==========
        const validatorSchema = schema.create({
            token: schema.string(),
        })
        const payload = await request.validate({ schema: validatorSchema })

        // ========== verify token ==========
        const email = 'new user' //payload.token

        // ========== get user ==========
        let user = await User.firstOrCreate({ email }, { name: email })

        // ========== Generate token ==========
        const token = await auth.use('api').generate(user, {}) // expiresIn: '30mins' 

        return response.status(200).json({
            token: token,
            user
        })
    }
}
