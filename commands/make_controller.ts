import CustomBaseCommand from '../src/custom_base_command.js'
import { args, flags } from '@adonisjs/core/ace'

export default class MakeController extends CustomBaseCommand {
  static commandName: string = 'module:make-controller'
  static description: string = 'Generates new controller for a given module'

  @args.string({
    argumentName: 'name',
    description: 'Name of the controller',
  })
  declare name: string

  @flags.boolean({
    flagName: 'resource',
    alias: 'r',
    default: false,
    description: 'With main resource methods: (index, show, store, update, delete)',
  })
  declare isResource?: boolean

  @flags.boolean({
    flagName: 'empty',
    alias: 'e',
    default: true,
    description: 'Generates empty controller',
  })
  declare isEmpty?: boolean

  @flags.boolean({
    flagName: 'api',
    alias: 'a',
    default: false,
    description: 'With main api methods: (index, show, store, update, delete)',
  })
  declare isApi?: boolean

  async run() {
    switch (true) {
      case this.isResource:
        await this.generateController('resource')
        break

      case this.isApi:
        await this.generateController('api')
        break

      default:
        await this.generateController('empty')
        break
    }
  }

  private async generateController(stubName: string) {
    await this.generateClassFromStub(this.name, `controllers/${stubName}`)
  }
}
