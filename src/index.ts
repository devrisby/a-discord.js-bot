import discord from './discord'
import client from './discord/bot'

const main = async (): Promise<void> => {
  console.log('Starting app...')
  await discord.startDiscordBot(client)
}

main()
  .then(() => {})
  .catch((err: Error) => console.log(`App failed to start\n${err.message}`))
