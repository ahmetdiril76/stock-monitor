import jsonOfStockcodes  from './list-of-stockcodes.json' assert { type: "json" };
const listOfStockcodes = jsonOfStockcodes.BIST

// import { saveAs } from './FileSaver';

// console.log(listOfStockcodes)

// const stockEl_one = document.getElementById("stock-one")
// const lowlimitEl_one = document.getElementById("alarm-lowlimit-one")
// const highlimitEl_one = document.getElementById("alarm-highlimit-one")

// const stockEl_two = document.getElementById("stock-two")
// const lowlimitEl_two = document.getElementById("alarm-lowlimit-two")
// const highlimitEl_two = document.getElementById("alarm-highlimit-two")


const fileInput = document.getElementById('csv')
const readFile = () => {
  const reader = new FileReader()
  reader.onload = () => {
    document.getElementById('out').innerHTML = reader.result
  }
  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(fileInput.files[0])
}

fileInput.addEventListener('change', readFile)





const exportBtn = document.getElementById("export-btn")
exportBtn.addEventListener('click', ()=> {
    console.log('EXPORT INITIATED')
    exportData()
})

function exportData() {
    var data = '';
    for (var i=1;i<=2;i++) {
        var sep = '';
        for (var j=1;j<=4;j++) {
            data +=  sep + document.getElementById(i + '_' + j).value;
            sep = ',';
        }
        data += '\r\n';
    }
    var exportLink = document.createElement('a');
    exportLink.setAttribute('href', 'data:text/csv;base64,' + window.btoa(data));
    exportLink.appendChild(document.createTextNode('test.csv'));
    document.getElementById('results').appendChild(exportLink);
}







const totalEl = document.getElementById("total")
const calculateBtn = document.getElementById("calculate-total-btn")

const selectedStocks = [ {stock: 'stock_one'}, {stock: 'stock_two'} ]
const addNewBtn = document.getElementById("addnewbtn")
const manualRefreshBtn = document.getElementById("manual-refresh")
const saveToLocalStorageBtn = document.getElementById("save-to-local-storage")
const readFromLocalStorageBtn = document.getElementById("read-from-local-storage")


// stockEl_one.addEventListener('change',()=>{
//     let newStockName = document.getElementById("stock-one").value;
//     // selectedStocks.stock_one.stockName = newStockName
//     // console.log("selectedStocks:  ", selectedStocks)
//     // console.log("came here", newStockName);
//     refreshStockValue(
//         newStockName, 
//         document.getElementById("stockvalue-one"),
//         selectedStocks,
//         'stock_one'
//     )
    
    
// } 
    
// ); //it is a select list so we use change event

// stockEl_two.addEventListener('change', 
//     offlineRefreshStockValue(
//         document.getElementById("stock-two").value, 
//         document.getElementById("stockvalue-two")
//     )
// );

// stockEl_two.addEventListener('change', calculate);

// lowlimitEl_one.addEventListener('input', calculate); //input will be number or arrows
// highlimitEl_one.addEventListener('input', calculate); //input will be number or arrows
// lowlimitEl_two.addEventListener('input', calculate); //input will be number or arrows
// highlimitEl_two.addEventListener('input', calculate); //input will be number or arrows

calculateBtn.addEventListener('click', ()=> {
    // console.log('blabla')
})

manualRefreshBtn.addEventListener('click', ()=> {
    console.log('MANUAL REFRESH INITIATED')
})

// saveToLocalStorageBtn.addEventListener('click', ()=> {
//     console.log('SAVE TO LOCAL STORAGE INITIATED')
// })

readFromLocalStorageBtn.addEventListener('click', ()=> {
    console.log('READ FROM LOCAL STORAGE INITIATED')
    const stocksArrayFromLocalStorageString = JSON.parse(localStorage.getItem('stocksStringSaved'));
    console.log(stocksArrayFromLocalStorageString )

    if (stocksArrayFromLocalStorageString !== null && 
        stocksArrayFromLocalStorageString.length > 0) 
        {
        // populate browser from local Storage array
            console.log("SUCCESS")

            stocksArrayFromLocalStorageString.forEach((restoredStock, i) => {
                createStockElement(restoredStock)            
            });

        }
})

