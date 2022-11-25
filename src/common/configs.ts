import dotenv from 'dotenv'

dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN

if (BOT_TOKEN === null || BOT_TOKEN === undefined) {
  throw new Error('Failed to load bot token!')
}

const GITHUB_URL =
  process.env.GITHUB !== undefined ? process.env.GITHUB : "I don't know! Error!"
const ENV = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'prod'
const CLIENTID = process.env.CLIENTID !== undefined ? process.env.CLIENTID : ''
const GUILDID = process.env.GUILDID !== undefined ? process.env.GUILDID : ''

export default {
  BOT_TOKEN,
  GITHUB_URL,
  ENV,
  CLIENTID,
  GUILDID,
}
