import CustomBaseCommand from '../src/custom_base_command.js'
import { args, flags } from '@adonisjs/core/ace'

export default class MakeModel extends CustomBaseCommand {
  static commandName = 'module:make-model'
  static description = 'Make a new Lucid model'

  /**
   * The name of the model file.
   */
  @args.string({ description: 'Name of the model class' })
  declare name: string

  /**
   * Defines if we generate the migration for the model.
   */
  @flags.boolean({
    name: 'migration',
    alias: 'm',
    description: 'Generate the migration for the model',
  })
  declare migration: boolean

  /**
   * Defines if we generate the controller for the model.
   */
  @flags.boolean({
    name: 'controller',
    alias: 'c',
    description: 'Generate the controller for the model',
  })
  declare controller: boolean

  /**
   * Defines if we generate the factory for the model.
   */
  @flags.boolean({
    name: 'factory',
    alias: 'f',
    description: 'Generate a factory for the model',
  })
  declare factory: boolean

  async run() {
    await this.generateClassFromStub(this.name, 'model')

    await this.callRelatedCommand(this.migration, 'module:make-migration')
    await this.callRelatedCommand(this.controller, 'module:make-controller')
    await this.callRelatedCommand(this.factory, 'module:make-factory')
  }

  private async callRelatedCommand(condition: boolean, command: string) {
    if (condition) {
      await this.kernel.exec(command, [this.name, `--module=${await this.getModuleName()}`])
    }
  }
}
