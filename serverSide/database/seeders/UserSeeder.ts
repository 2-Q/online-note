import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Note from 'App/Models/Note';
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    for (let index = 1; index <= 2; index++) {
      let user = await User.create({
        email: `email_${index}`,
        name: 'user 1'
      });

      Note.createMany([
        {
          user_id: user.id,
          title: `note 1`,
          content: "Hello world, lorem ipsum dollor"
        },
        {
          user_id: user.id,
          title: `note 2`,
          content: "Hello panda, lorem ipsum dollor"
        },
      ])
    }
  }
}
