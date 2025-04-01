import CustomBaseCommand from '../src/custom_base_command.js'
import { generators } from '@adonisjs/core/app'
import { existsSync, writeFileSync } from 'node:fs'
import { args } from '@adonisjs/core/ace'

export default class UseModule extends CustomBaseCommand {
  static commandName: string = 'module:use'
  static description: string = 'Use module as default'

  @args.string()
  declare name: string

  async run() {
    const entity = generators.createEntity(this.name)
    const moduleName = generators.modelFileName(entity.name).replace('.ts', '')
    const modulePath = this.app.makePath('modules', moduleName)

    if (!existsSync(modulePath)) {
      this.logger.error("Module doesn't exists")
      await this.terminate()
      this.exitCode = 1
      return
    }

    writeFileSync(this.getUsedModulePath(), moduleName, 'utf-8')

    this.logger.success('Module set as default successfully !')
  }
}
