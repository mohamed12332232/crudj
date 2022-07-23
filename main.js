// get elements form documet
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let tbody = document.getElementById('tbody')
let deleteAll = document.getElementById("deleteAll");
let searchBlock = document.querySelector(".searchBlock");

let mode = "create";

let test;

// let deleteAll = document.getElementById("deleteAll");


// get total


function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value)
        -  +discount.value;
        total.innerHTML = result;
        total.style.background = "green"
    }else{
        total.innerHTML = ""
        total.style.background = "rgba(134, 0, 0, 0.644)";
    }
}


// create product

let product;

if (localStorage.product != null) {
    product = JSON.parse(localStorage.product);
}else{
    product =[]
}
//save  product in local storage



// create product
submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (
      title.value != "" &&
      price.value != "" &&
      category.value != "" &&
      taxes.value != "" &&
      ads.value != "" &&
      count.value != "" &&
      count.value < 50
    ) {
      if (mode === "create") {
        // count
        if (count.value > 1) {
          for (let i = 0; i < count.value; i++) {
            product.push(newProduct);
          }
        } else {
          product.push(newProduct);
        }
      } else {
        product[test] = newProduct;
        mode = "create";
        submit.innerHTML = "create";
        count.style.display = "block";
        searchBlock.style.display = "block";
      }
      clearData();
    }
    localStorage.setItem("product", JSON.stringify(product));
    showData();
    getTotal()
}















// clear inputs
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML=''
    count.value = ''
    category.value = ''
}

// read
function showData() {

    getTotal()
    
    let table = '';
    for (let i = 0; i < product.length; i++){
        
        table += `
        <tr>
        
        <td>${i}</td>
        <td>${product[i].title}</td>
        <td>${product[i].price}</td>
        <td>${product[i].taxes}</td>
        <td>${product[i].ads}</td>
        <td>${product[i].discount}</td>
        <td>${product[i].total}</td>
        <td>${product[i].category}</td>
        <td><button id="update" class="button" onclick="update_data(${i})">upate</button></td>
        <td><button id="delete" class="button" onclick = "delete_product(${i})" >delete</button></td>
        
        </tr>
        `;
        
        tbody.innerHTML = table; 
        
        if (product.length > 0) {
            deleteAll.innerHTML = `<button class="button" onclick = "delete_all()">delete all( ${product.length} product)</button>`;
        } else {
            deleteAll.innerHTML = "";
            
        }
    }
}
showData();

// delete

function delete_product(i) {
    
    product.splice(i,1)
    
    localStorage.product = JSON.stringify(product);

    showData();
    
}


// delete all
function delete_all() {
  localStorage.clear();
  product.splice(0)
  showData();
  tbody.innerHTML = "";
  location.reload();

}



//  uptate

function update_data(i) {
    title.value = product[i].title;
    price.value = product[i].price;
    taxes.value = product[i].taxes;
    ads.value = product[i].ads;
    discount.value = product[i].discount;
    category.value = product[i].category;
    getTotal()
    count.style.display = "none"
    searchBlock.style.display = "none"
    
    submit.innerHTML = "update"

    mode = "update"

    test = i;
    screen({

        top: 0,
        behavior: "smooth"
    })

    

}



// search

let search_mode = "title"

function get_search_mode(id) {
    let search = document.getElementById("search");
    if (id === "seacrh_title") {
        search_mode = "title";
    } else {
        search_mode = "category";
    }
    search.placeholder = "search by " + search_mode
    
    search.focus()
    search.value = '';
    showData()


}
function search_products(value) {

    let table = '';

    if (search_mode == "title") {

        for (let i = 0; i < product.length; i++) {
            
            if (product[i].title.includes(value.toLowerCase())) {

                table += `
                            <tr>
                            
                            <td>${i+1}</td>
                            <td>${product[i].title}</td>
                            <td>${product[i].price}</td>
                            <td>${product[i].taxes}</td>
                            <td>${product[i].ads}</td>
                            <td>${product[i].discount}</td>
                            <td>${product[i].total}</td>
                            <td>${product[i].category}</td>
                            <td><button id="update" class="button" onclick="update_data(${i})">upate</button></td>
                            <td><button id="delete" class="button" onclick = "delete_product(${i})" >delete</button></td>
                            
                            </tr>
                            `;
                
                            
                        }
                    }
                    
                    
                } else {
                    for (let i = 0; i < product.length; i++) {
                        
                        if (product[i].category.includes(value.toLowerCase())) {
                            table += `
                                        <tr>
                                        
                                        <td>${i}</td>
                                        <td>${product[i].title}</td>
                                        <td>${product[i].price}</td>
                                        <td>${product[i].taxes}</td>
                                        <td>${product[i].ads}</td>
                                        <td>${product[i].discount}</td>
                                        <td>${product[i].total}</td>
                                        <td>${product[i].category}</td>
                                        <td><button id="update" class="button" onclick="update_data(${i})">upate</button></td>
                                        <td><button id="delete" class="button" onclick = "delete_product(${i})" >delete</button></td>
                                        
                                        </tr>
                                        `;
                            
                                        
                                    }
                                }
                    
                }
                tbody.innerHTML = table; 
            }


// clean data





