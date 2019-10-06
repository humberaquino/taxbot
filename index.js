const TaxFetcher = require('./taxation/tax_fetcher')
const bot = require('./bot/telegram')

if (!process.env.BOT_TOKEN) {
    console.error('BOT_TOKEN env var not defined')
    process.exit(1)
}

console.log("--> Fetching taxes")
TaxFetcher.process().then(taxMap => {
    console.log("--> Starting bot")
    bot.startTelegramBot(process.env.BOT_TOKEN, taxMap)
    console.log("--> Started")
}).catch(error => {
    console.error(error)
    process.exit(2)
})