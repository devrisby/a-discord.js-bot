import { Client } from 'discord.js'
import configs from '../common/configs'
import deployCommands from './services/commandService'

// Log in to Discord with your client's token
const startDiscordBot = async (client: Client): Promise<void> => {
  try {
    await deployCommands()
    await client.login(configs.BOT_TOKEN)
  } catch (err) {
    console.log('Error starting discord bot!')
    throw err
  }
}

export default {
  startDiscordBot,
}
