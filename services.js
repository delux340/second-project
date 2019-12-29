function getCurrencyToArray(callback) {
    $.ajax({
        url: `https://api.coingecko.com/api/v3/coins/list`,
        method: "GET",
        success: (result) => {
            callback(result)
        }
    })
}
function getCurrencyInfo(id,callback) {
     $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${id}`,
            method: "GET",
            success: function (currency) {
                callback(currency)
            },
        })
    

}

function getCurrenciesExchange(symbolsArray, callback) {
    const exchangeUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolsArray}&tsyms=USD`
    $.ajax({
        url: exchangeUrl,
        method: "GET",
        success: (result) => {
            callback(result)
        }
    })
}





