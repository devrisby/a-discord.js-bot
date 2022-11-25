import { CacheType, Client, Events, Interaction } from 'discord.js'
type EventParamTypes = Client<boolean> | Interaction<CacheType>
export type EventParam<T extends EventParamTypes> = (arg: T) => Promise<void>

export interface IDiscordEvent {
  [x: string]: any
  name: Events
  once?: boolean
  execute: (
    param: Client<boolean> | Interaction<CacheType> | any
  ) => void | Promise<void>
}
