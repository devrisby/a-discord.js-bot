import { CacheType, Events, Interaction } from 'discord.js'
import { IBotClient } from '../types/IBotClient'
import { EventParam, IDiscordEvent } from '../types/IDiscordEvent'

const interactionCreate: IDiscordEvent = {
  name: Events.InteractionCreate,
  async execute(i): Promise<void> {
    // I kept getting typescript errors here so I followed this answer to fix it:
    //   - https://stackoverflow.com/questions/70741515/how-to-use-union-type-as-function-parameter
    // TODO: figure out how to do this properly
    const x: EventParam<Interaction<CacheType>> = async interaction => {
      if (!interaction.isChatInputCommand()) return

      const c = interaction.client as IBotClient
      let command

      if (c.commands !== undefined) {
        command = c.commands.get(interaction.commandName)
      }

      try {
        if (command !== undefined) {
          await command.execute(interaction)
        }
      } catch (err) {
        console.error(err)
        await interaction.reply({
          content: 'There was an error while executing this command',
          ephemeral: true,
        })
      }
    }

    await x(i as Interaction<CacheType>)
  },
}

export default interactionCreate
