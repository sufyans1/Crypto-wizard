const Btc = document.getElementsByClassName('BTC');
const Eth = document.getElementsByClassName('ETH');
const Bnb = document.getElementsByClassName('BNB');
const TableDiv = document.getElementById('Coinlist');
// Variables to store data and last prices
let dummyData;
let LastPriceBtc = 0;
let LastPriceBnb = 0;
let LastPriceEth = 0;

console.log(typeof(dummyData))
console.log(Btc[1]);
const getListUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
function LoadTable(data) {
    dummyData = data;
    console.log(LastPriceBnb);
    // Update BTC element with data
    Btc[1].src = data[0].image;
    Btc[3].innerHTML = data[0].current_price + ' $';
    // Apply color based on price change
    if (data[0].current_price < LastPriceBtc) {
        Btc[3].style.color = "red";
    } else if (data[0].current_price > LastPriceBtc) {
        Btc[3].style.color = "green";
    }
    LastPriceBtc = data[0].current_price;
    // Update ETH element with data
    Eth[1].src = data[1].image;
    Eth[3].innerHTML = data[1].current_price + ' $';
    if (data[1].current_price < LastPriceEth) {
        Eth[3].style.color = "red";
    } else if (data[1].current_price > LastPriceEth) {
        Eth[3].style.color = "green";
    }
    LastPriceEth = data[1].current_price;
        // Update BNB element with data
    Bnb[1].src = data[3].image;
    Bnb[3].innerHTML = data[3].current_price + ' $';

    if (data[3].current_price < LastPriceBnb) {
        Bnb[3].style.color = "red";
    } else if (data[3].current_price > LastPriceBnb) {
        Bnb[3].style.color = "green";
    }
    LastPriceBnb = data[3].current_price;
    console.log(LastPriceBnb);
    // Generate HTML table dynamically
    let Table = "<table class='coinlistt' id='CoinListTable' style='color:white;'><thead class='sticky-table'><tr><th>#</th><th>Rank</th><th>Coin</th><th>Name</th><th>Ticker</th><th>Price</th><th>24h high</th><th>24h low</th><th>All time high</th><th>Market cap</th></tr></thead><tbody>";
    for (i = 0; i < data.length; i ++) {
        Table += `<tr><td>${
            i + 1
        }</td><td>${
            data[i].market_cap_rank
        }</td><td><img src="${
            data[i].image
        }" alt="CoinImage" style='height:5vh; width:auto;'></td><td>${
            data[i].name
        }</td> <td>${
            data[i].symbol
        }</td>`;
                // Apply color to current price based on comparison with last price
        if (data[i].current_price < LastPrice) {
            Table += `<td style='color:red;'>${
                data[i].current_price
            } $</td>`;
        } else if (data[i].current_price > LastPrice) {
            Table += `<td style='color:green;'>${
                data[i].current_price
            } $</td>`;
        } else {
            Table += `<td>${
                data[i].current_price
            } $</td>`;
        } Table += `<td>${
            data[i].high_24h
        } $</td><td>${
            data[i].low_24h
        } $</td><td>${
            data[i].ath
        } $</td><td>${
            data[i].market_cap
        } $</td></tr>`;
        var LastPrice = data[i].current_price;
    }
    Table += '</tbody></table>';
    $('#coinTable').html(Table);
    $('#CoinListTable').DataTable();

}
function LoadCoinList() {
    console.log('1');
    $.ajax({
        url: getListUrl,
        method: 'GET',
        crossDomain: true,
        success: function (data) {
            dummyData = data;
            LoadTable(data)
        },
        error: function () {
            LoadTable(dummyData);
            console.log('something went wrong');
        }
    })
}
$(document).ready(function () {
    LoadCoinList();
});
// Update the table every 20 seconds
setInterval(() => {
    LoadCoinList();
}, 20000);

