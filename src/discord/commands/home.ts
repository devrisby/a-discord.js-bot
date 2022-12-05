import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { ISlashCommand } from '../types/ISlashCommand'
import configs from '../../common/configs'

const homeSlashCommand: ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('home')
    .setDescription('Replies with github URL of bot source code'),
  async execute(interaction: CommandInteraction) {
    // await interaction.reply(`My source code is at: ${configs.GITHUB_URL}`)
    await interaction.reply(`My source code is at: https://github.com/devrisby/a-discord.js-bot`)
  },
}

export default homeSlashCommand
