let products = {
  "0011":{id:"0011",name:"Apple",tag:"Apple",price:50,incart:0},
  "0012":{id:"0012",name:"guava",tag:"guava",price:50,incart:0},
  "0013":{id:"0013",name:"Banana",tag:"Banana",price:50,incart:0},
  "0014":{id:"0014",name:"Jack Fruit",tag:"Jack Fruit",price:50,incart:0},
  "0015":{id:"0015",name:"Potato",tag:"Potato",price:50,incart:0},
  "0016":{id:"0016",name:"Carrot",tag:"Carrot",price:50,incart:0},
  "0017":{id:"0017",name:"Tomato",tag:"Tomato",price:50,incart:0},
  "0018":{id:"0018",name:"Beatroot",tag:"Beatroot",price:50,incart:0},
  "0019":{id:"0019",name:"Oninon",tag:"Oninon",price:50,incart:0},
  "0020":{id:"0020",name:"Chilly",tag:"Chilly",price:50,incart:0}
}
//-----------------------------------------------------//
let code = document.forms['prod_form']['code'];
// let code_error = document.getElementById('code_error')
// function code_verify(){
//   if(code.value.length == 4){
//     code.style.border = "1px solid silver";
//     code_error.style.display = "none";
//     return true;
//   }
// }
// code.addEventListener("textInput",code_verify);
//----------------------------------------------------//
function find(){
  for(let key in products){
    if (key==code.value) {
      // let s = products[key].name+" Added to cart"
      //   alert(s);
        return products[key]
    }
    }
  alert("Product Not Found")
  return false
}
//------------------------------------------------------//
function validated(){
  if(code.value.length < 4 || code.value.length > 4){
    // code.style.border = "1px solid red";
    // code_error.style.display = "block";
    // code.focus();
    return false;
  }
  if (code.value.length == 4) {
    return true
  }
}
function cartNumbers(){
  if (validated()) {
    let obj = find()
  if (obj) {
    if (setItems(obj)) {
      let stri = obj.name+" Added to cart"
        alert(stri);
      totalCost(obj)
      let productNumbers = localStorage.getItem('cartNumbers')
      productNumbers = parseInt(productNumbers)
      if (productNumbers) {
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart_icon span').textContent = productNumbers + 1;
        code.value = "";
        window.location.href = "index.html";
        return false
      }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart_icon span').textContent = 1;
        code.value = "";
        window.location.href = "index.html";
        return false
      }
    }
  }
}
}

// function removeItems(product){
//   let cartItems = localStorage.getItem('productsInCart')
// }
function setItems(product){
  let cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)
  if (cartItems != null && Object.keys(cartItems).length < 5) {
    if (cartItems[product.tag] == undefined) {
          cartItems = {
            ...cartItems,
            [product.tag]:product
          }
          cartItems[product.tag].incart += 1
    }
    else {
      alert("Product already added to cart")
      return false
    }
  }else if(cartItems != null && Object.keys(cartItems).length == 5) {
    alert("Product Limit Reached Please increase the quantity")
    // generate_bill()
    return false
  }
  else {
      product.incart=1
      cartItems={
        [product.tag]:product
      }
}
localStorage.setItem("productsInCart",JSON.stringify(cartItems))
return true
}
// Sending selected objects into localStorage
// function setItems(product){
//   let cartItems = localStorage.getItem('productsInCart')
//   cartItems = JSON.parse(cartItems)
//   if (cartItems != null) {
//     if (cartItems[product.tag] == undefined) {
//       cartItems = {
//         ...cartItems,
//         [product.tag]:product
//       }
//     }
//     cartItems[product.tag].incart += 1
//   }else {
//     product.incart=1
//     cartItems={
//       [product.tag]:product
//     }
//   }
// localStorage.setItem("productsInCart",JSON.stringify(cartItems))
// }

function onLoadCartnumbers(){
  let productNumbers = localStorage.getItem('cartNumbers')
  if (productNumbers) {
    document.querySelector('.cart_icon span').textContent = productNumbers
  }
}
function totalCost(product){
  let cartCost = localStorage.getItem('totalCost')
  if (cartCost != null) {
    cartCost = parseInt(cartCost)
    localStorage.setItem("totalCost",cartCost+product.price)
  }else {
    localStorage.setItem("totalCost",product.price)
  }
}
function displayCart(){
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems)
  if (cartItems) {
    let table = document.getElementById("mytable");
    Object.values(cartItems).map(item => {
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      // onclick="removeItems()"
      cell1.innerHTML = `<button class="remove_button" title="Remove Item" type="button"><ion-icon name="close-sharp" class="remove"></ion-icon>${item.id}</button>`;
      cell2.innerHTML = item.name;
      cell3.innerHTML = item.price;
      cell4.innerHTML = `<input type="number" name="${item.id}" class="quantity" value=${item.incart} min="1">`;
      cell5.innerHTML = item.incart * item.price;
    })
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell4.innerHTML = "Grand Total"
    let cartCost = localStorage.getItem('totalCost')
    cell5.innerHTML = cartCost;
  }

  // let productContainer = document.querySelector(".table_row")
  // if (cartItems && productContainer) {
  //   productContainer.innerHTML = '';
  //   Object.values(cartItems).map(item => {
  //     let row = productContainer.insertRow(0)
  //
  //     productContainer.innerHTML += `
  //     <tr><td>${item.id}<td></tr>
  //     `
  //   })
  // }
}

