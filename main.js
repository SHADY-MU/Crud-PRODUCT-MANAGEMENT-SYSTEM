let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discont = document.getElementById('discont');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let count = document.getElementById('count');
let categroy = document.getElementById('categroy');
let sumbit = document.getElementById('sumbit');

let mood = 'create';
let tmp;
// get total

function getTotal()
{
    if(price.value != "" ){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discont.value;
         total.innerHTML = result;
         total.style.background = "#040"
    }
    else{
        total.innerHTML = "";
        total.style.background = "#a00d02"
    }
}
// create product
let dataPro;
if(localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product);
}
else
{
    dataPro = [];
}

sumbit.onclick = function()
{
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value.toLowerCase(),
        taxes: taxes.value.toLowerCase(),
        ads: ads.value.toLowerCase(),
        discont: discont.value.toLowerCase(),
        total:total.innerHTML,
        count: count.value.toLowerCase(),
        categroy: categroy.value.toLowerCase()
    }
    if(  title.value != ""
         && categroy.value != "" 
         && price.value > 0
         && newPro.count <= 100){
        if( mood === 'create')
        {

        if(newPro.count > 1){
            for(let x = 0; x < newPro.count; x++){
                dataPro.push(newPro);
            }
        }
        else{
            dataPro.push(newPro);
        }
        }else{
        dataPro[    tmp    ] = newPro;
        mood = 'create';
        sumbit.innerHTML = 'Create';
        count.style.display = "block";
        }
         clearData();
    }
    
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
    
}
showData();
// clear inputs
function clearData()
{
    title.value = ""
    price.value = ""
    ads.value = ""
    taxes.value = ""
    discont.value = ""
    count.value = ""
    categroy.value = ""
    total.innerHTML = ""
}
// read
function showData() {
    getTotal();
    let table = "";

    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discont}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].categroy}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataPro.length > 0)
    {
        btnDelete.innerHTML = `
        <button onclick ="deleteAll()">Delete All ${dataPro.length}</button><
        `
    }
    else{
        btnDelete.innerHTML = "";
    }
}


// delete
function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
// count

// updata
function updateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discont.value = dataPro[i].discont;
    getTotal();
    count.style.display = 'none';
    categroy.value = dataPro[i].categroy;
    sumbit.innerHTML = 'Updata'
    mood = 'upata'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    
}
// search
let searchMood = 'Title';

function getSearchMod(id)
{
    let search = document.getElementById('search');
    if(id == 'seachTitle'){
        searchMood = 'Title';
    }
    else
    {
        searchMood = 'Categroy'
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}
function searchData(value)
{
    let table = '';
    for(let i = 0; i < dataPro.length; i++)
    {
        if(searchMood == 'Title')
        {
            
                if(dataPro[i].title.includes(value.toLowerCase())){
                    table += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discont}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].categroy}</td>
                            <td><button onclick="updateData(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                        </tr>`;
                }
            
        }
        else
        {
                
                    if(dataPro[i].categroy.includes(value.toLowerCase())){
                        table += `<tr>
                                <td>${i + 1}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discont}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].categroy}</td>
                                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                            </tr>`;
                    }
                
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// clean data