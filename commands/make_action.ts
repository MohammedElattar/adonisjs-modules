import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'
import { ActionGenerator } from '../src/action_generator.js'

export default class MakeAction extends CustomBaseCommand {
  static commandName: string = 'module:make-action'
  static description: string = 'Generates new action for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the action',
  })
  declare name: string

  async run() {
    await ActionGenerator.handle(this.name, 'action', 'Action', this.customStubGenerator.bind(this))
  }
}
