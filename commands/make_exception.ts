import { args } from '@adonisjs/core/ace'
import CustomBaseCommand from '../src/custom_base_command.js'

export default class MakeCommand extends CustomBaseCommand {
  static commandName: string = 'module:make-exception'
  static description: string = 'Generates new exception class for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the exception',
  })
  declare name: string

  async run() {
    await this.generateClassFromStub(this.name, 'exception')
  }
}
