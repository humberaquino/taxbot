function countryTax(country, taxMap) {
    const tax = taxMap[country]
    return tax
}

module.exports = {
    countryTax
}