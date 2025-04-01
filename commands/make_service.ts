import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'

export default class MakeService extends CustomBaseCommand {
  static commandName: string = 'module:make-service'
  static description: string = 'Generates new service for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the service',
  })
  declare name: string

  async run() {
    await this.generateClassFromStub(this.name, 'service')
  }
}
