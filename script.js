import jsonOfStockcodes  from './list-of-stockcodes.json' assert { type: "json" };
const listOfStockcodes = jsonOfStockcodes.BIST
// console.log(listOfStockcodes)

const stockEl_one = document.getElementById("stock-one")
const lowlimitEl_one = document.getElementById("alarm-lowlimit-one")
const highlimitEl_one = document.getElementById("alarm-highlimit-one")

const stockEl_two = document.getElementById("stock-two")
const lowlimitEl_two = document.getElementById("alarm-lowlimit-two")
const highlimitEl_two = document.getElementById("alarm-highlimit-two")

const totalEl = document.getElementById("total")
const calculateBtn = document.getElementById("calculate-total-btn")

const selectedStocks = [ {stock: 'stock_one'}, {stock: 'stock_two'} ]
const addNewBtn = document.getElementById("addnewbtn")

stockEl_one.addEventListener('change',()=>{
    let newStockName = document.getElementById("stock-one").value;
    // selectedStocks.stock_one.stockName = newStockName
    // console.log("selectedStocks:  ", selectedStocks)
    // console.log("came here", newStockName);
    offlineRefreshStockValue(
        newStockName, 
        document.getElementById("stockvalue-one"),
        selectedStocks,
        'stock_one'
    )
    
    
} 
    
); //it is a select list so we use change event

stockEl_two.addEventListener('change', 
    offlineRefreshStockValue(
        document.getElementById("stock-two").value, 
        document.getElementById("stockvalue-two")
    )
);

// stockEl_two.addEventListener('change', calculate);

// lowlimitEl_one.addEventListener('input', calculate); //input will be number or arrows
// highlimitEl_one.addEventListener('input', calculate); //input will be number or arrows
// lowlimitEl_two.addEventListener('input', calculate); //input will be number or arrows
// highlimitEl_two.addEventListener('input', calculate); //input will be number or arrows

calculateBtn.addEventListener('click', ()=> {
    // console.log('blabla')
})



addNewBtn.addEventListener('click', ()=> {
    console.log('addnew EL triggered')
    let newStockElement = document.createElement("div")
    newStockElement.classList.add("stock")
    
    let newSelectElement = document.createElement("select")

        listOfStockcodes.forEach((x, i) => {
            // console.log(x, i)
            let newOption = document.createElement("option")
            newOption.value = x['stockcode']
            newOption.innerHTML = x['company-name']
            newSelectElement.appendChild(newOption)
            
        });    
        
    newStockElement.appendChild(newSelectElement)
    

    let newH5 = document.createElement("h5");
    newH5.innerHTML = "comes default"
    newStockElement.appendChild(newH5)
    
    let newInputLow = document.createElement("input");
    newInputLow.type = "number";
    newInputLow.placeholder="0"
    newInputLow.className = "alarm-lowlimit";
    newStockElement.appendChild(newInputLow)


    let newInputHigh = document.createElement("input");
    newInputHigh.type = "number";
    newInputHigh.placeholder="0"
    newInputHigh.className = "alarm-highlimit";
    newStockElement.appendChild(newInputHigh)
    
    // console.log("newSelectElement.value : ", newSelectElement.value, "  ends here")

    //need to fix this.making the whole div text

    newStockElement.addEventListener('change',()=> {
        console.log("event listener triggered with: ",newSelectElement.value);
        offlineRefreshStockValue(
            newSelectElement.value, 
            newH5
        )}
        // console.log("event listener triggered with: ",newH5)
    );

        // console.log("later: ", newStockElement)
    // newStockElement.innerText = "Another stock"
    let target = document.getElementById("addnew")
    target.before(newStockElement)
})


// stockEl_one.addEventListener('select', ()=>{
//     selectedStocks.push(stockEl_one.selected)
// })

async function refreshStockValue(stockcode, valueToBeChanged, selectedStocks, stock){
    
    const res = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${stockcode}.IS?modules=price`)
    const data = await res.json()
    const stockvalue = data.quoteSummary.result[0].price.regularMarketPrice.raw
    
    if (selectedStocks) {selectedStocks = selectedStocks.map(
                        element => element.stock === stock 
                        ? {...element, stockcode: stockcode, stockvalue: stockvalue } 
                        : element);
        console.log("full array of selectedStocks:  ", selectedStocks)
    }
    changeValue(stockvalue, valueToBeChanged)
    
}

async function offlineRefreshStockValue(stockcode, valueToBeChanged, selectedStocks, stock){
    
    const stockvalue = "changed with refresh"
    
    if (selectedStocks) {selectedStocks = selectedStocks.map(
                        element => element.stock === stock 
                        ? {...element, stockcode: stockcode, stockvalue: stockvalue } 
                        : element);
        console.log("full array:  ", selectedStocks)
    }
    changeValue(stockvalue, valueToBeChanged)
    
}

function changeValue(stockvalue, valueToBeChanged){
    // console.log("stockvalue is", stockvalue, "value to be changed: ", valueToBeChanged)
    // console.log("innerHTML is", valueToBeChanged.innerHTML)
    valueToBeChanged.innerHTML = stockvalue
}

// function refreshValue(stockcode, valueToBeChanged){
//     console.log("stockcode is", stockcode, "value to be changed: ", valueToBeChanged)
//     let value = getStockValue(stockcode)
//     console.log("returned stockvalue is ", value)

//     if ( value !== undefined ) {
//         console.log("found stockvalue", value)
         
//     }
// }


// calculate()


//fetch stock prices and update DOM
// function calculate(){
    
//     const stock_one = stockEl_one.value; 
//     const stock_two = stockEl_two.value;
//     // console.log(stock_one, stock_two);
//     fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/AAPL?modules=price`)
//     .then(res=>res.json())
//     .then(data => {
//         console.log(data)
        // const price = data.price;
        // totalEl.innerText = ` TRY ${stock_one}`
        // amountEl_one.value = blablabla.toFixed(2)  //2 digits
    // })

    //     fetch(`https://finance.yahoo.com/quote/${stock_one}.IS?`)
    // .then(data => {
    //     console.log(data)
    // })





//             console.error(request.status, request.statusText);
//             console.log("fail!!!")

//             }
//         }
//     };
//     request.onerror = function (e) {
//         console.error(request.status, request.statusText);
//     };
//     request.send(null);  // not a POST request, so don't send extra data
// }
    





