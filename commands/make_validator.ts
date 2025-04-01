import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'

export default class MakeValidator extends CustomBaseCommand {
  static commandName: string = 'module:make-validator'
  static description: string = 'Generates new validator for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the validator',
  })
  declare name: string

  async run() {
    await this.generateClassFromStub(this.name, 'validator')
  }
}
