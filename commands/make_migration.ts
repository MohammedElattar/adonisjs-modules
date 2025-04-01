import CustomBaseCommand from '../src/custom_base_command.js'
import { args, flags } from '@adonisjs/core/ace'

export default class MakeMigration extends CustomBaseCommand {
  static commandName = 'module:make-migration'
  static description = 'Make a new migration file'

  /**
   * The name of the migration file. We use this to create the migration
   * file and generate the table name
   */
  @args.string({ description: 'Name of the migration file' })
  declare name: string

  /**
   * Choose a custom pre-defined connection. Otherwise, we use the
   * default connection
   */
  @flags.string({
    description: 'Select database connection for which to create the migration',
  })
  declare connection: string

  /**
   * Pre select migration directory. If this is defined, we will ignore the paths
   * defined inside the config.
   */
  @flags.string({ description: 'Select migration directory (if multiple sources are configured)' })
  declare folder: string

  /**
   * Custom table name for creating a new table
   */
  @flags.boolean({ description: 'Create a new default (Default action)' })
  declare create: boolean

  /**
   * Custom table name for altering an existing table
   */
  @flags.boolean({ description: 'Alter an existing table' })
  declare alter: boolean

  async run() {
    await this.kernel.exec('make:migration', [
      this.name,
      this.connection && `--connection=${this.connection}`,
      this.create ? '--create' : '',
      this.alter ? '--alter' : '',
      `--folder=${this.app.makePath('modules', await this.getModuleName(), 'database', 'migrations', this.folder ? this.folder : '')}`,
    ])
  }
}
