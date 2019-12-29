function createCard() {
    const cardObj = {
        cardDiv: document.createElement("div"),
        cardSecondDiv: document.createElement("div"),
        cardBtn: document.createElement("button"),
        cardNameP: document.createElement("p"),
        cardSymbolP: document.createElement("p"),
        cardToggle: document.createElement("input"),
        moreInfo: document.createElement("div"),
        moreInfoImg: document.createElement("img"),
        moreInfoSpan: document.createElement("p"),
        moreInfoSecondSpan: document.createElement("p"),
        moreInfoThirdSpan: document.createElement("p"),
        toggleLabel: document.createElement("label"),
        toggleSpan: document.createElement("span"),
        selected: false
    }
    return cardObj
}

function editCard(cardObj, currencyObj) {
    const { cardDiv, cardSecondDiv, cardBtn, cardNameP, cardSymbolP, cardToggle, moreInfo, moreInfoImg, moreInfoSpan, moreInfoSecondSpan, moreInfoThirdSpan, toggleLabel, toggleSpan } = cardObj
    cardDiv.className = "card"
    cardDiv.style.width = "19rem"
    cardDiv.style.display = "flex"
 
    cardSecondDiv.className = "card-body"
    cardSecondDiv.style.padding = "3.25rem"

    moreInfo.className = "popup"
    moreInfo.className = "popuptext"

    cardBtn.className = "btn btn-primary"
    cardBtn.innerText = "more info"

    cardNameP.innerText = currencyObj.symbol
    
    cardSymbolP.innerText = currencyObj.name
    cardNameP.className = "padding"
    
    toggleLabel.className = "switch float-right"
    toggleSpan.className = "slider round"
    cardToggle.type = "checkbox"

    cardToggle.addEventListener("click", function () {

        const coinIndex = findCoinBySymbol(this.parentElement.parentElement.querySelector("p").innerText)
        isCoinExists(stateArray[coinIndex], this)
    })

    cardBtn.addEventListener("click", popupFunction)

    


    cardBtn.addEventListener("click", () => {

        getCurrencyInfo(currencyObj.id, (res) => {
            moreInfoImg.src = res.image.small
            moreInfoSpan.innerText = "the price comparison is :"
                + res.market_data.current_price.usd + "$"
            moreInfoSecondSpan.innerText = res.market_data.current_price.eur + "€"
            moreInfoThirdSpan.innerText = res.market_data.current_price.ils + "₪"

        })
    })
    return cardObj

}

function cardAppend(cardObj,div) {
    const { cardDiv, cardSecondDiv, cardBtn, cardSymbolP, cardNameP, cardToggle, moreInfo, moreInfoImg, moreInfoSpan, moreInfoSecondSpan, moreInfoThirdSpan, toggleLabel, toggleSpan } = cardObj
    toggleLabel.append(cardToggle, toggleSpan)
    moreInfo.append(moreInfoImg, moreInfoSpan, moreInfoSecondSpan, moreInfoThirdSpan)
    cardSecondDiv.append(toggleLabel, cardNameP, cardSymbolP, moreInfo, cardBtn)
    cardDiv.append(cardSecondDiv)
  
    div.append(cardDiv)
   

}


function draw(arrayToDraw,div) {
    arrayToDraw.forEach((itr) => {
        const createdCard = createCard()
        let editedCard = editCard(createdCard,itr)
        if(itr.selected) editedCard.cardToggle.checked = true
        cardAppend(editedCard,div)
    })
}

getCurrencyToArray((result) => {
    stateArray = result
    draw(stateArray,mainDiv)
})

function isCoinExists(coinObj, btnRef) {
    if (selectedArray.length >= 5 && selectionSearch(coinObj.symbol) === undefined) {
        btnRef.checked = false      
        draw(selectedArray,modalDiv)
        modalDiv.querySelectorAll("input").forEach((itr)=>{
        itr.checked = true
        })
          modal.style.display = "block"
        return
    }
    if (!coinObj.selected) {
        selectedArray.push(coinObj)
        coinObj.selected = true
    } else if (coinObj.selected) {
        coinObj.selected = false
        const coinIndex = selectionSearch(coinObj.symbol)
        selectedArray.splice(coinIndex, 1)

    }
}


function findCoinBySymbol(coinSymbol) {
    for (let index = 0; index < stateArray.length; index++)
        if (coinSymbol === stateArray[index].symbol)
            return index
}

function selectionSearch(coinSymbol) {
    for (let index = 0; index < selectedArray.length; index++)
        if (coinSymbol === selectedArray[index].symbol)
            return index
}

function popupFunction() {
    let span = this.parentElement.querySelector("div")
    span.classList.toggle("show");
}
function home() {
    aboutDiv.style.display = "none"
    deleteDOM();
    draw(stateArray,mainDiv)
}

function about() {
    deleteDOM();
    aboutDiv.style.display = "block";
   
}

function deleteDOM() {
    $("#mainDiv").html("");
}

function handleSearch() {
    let searchText = searchInput.value;
    const filteredArray = stateArray.filter(coinItem => coinItem.symbol.toLowerCase() === searchText.toLowerCase());
    deleteDOM();
    draw(filteredArray,mainDiv);
}

function SelectedCurrenciesSymbols(selectedCurrenciesArray) {
    return selectedCurrenciesArray.map((coinObject) => coinObject.symbol.toUpperCase()).join(',');


}

