import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export interface ISlashCommand {
  // this was a fix automatically applied by vscode
  // for some reason, i was getting a default key in ISlashCommand instance
  //   the default key contains data & execute for some reasom
  //   and I have to use that default key to access data and execute properties
  //   because I can't use client.data directly...i have to do client.default.data
  //   TODO: figure this out
  [x: string]: any
  data: SlashCommandBuilder
  execute: (interaction: CommandInteraction) => Promise<void>
}
