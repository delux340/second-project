homeBtn.addEventListener("click", home);
searchButton.addEventListener("click", handleSearch)


liveReportsBtn.addEventListener("click", () => {
    aboutDiv.style.display = "none"
    const currenciesArray = SelectedCurrenciesSymbols(selectedArray);
    getCurrenciesExchange(currenciesArray, (data) => {
        console.log(data);
        deleteDOM()
        draw(selectedArray)
 

    })
})

aboutBtn.addEventListener("click", about)

modalBtn.addEventListener("click",function () {
    modal.style.display = "none"
    $("#modalDiv").html("");
    deleteDOM()
    draw(stateArray,mainDiv)     
})

