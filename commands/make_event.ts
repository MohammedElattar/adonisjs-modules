import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'

export default class MakeEvent extends CustomBaseCommand {
  static commandName: string = 'module:make-event'
  static description: string = 'Generates new event for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the event',
  })
  declare name: string

  async run() {
    await this.generateClassFromStub(this.name, 'event')
  }
}
