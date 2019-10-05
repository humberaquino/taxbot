const Telegraf = require('telegraf')
const TaxService = require('../taxation/tax_service')

function extractCountryFromMsg(message) {
    return message.split(' ').slice(1).join(' ')
}

function transformResult(country, result) {
    return `- Corporate: ${result.corporate}\n- Income low: ${result.income_low}\n- Income high: ${result.income_high}\n- Sales: ${result.sales}`
}

function startTelegramBot(token, taxMap) {
    const bot = new Telegraf(token)

    bot.command('tax', ({
        reply,
        message
    }) => {
        console.log(message)

        const country = extractCountryFromMsg(message.text).toLowerCase()
        const result = TaxService.countryTax(country, taxMap)

        if (result) {
            reply(`${transformResult(country, result)}`)
        } else {
            reply(`Country '${country}' not found`)
        }
    })
    bot.launch()
}

module.exports = {
    startTelegramBot
}