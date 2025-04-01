import { BaseCommand, args } from '@adonisjs/core/ace'
import { generators } from '@adonisjs/core/app'
import { existsSync, mkdirSync } from 'node:fs'

export default class MakeModule extends BaseCommand {
  static commandName: string = 'module:make'
  static description: string = 'Create a new module'

  @args.string()
  declare moduleName: string

  async run() {
    const entity = generators.createEntity(this.moduleName)
    const moduleName = generators.modelFileName(entity.name).replace('.ts', '')
    const modulePath = this.app.makePath('modules', moduleName)

    if (existsSync(modulePath)) {
      this.logger.error('Module name already exists !')
      await this.terminate()
      this.exitCode = 1
      return
    }

    mkdirSync(modulePath, { recursive: true })

    await this.callRelatedCommand(moduleName, 'model', ['-f', '-m', '-c'])
    await this.callRelatedCommand(moduleName, 'route')
    await this.callRelatedCommand(moduleName, 'service')
    await this.callRelatedCommand(moduleName, 'helper')
    await this.callRelatedCommand(moduleName, 'exception')

    this.logger.success(`Module has been generates in modules/${moduleName}`)
  }

  private async callRelatedCommand(moduleName: string, command: string, args?: string[]) {
    await this.kernel.exec(`module:make-${command}`, [
      moduleName,
      `--module=${moduleName}`,
      ...(Array.isArray(args) ? args : []),
    ])
  }
}
