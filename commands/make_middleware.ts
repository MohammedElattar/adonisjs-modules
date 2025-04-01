import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'

export default class MakeMiddleware extends CustomBaseCommand {
  static commandName: string = 'module:make-middleware'
  static description: string = 'Generates new middleware for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the middleware',
  })
  declare name: string

  async run() {
    await this.generateClassFromStub(this.name, 'middleware')
  }
}
