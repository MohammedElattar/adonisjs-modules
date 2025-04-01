import { generators } from '@adonisjs/core/app'
import StringBuilder from '@poppinss/utils/string_builder'
import {CustomStubGeneratorType} from "./types/custom_base_command.js";

export class ActionGenerator {
  static async handle(
    actionName: string,
    stubName: string,
    classSuffixName: string,
    customStubGenerator: CustomStubGeneratorType,
    fileSuffixName?: string,
    additionalStubData?: Record<string, any>
  ) {
    fileSuffixName = fileSuffixName || classSuffixName.toLowerCase()
    fileSuffixName = `_${fileSuffixName}`

    await customStubGenerator(
      actionName,
      stubName,
      function (entityName) {
        return new StringBuilder(generators.serviceName(entityName))
          .removeSuffix('Service')
          .suffix(classSuffixName)
          .toString()
      },
      function (entityName) {
        return new StringBuilder(generators.serviceFileName(entityName))
          .removeExtension()
          .removeSuffix('service')
          .suffix(fileSuffixName)
          .ext('.ts')
          .toString()
      },
      additionalStubData,
    )
  }
}
