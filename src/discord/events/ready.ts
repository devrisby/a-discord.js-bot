import { Events } from 'discord.js'
import { IDiscordEvent } from '../types/IDiscordEvent'

const ready: IDiscordEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    if (client.user !== null) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`Ready! Logged in as ${client.user.tag}`)
    }
  },
}

export default ready
