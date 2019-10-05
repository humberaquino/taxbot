const request = require('request');
const cheerio = require('cheerio')

const urlTaxSource = 'https://en.m.wikipedia.org/wiki/List_of_countries_by_tax_rates'


function fetch() {
    return new Promise((resolve, reject) => {

        request(urlTaxSource, function (error, response, body) {
            if (error) {
                return reject(error)
            }

            resolve(body)
        });
    })
}

function parseBodyToMap(body) {
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(body)

        const result = {}
        $('table.wikitable tr').each(function (i, elem) {

            let country = $(this).find("td:nth-child(1) span").attr('data-sort-value')
            if (country) {
                country = country.toLowerCase()
            }

            const corporate = $(this).find("td:nth-child(2)").children().remove().end().text().trim()
            const income_low = $(this).find("td:nth-child(3)").children().remove().end().text().trim()
            const income_high = $(this).find("td:nth-child(4)").children().remove().end().text().trim()
            const sales = $(this).find("td:nth-child(5)").children().remove().end().text().trim()
            // return this.id;
            result[country] = {

                corporate,
                income_low,
                income_high,
                sales
            }
        })
        resolve(result)
    })
}

function process() {
    return new Promise((resolve, reject) => {
        fetch().then(body => {
            return parseBodyToMap(body)
        }).then(taxMap => {
            resolve(taxMap)
        }).catch(error => {
            reject(error)
        })
    })
}


module.exports = {
    process
}