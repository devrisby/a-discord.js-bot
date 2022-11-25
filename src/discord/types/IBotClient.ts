import { Client, Collection } from 'discord.js'
import { ISlashCommand } from './ISlashCommand'

// Had to create this to circumvent typescript violation on adding `commands` to client instance
export interface IBotClient extends Client {
  commands?: Collection<string, ISlashCommand>
}
