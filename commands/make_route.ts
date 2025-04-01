import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'

export default class MakeRoute extends CustomBaseCommand {
  static commandName: string = 'module:make-route'
  static description: string = 'Generates new route for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the route',
    default: 'index',
  })
  declare name: string

  async run() {
    await this.generateClassFromStub(this.name, 'route')
  }
}
