"use strict";

var items = [
  {
    Image: "car1.jpg",
    Name: "Nissan-Magnite",
    Price: 2000,
    Id: 1,
  },
  {
    Image: "car2.jpg",
    Name: "Renault-Triber",
    Price: 3000,
    Id: 2,
  },
  {
    Image: "car3.jpg",
    Name: "Bharat-Benz",
    Price: 4000,
    Id: 3,
  },
  {
    Image: "car4.jpg",
    Name: "TATA -Nexon",
    Price: 5000,
    Id: 4,
  },
  {
    Image: "Renault.jpg",
    Name: "Maruti-Suzuki",
    Price: 5000,
    Id: 5,
  },
  {
    Image: "car6.jpg",
    Name: "JEEP",
    Price: 3000,
    Id: 6,
  },
  {
    Image: "car7.jpg",
    Name: "Toyota",
    Price: 2000,
    Id: 7,
  },
  {
    Image: "car8.jpg",
    Name: "Mahindra",
    Price: 4000,
    Id: 8,
  },
];
var temp = [];
items.map((e, i) =>
  temp.push(
    `<p>
               <img src=` +
      items[i].Image +
      `>
                    <br>` +
      items[i].Price +
      `
                    <br>` +
      items[i].Name +
      `
               <button type="button" onclick="addToCart(` +
      i +
      `)">Add to cart</button>
            </p>`
  )
);

document.getElementById("product").innerHTML = temp.join("");

var cartList = [];
var cartCount = 0;
function addToCart(index) {
  var newObj = {
    Image: items[index].Image,
    Name: items[index].Name,
    Price: items[index].Price,
    Id: items[index].Id,
    Qty: 1,
  };
  let isDuplicate = false;
  for (var j = 0; j < cartList.length; j++) {
    if (cartList[j].Id == newObj.Id) {
      isDuplicate = true;
      cartList[j].Qty += 1;
      cartList[j].Price += Number(newObj.Price);
    }
  }
  if (!isDuplicate) {
    cartList.push(newObj);
  }
  cartCount += 1;
  document.getElementById("empty").style.display = "block";
  document.getElementById("empty").innerHTML = cartCount;
}

var selectedProduct = [];
var total = 0;
function viewCart() {
  if (cartList.length != 0) {
    document.getElementById("product").innerHTML = " ";
    console.log(cartList);
    for (let i = 0; i < cartList.length; i++) {
      selectedProduct.push(
        `<p><img src=` +
          cartList[i].Image +
          `><br>` +
          cartList[i].Name +
          `<br>` +
          cartList[i].Price +
          `<br>QTY : ` +
          cartList[i].Qty +
          `<br><button type="button" onclick="deleteProduct(` +
          i +
          `)">Remove</button></p>`
      );
      document.getElementById("viewProduct").innerHTML =
        selectedProduct.join("");
      total = total + cartList[i].Price;
      document.getElementById("selectedProduct").innerHTML =
        "Total Amount = $ " + total;
    }
  } else {
    alert("Please select atleast one product");
  }
}

function deleteProduct(index) {
  var deleteCarts = [];
  var reducePrice = cartList[index].Price / cartList[index].Qty;

  // console.log('----------',reducePrice);
  if (cartList[index].Qty == 1) {
    cartList.splice(index, 1);
  } else {
    cartList[index].Price = cartList[index].Price - reducePrice;
    cartList[index].Qty = cartList[index].Qty - 1;
  }
  total = total - reducePrice;
  document.getElementById("selectedProduct").innerHTML =
    "Total Amount = $ " + total;
  cartCount -= 1;
  document.getElementById("empty").innerHTML = cartCount;

  for (let i = 0; i < cartList.length; i++) {
    deleteCarts.push(
      `<p><img src=` +
        cartList[i].Image +
        `><br>` +
        cartList[i].Name +
        `<br>` +
        cartList[i].Price +
        `<br>QTY : ` +
        cartList[i].Qty +
        `<br><button  type="button" onclick="deleteProduct(` +
        i +
        `)">Remove</button></p>`
    );
  }
  document.getElementById("viewProduct").innerHTML = deleteCarts.join("");

  if (cartCount < 1) {
    window.location.href = " ";
    // document.getElementById('empty').style.display = " none"
    // document.getElementById('selectedProduct').style.display = " none"
    //  document.getElementById('product').innerHTML = temp.join("")
  }
}
