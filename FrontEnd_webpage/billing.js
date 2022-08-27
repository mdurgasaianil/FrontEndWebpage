//----------------------------------------------------------Billing Screen ----------------------------------------------
function displayBill(){
  console.log("Hi billing_Screen");
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems)
  if (cartItems) {
    console.log("came to if loop");
    let table = document.getElementById("bill_table");
    Object.values(cartItems).map(item => {
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = item.id;
      cell2.innerHTML = item.name;
      cell3.innerHTML = item.price;
      cell4.innerHTML = item.incart;
      cell5.innerHTML = item.incart * item.price;
    })
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell4.innerHTML = "GST"
    let cartCostbill = localStorage.getItem('totalCost')
    cartCostbill = parseInt(cartCostbill)
    let tax = 0.05 * cartCostbill
    cell5.innerHTML = tax;
    let row1 = table.insertRow(-1);
    let cell6 = row1.insertCell(0);
    let cell7 = row1.insertCell(1);
    let cell8 = row1.insertCell(2);
    let cell9 = row1.insertCell(3);
    let cell10 = row1.insertCell(4);
    cell9.innerHTML = "Total Amount to be paid"
    cell10.innerHTML = cartCostbill + tax;
    let row2 = table.insertRow(-1);
    let cell11 = row2.insertCell(0);
    cell11.innerHTML = `<a href="index.html" title="return to product page" class="goback" onclick="clearprod()"><ion-icon name="arrow-undo"></ion-icon> Return to Product page</a>`
  }
}
displayBill()
let datetime = new Date();
console.log(datetime);
document.getElementById("time").textContent = "Bill generated date and time: "+datetime;

function clearprod(){
  localStorage.removeItem("productsInCart");
  localStorage.removeItem("totalCost");
  localStorage.removeItem("cartNumbers");
}
