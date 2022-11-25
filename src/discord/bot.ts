import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { IBotClient } from './types/IBotClient'
import c from './commands'
import e from './events'
// import { ISlashCommand } from './types/ISlashCommand';

// Create a new client instance
const client: IBotClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
})

client.commands = new Collection()

// setup
c.setCommands(client)
e.setEvents(client)

export default client