function createStockElement(restoredStock){
    let newStockElement = document.createElement("div")
    newStockElement.classList.add("stock")
    
    let newSelectElement = document.createElement("select")
    newSelectElement.classList.add("stock-select")

        listOfStockcodes.forEach((x, i) => {
            // console.log(x, i)
            let newOption = document.createElement("option")
            newOption.value = x['stockcode']
            newOption.innerHTML = x['company-name']
            newSelectElement.appendChild(newOption)
            
        });    
    newSelectElement.value = restoredStock.stockcode
    
    newStockElement.appendChild(newSelectElement)
    

    let newFetchedStockValue = document.createElement("h5");
    newFetchedStockValue.classList.add("fetched-stock-value")
    newFetchedStockValue.innerHTML = restoredStock['last-fetched-value']
    newStockElement.appendChild(newFetchedStockValue)
    
    let newInputLow = document.createElement("input");
    newInputLow.type = "number";
    newInputLow.value=restoredStock['alarm-low-limit']
    newInputLow.classList.add = "alarm-lowlimit";
    newStockElement.appendChild(newInputLow)


    let newInputHigh = document.createElement("input");
    newInputHigh.type = "number";
    newInputHigh.value=restoredStock['alarm-high-limit']
    newInputHigh.className = "alarm-highlimit";
    newStockElement.appendChild(newInputHigh)

    let newAlarm = document.createElement("h4");
    newAlarm.classList.add("current-alarm-value")
    newAlarm.innerHTML = restoredStock['alarm-value']
    newStockElement.appendChild(newAlarm)
    
    // console.log("newSelectElement.value : ", newSelectElement.value, "  ends here")

    //need to fix this.making the whole div text

    newStockElement.addEventListener('change',()=> {
        console.log("event listener triggered with: ",newSelectElement.value);
        offlineRefreshStockValue(
            newSelectElement.value, 
            newFetchedStockValue
        )}
        // console.log("event listener triggered with: ",newH5)
    );

        // console.log("later: ", newStockElement)
    // newStockElement.innerText = "Another stock"
    let target = document.getElementById("addnew")
    target.before(newStockElement)

}


saveToLocalStorageBtn.addEventListener('click', ()=> {
    let allListedStocks = document.querySelectorAll(".stock")

    // let csvContent = "data:text/csv;charset=utf-8;";
    let stocksArray = []

    allListedStocks.forEach((currentStock,i) => {
        // console.log(currentStock)
        let currentSelect = currentStock.getElementsByTagName("select")[0]
        // console.log(currentSelect)
        let currentStockCode = currentSelect.value  
        // console.log(currentStockCode)
        let currentStockName = currentSelect.options[currentSelect.selectedIndex].text
        // console.log(currentStockName)
        let currentFetchedValue = currentStock.getElementsByTagName("h5")[0].innerHTML
        // console.log(currentFetchedValue)
        let currentAlarmLowLimit = currentStock.getElementsByTagName("input")[0].value
        // console.log(currentAlarmLowLimit)
        let currentAlarmHighLimit = currentStock.getElementsByTagName("input")[1].value
        // console.log(currentAlarmHighLimit)
        let currentAlarmValue = currentStock.getElementsByTagName("h4")[0].innerHTML
        // console.log(currentAlarmValue)

        let rowJson = {
            "stockcode": currentStockCode, 
            "company-name": currentStockName,
            "last-fetched-value": currentFetchedValue,
            "alarm-low-limit": currentAlarmLowLimit,
            "alarm-high-limit": currentAlarmHighLimit,
            "alarm-value": currentAlarmValue            
        }
        
        // let row = rowArray.join(";");
        // csvContent += row + "\r\n";        
        stocksArray.push(rowJson)

    })
    console.log("stocksArray: ", stocksArray)
    // let stocksString = stocksArray.toString();
    let stocksString = JSON.stringify(stocksArray)
    console.log("stocksString: ", stocksString);
    // console.log("stocksString: ",stocksString.substring(2,10));
    // localStorage.removeItem('stocksString');
    localStorage.setItem('stocksStringSaved', stocksString);
    // // saveAs( csvContent, "myString.txt" );


    // let stocksArrayToSave = [...allListedStocks] 
    // console.log(stocksArrayToSave[1])
    // localStorage.setItem('stocksArraySavedString', JSON.stringify(stocksArrayToSave))

    

})



addNewBtn.addEventListener('click', ()=> {
    console.log('addnew EL triggered')
    let newStockElement = document.createElement("div")
    newStockElement.classList.add("stock")
    
    let newSelectElement = document.createElement("select")
    newSelectElement.classList.add("stock-select")

        listOfStockcodes.forEach((x, i) => {
            // console.log(x, i)
            let newOption = document.createElement("option")
            newOption.value = x['stockcode']
            newOption.innerHTML = x['company-name']
            newSelectElement.appendChild(newOption)
            
        });    
        
    newStockElement.appendChild(newSelectElement)
    

    let newFetchedStockValue = document.createElement("h5");
    newFetchedStockValue.classList.add("fetched-stock-value")
    newFetchedStockValue.innerHTML = "comes default"
    newStockElement.appendChild(newFetchedStockValue)
    
    let newInputLow = document.createElement("input");
    newInputLow.type = "number";
    newInputLow.placeholder="0"
    newInputLow.classList.add = "alarm-lowlimit";
    newStockElement.appendChild(newInputLow)


    let newInputHigh = document.createElement("input");
    newInputHigh.type = "number";
    newInputHigh.placeholder="0"
    newInputHigh.className = "alarm-highlimit";
    newStockElement.appendChild(newInputHigh)

    let newAlarm = document.createElement("h4");
    newAlarm.classList.add("current-alarm-value")
    newAlarm.innerHTML = "NO"
    newStockElement.appendChild(newAlarm)
    
    // console.log("newSelectElement.value : ", newSelectElement.value, "  ends here")

    //need to fix this.making the whole div text

    newStockElement.addEventListener('change',()=> {
        console.log("event listener triggered with: ",newSelectElement.value);
        offlineRefreshStockValue(
            newSelectElement.value, 
            newFetchedStockValue
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
    





