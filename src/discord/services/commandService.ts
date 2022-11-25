/* eslint-disable @typescript-eslint/no-var-requires */
import { REST, Routes } from 'discord.js'
import configs from '../../common/configs'
import c from '../commands'
import { ISlashCommand } from '../types/ISlashCommand'

const commands: any[] = []

for (const f of c.commandFilePaths) {
  const command: ISlashCommand = require(f)
  commands.push(command.default.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(configs.BOT_TOKEN)

const deployToDevGuild = async (rest: REST): Promise<unknown> =>
  await rest.put(
    Routes.applicationGuildCommands(configs.CLIENTID, configs.GUILDID),
    { body: commands }
  )
const deployToAllGuild = async (rest: REST): Promise<unknown> =>
  await rest.put(Routes.applicationCommands(configs.CLIENTID), {
    body: commands,
  })

const deployCommands = async (): Promise<void> => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any =
      configs.ENV === 'prod'
        ? await deployToAllGuild(rest)
        : await deployToDevGuild(rest)

    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
}

export default deployCommands
