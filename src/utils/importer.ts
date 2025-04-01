import { existsSync, lstatSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import app from '@adonisjs/core/services/app'

const modulesPath = app.makePath('modules')

export function loadModuleProviders() {
  return importer('providers')
}

export function loadModulesMigrations(): string[] {
  const path = 'database/migrations'

  if (!existsSync(modulesPath)) {
    return []
  }

  return readdirSync(modulesPath)
    .filter((module) => {
      const modulePath = join(modulesPath, module)
      return lstatSync(modulePath).isDirectory()
    })
    .flatMap((module) => {
      return join(modulesPath, module, path)
    })
    .filter((path) => path !== null)
}

export function loadModuleRoutes() {
  return importer('routes')
}

function checkPathExistsSync(path: string): boolean {
  return existsSync(path);
}

function directoryFilesLength(path: string) {
  return readdirSync(path).length
}

const importer = (path: string, importDirectoryOnly: boolean = false) => {
  if (!checkPathExistsSync(modulesPath)) {
    return []
  }

  return readdirSync(modulesPath)
    .filter((module) => {
      const modulePath = join(modulesPath, module)
      return lstatSync(modulePath).isDirectory()
    })
    .flatMap((module) => {
      const finalPath = join(modulesPath, module, path)

      if (!checkPathExistsSync(finalPath) || directoryFilesLength(finalPath) === 0) {
        return []
      }

      if (importDirectoryOnly) {
        return [() => import(`#modules/${module}/${path}`)]
      }

      return readdirSync(finalPath)
        .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
        .map((file) => () => import(`#modules/${module}/${path}/${file.replace('.ts', '.js')}`))
    })
}
