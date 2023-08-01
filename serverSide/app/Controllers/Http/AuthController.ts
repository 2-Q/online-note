import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import * as firebaseAdmin from 'firebase-admin';


export default class AuthController {
    async login({ auth, request, response }: HttpContextContract) {
        // ========== validate payload ==========
        const validatorSchema = schema.create({
            accessToken: schema.string(),
        })
        const payload = await request.validate({ schema: validatorSchema })

        // ========== init firebase ==========
        // Get firebaseCredential on your firebase_console > project_settings > service_account > firebase_admin_sdk > generate_new_private_key
        const serviceAccount = require('../../../firebaseCredential.json')
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert({
                projectId: serviceAccount.project_id,
                privateKey: serviceAccount.private_key,
                clientEmail: '243dwiki.com@gmail.com' //serviceAccount.client_email
            })
        });

        // ========== verify token ==========
        const { email, name } = await firebaseAdmin.auth().verifyIdToken(payload.accessToken)

        // ========== get local user ==========
        let user = await User.firstOrCreate({ email }, { name })

        // ========== Generate token ==========
        const token = await auth.use('api').generate(user, {}) // expiresIn: '30mins' 

        return response.status(200).json({
            token: token,
            user
        })
    }



    async stagingLogin({ auth, response }: HttpContextContract) {
        // ========== get local user ==========
        let user = await User.firstOrFail()

        // ========== Generate token ==========
        const token = await auth.use('api').generate(user, {}) // expiresIn: '30mins' 

        // ========== Response ==========
        return response.status(200).json({
            token: token,
            user
        })
    }
}
