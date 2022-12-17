import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import * as firebaseAdmin from 'firebase-admin';
const serviceAccount = require('../../../firebaseCredential.json')

// ========== init firebase ==========
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: serviceAccount.project_id,
        privateKey: serviceAccount.private_key,
        clientEmail: '243dwiki.com@gmail.com' //serviceAccount.client_email

        // projectId: process.env.PROJECT_ID,
        // privateKey: process.env.PRIVATE_KEY,
        // clientEmail: process.env.CLIENT_EMAIL
    })
});
// ======== end init firebase ========


export default class AuthController {
    async login({ auth, request, response }: HttpContextContract) {
        // ========== validate payload ==========
        const validatorSchema = schema.create({
            accessToken: schema.string(),
        })
        const payload = await request.validate({ schema: validatorSchema })

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
}
