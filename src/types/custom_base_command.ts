export type CustomStubGeneratorType = (
  name: string,
  stubName: string,
  nameTransformer: (entityName: string) => string,
  fileNameTransformer: (entityName: string) => string,
  additionalStubData?: Record<string, any>
) => Promise<void>
