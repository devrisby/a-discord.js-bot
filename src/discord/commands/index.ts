/* eslint-disable @typescript-eslint/no-var-requires */
import file from '../../common/utils/file'
import { IBotClient } from '../types/IBotClient'
import { ISlashCommand } from '../types/ISlashCommand'

const commandFilePaths = file.getFiles(
  file.getPath('discord', 'commands'),
  'index'
)

const setCommands = (client: IBotClient): IBotClient | any => {
  const newClient = { ...client }
  commandFilePaths.forEach(f => {
    const command: ISlashCommand = require(f)
    if (newClient.commands !== undefined) {
      newClient.commands.set(command.default.data.name, command.default)
    } else {
      throw new Error('Failed to load command!')
    }

    return newClient
  })
}

export default {
  setCommands,
  commandFilePaths,
}