//--------------------------------Removing Items ------------------------------------------------
displayCart()
onLoadCartnumbers()
let carts = document.getElementsByClassName('remove_button')
// console.log(carts);
for (let i = 0; i < carts.length; i++) {
  let but = carts[i]
  but.addEventListener('click',function(event) {
    for(let key in products){
      if (key == event.target.textContent) {
        let cartCost2 = localStorage.getItem('totalCost')
        cartCost2 = parseInt(cartCost2)
        let productNumbers2 = localStorage.getItem('cartNumbers')
        productNumbers2 = parseInt(productNumbers2)
        let cartItems2 = localStorage.getItem('productsInCart')
        cartItems2 = JSON.parse(cartItems2)
        let value = products[key].tag
        for (let key2 in cartItems2){
          if(key2 == value){
            // localStorage.setItem("totalCost",cartCost2-cartItems2[key2].price)
            delete cartItems2[key2];
            localStorage.setItem('cartNumbers',productNumbers2-1);
            let priceTotal2 = 0
            for (let key10 in cartItems2){
              priceTotal2 += cartItems2[key10].incart * cartItems2[key10].price
            }
            localStorage.setItem("totalCost",priceTotal2)
            localStorage.setItem("productsInCart",JSON.stringify(cartItems2))
            alert("removed from cart")
            window.location.href = "index.html";
          }
        }
      }
    }
  })
}
//--------------------------------Increasing and Decreasing the Quantity ---------------------------
let quantity_input = document.getElementsByClassName('quantity')
for (let i = 0; i < quantity_input.length; i++) {
  let inputQ = quantity_input[i]
  inputQ.addEventListener('change',function(event){
    let quan_name = event.target.name;
    for(let key4 in products){
      if (key4 == event.target.name) {
        let cartCost3 = localStorage.getItem('totalCost')
        cartCost3 = parseInt(cartCost3)
        let cartItems3 = localStorage.getItem('productsInCart')
        cartItems3 = JSON.parse(cartItems3)
        let quan_item = products[key4].tag
        for (let key5 in cartItems3){
          if(key5 == quan_item){
            cartItems3[key5].incart = event.target.value
            localStorage.setItem("productsInCart",JSON.stringify(cartItems3))
            let priceTotal = 0
            for (let key6 in cartItems3){
              priceTotal += cartItems3[key6].incart * cartItems3[key6].price
            }
            localStorage.setItem("totalCost",priceTotal)
            // alert("removed from cart")
            window.location.href = "index.html";
          }
        }
      }
    }
  })
}
//--------------------------------Generating Bill ---------------------------------------
function generate_bill(){
  // let bill_form = document.getElementsByClassName("bill_form")
  // bill_form.style.display="block"
  let bill_table = document.getElementById("bill_table");
  let row = bill_table.insertRow(0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = "GST(5% on total price)"
  let cartCostbill = localStorage.getItem('totalCost')
  cartCostbill = parseInt(cartCostbill)
  let tax = 0.05 * cartCostbill
  cell2.innerHTML = tax
  let row1 = bill_table.insertRow(1);
  let cell3 = row1.insertCell(0);
  let cell4 = row1.insertCell(1);
  cell3.innerHTML = "VAT"
  cell4.innerHTML = "0.00"
  let row2 = bill_table.insertRow(2);
  let cell5 = row2.insertCell(0);
  let cell6 = row2.insertCell(1);
  cell5.innerHTML = "Delivery"
  cell6.innerHTML = "0.00"
  let row3 = bill_table.insertRow(3);
  let cell7 = row3.insertCell(0);
  let cell8 = row3.insertCell(1);
  cell7.innerHTML = "Total"
  cell8.innerHTML = cartCostbill + tax
  let row4 = bill_table.insertRow(4);
  let cell9 = row4.insertCell(0);
  let cell10 = row4.insertCell(1);
  cell9.innerHTML = `<a href="billing_Screen.html"><button class="Bill">Generate Bill</button></a>`
  // cell10.innerHTML = cartCostbill + tax
}
generate_bill()
