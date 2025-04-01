import CustomBaseCommand from '../src/custom_base_command.js'
import { args } from '@adonisjs/core/ace'

export default class MakeFactory extends CustomBaseCommand {
  static commandName: string = 'module:make-factory'
  static description: string = 'Generates new factory for a given module'

  @args.string({
    description: 'Name of the model to associate factory with',
  })
  declare model: string

  async run() {
    const modelEntity = this.app.generators.createEntity(this.model)
    await this.customStubGenerator(
      '_',
      'factory',
      () => '',
      () => '',
      {
        model: modelEntity,
        entity: modelEntity,
      }
    )
  }
}
