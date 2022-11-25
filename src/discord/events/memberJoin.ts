import { Events, userMention } from 'discord.js'
import { IDiscordEvent } from '../types/IDiscordEvent'

const memberJoinWelcomeMessage = (userMention: string): string =>
  `Hello, ${
    userMention !== null || userMention !== undefined
      ? userMention
      : 'new member!'
  }! Please state why you have joined this server to be allowed to participate in the server! Access can take some time to be granted`

const memberJoin: IDiscordEvent = {
  name: Events.GuildMemberAdd,
  async execute(client) {
    // TODO: clean this up :(
    console.log('someone joined!!!')
    const channels = await client.guild.channels.fetch()
    const channelMap = channels.filter((c: any) => c.name === 'welcome')
    const channelFirstEntry = [...channelMap][0]
    const channel = await client.guild.channels.cache.get(channelFirstEntry[0])
    if (channel !== null || channel !== undefined) {
      channel.send(memberJoinWelcomeMessage(userMention(client.user.id)))
    } else {
      client.send(memberJoinWelcomeMessage(userMention(client.user.id)))
    }
  },
}

export default memberJoin
