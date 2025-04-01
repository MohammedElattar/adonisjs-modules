import CustomBaseCommand from '../src/custom_base_command.js'
import {args, flags} from '@adonisjs/core/ace'
import {ActionGenerator} from "../src/action_generator.js";

export default class MakeListener extends CustomBaseCommand {
  static commandName = 'module:make-listener'
  static description = 'Create a new event listener class'

  @args.string({ description: 'Name of the event listener' })
  declare name: string

  @flags.string({
    description: 'Generate an event class alongside the listener',
    alias: 'e',
  })
  declare event: string

  /**
   * The stub to use for generating the event listener
   */
  protected stubPath: string = 'listener/main'

  prepare() {
    if (this.event) {
      this.stubPath = 'listener/for_event'
    }
  }

  async run() {
    if (this.event) {
      const { exitCode } = await this.kernel.exec('module:make-event', [this.event])

      /**
       * Create listener only when make:event is completed successfully
       */
      if (exitCode === 0) {
        const eventEntity = this.app.generators.createEntity(this.event)
        await ActionGenerator.handle(
          this.name,
          this.stubPath,
          'Listener',
          this.customStubGenerator.bind(this),
          'listener',
          {
            event: eventEntity
          }
        )
      }

      return
    }

    await ActionGenerator.handle(this.name, this.stubPath, 'Listener', this.customStubGenerator.bind(this))
  }
}
