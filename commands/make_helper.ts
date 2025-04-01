import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'
import { ActionGenerator } from '../src/action_generator.js'

export default class MakeHelper extends CustomBaseCommand {
  static commandName: string = 'module:make-helper'
  static description: string = 'Generates new helper for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the helper',
  })
  declare name: string

  async run() {
    await ActionGenerator.handle(this.name, 'helper', 'Helper', this.customStubGenerator.bind(this))
  }
}
