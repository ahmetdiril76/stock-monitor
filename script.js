import jsonOfStockcodes  from './list-of-stockcodes.json' assert { type: "json" };
const listOfStockcodes = jsonOfStockcodes.BIST
console.log(listOfStockcodes)

const toggle = document.getElementById("toggle")
const close = document.getElementById("close")
const open = document.getElementById("open")
const modal = document.getElementById("modal")

//Toggle nav
toggle.addEventListener('click', ()=> {
    document.body.classList.toggle('show-nav')
})

//Show modal
open.addEventListener('click', ()=>{
    modal.classList.add('show-modal')
})

//Hide modal
close.addEventListener('click', ()=>{
    modal.classList.remove('show-modal')
})

//Hide modal on outside click
window.addEventListener('click', e => 
    e.target == modal ? modal.classList.remove('show-modal') : false)

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
    console.log("selectedStocks:  ", selectedStocks)
    console.log("came here", newStockName);
    offlineRefreshStockValue(
        newStockName, 
        document.getElementById("stockvalue-one"),
        selectedStocks,
        'stock_one'
    )
    
    
} 
    
); //it is a select list so change event

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
    console.log('blabla')
})



addNewBtn.addEventListener('click', ()=> {
    console.log('addnew')
    let newStockElement = document.createElement("div")
    newStockElement.classList.add("stock")
    
    let newSelectElement = document.createElement("select")

    listOfStockcodes.forEach((x, i) => {
        console.log(x, i)
        let newOption = document.createElement("option")
        newOption.value = x['stockcode']
        newOption.innerHTML = x['company-name']
        newSelectElement.appendChild(newOption)
        
    });

    // let option_1 = document.createElement("option")
    // option_1.value = "ASELS"
    // option_1.innerHTML = "ASELSAN"
    // newSelectElement.appendChild(option_1)

    
    // let option_2 = document.createElement("option")
    // option_2.value = "GARAN"
    // option_2.innerHTML = "Garanti Bank"
    // newSelectElement.appendChild(option_2)
    // console.log(newSelectElement)

    newStockElement.appendChild(newSelectElement)
    console.log(newStockElement)
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
        console.log("full array:  ", selectedStocks)
    }
    changeValue(stockvalue, valueToBeChanged)
    
}

async function offlineRefreshStockValue(stockcode, valueToBeChanged, selectedStocks, stock){
    
    const stockvalue = 77.77
    
    if (selectedStocks) {selectedStocks = selectedStocks.map(
                        element => element.stock === stock 
                        ? {...element, stockcode: stockcode, stockvalue: stockvalue } 
                        : element);
        console.log("full array:  ", selectedStocks)
    }
    changeValue(stockvalue, valueToBeChanged)
    
}

function changeValue(stockvalue, valueToBeChanged){
    console.log("stockvalue is", stockvalue, "value to be changed: ", valueToBeChanged)
    console.log("innerHTML is", valueToBeChanged.innerHTML)
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
    





