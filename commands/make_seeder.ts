import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'

export default class MakeSeeder extends CustomBaseCommand {
  static commandName: string = 'module:make-seeder'
  static description: string = 'Generates new seeder for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the service',
  })
  declare name: string

  async run() {
    await this.generateClassFromStub(this.name, 'seeder')
  }
}
