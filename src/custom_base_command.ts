import { flags, BaseCommand } from '@adonisjs/core/ace'
import { generators } from '@adonisjs/core/app'
import { stubsRoot } from '../stubs/main.js'
import { readFileSync } from 'node:fs'

export default class CustomBaseCommand extends BaseCommand {
  @flags.string({
    description: 'Name of the module, do not pass it if you are using default module',
    allowEmptyValue: true,
  })
  declare module?: string

  protected async getModuleName() {
    const moduleName = this.module || (await this.getUsedModule())

    if (!moduleName) {
      throw new Error(
        'You should pass --module={MODULE_NAME} flag since you do not use any modules'
      )
    }

    return moduleName
  }

  protected generateEntity(name: string) {
    return generators.createEntity(name)
  }

  protected async generateClassFromStub(name: string, stubName: string) {
    const codeMods = await this.createCodemods()
    const entity = this.generateEntity(name)
    await codeMods.makeUsingStub(
      stubsRoot,
      `${stubName}.stub`,
      {
        entity: entity,
        moduleName: await this.getModuleName(),
      }
    )
  }

  public async customStubGenerator(
    name: string,
    stubName: string,
    classNameGenerator: (entityName: string) => string = () => '',
    fileNameGenerator: (entityName: string) => string = () => '',
    additionalStubData?: Record<string, any>
  ) {
    const codeMods = await this.createCodemods()
    const entity = this.generateEntity(name)
    await codeMods.makeUsingStub(
      stubsRoot,
      `${stubName}.stub`,
      {
        entity: entity,
        moduleName: await this.getModuleName(),
        fileName: fileNameGenerator(entity.name),
        className: classNameGenerator(entity.name),
        ...additionalStubData,
      }
    )
  }

  private async getUsedModule() {
    try {
      return readFileSync(this.getUsedModulePath(), {
        encoding: 'utf-8',
      })
    } catch (error) {
      return ''
    }
  }

  protected getUsedModulePath() {
    return this.app.makePath('used_module')
  }
}
