import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { ISlashCommand } from '../types/ISlashCommand'

const pingSlashCommand: ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('pong!')
  },
}

export default pingSlashCommand
