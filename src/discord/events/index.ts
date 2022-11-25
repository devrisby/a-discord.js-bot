/* eslint-disable @typescript-eslint/no-var-requires */
import file from '../../common/utils/file'
import { IBotClient } from '../types/IBotClient'
import { IDiscordEvent } from '../types/IDiscordEvent'

const eventFilePaths = file.getFiles(file.getPath('discord', 'events'), 'index')

const setEvents = (client: IBotClient): IBotClient | any => {
  const newClient = { ...client }
  let eventsRegistered = 0
  eventFilePaths.forEach(f => {
    const event: IDiscordEvent | any = require(f)
    if (event.default.once !== null && event.default.once !== undefined) {
      client.once(event.default.name, (...args) =>
        event.default.execute(...args)
      )
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args))
    }

    eventsRegistered++
  })

  console.log('Events registered:', eventsRegistered)
  return newClient
}

export default {
  setEvents,
  eventFilePaths,
}
