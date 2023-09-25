
let image = document.getElementById("image");
let file = document.getElementById("file");
let btn = document.querySelector('.btn');
let btnForm = document.querySelector('.btn__form');
let btnTable = document.querySelector('.btn__table');
let wrap = document.querySelector('.wrapper');
let cancel = document.querySelector('.cancel');
let submit = document.querySelector('.submit');
let form = document.querySelector('form');
let input = document.querySelector('input');
let valid = form.querySelectorAll('.valid');
let table = document.querySelector('.table-search');
let search = document.querySelector('.search');
let tbody = document.querySelector('tbody');



function openForm() {
  removeError();
  wrap.style.visibility = 'visible';
  btn.style.visibility = 'hidden';
}
function openTable() {
  btn.style.visibility = 'hidden';
  table.style.visibility = 'visible';
  dataGet('')
}
function cancelForm() {
  wrap.style.visibility = 'hidden';
  btn.style.visibility = 'visible';
}

function down() {
  file.click();

  document.getElementById('file').addEventListener('change', function() {
    if (this.files && this.files[0]) {
      let reader = new FileReader();
        reader.onload = function (e) {
        document.getElementById('image').setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
      image.style.zIndex = 2;
    }
  });
}

function remov() {
  image.src = './image/photo.png';
  image.style.zIndex = 0;
}

function removeError() {
  let errors = form.querySelectorAll('.error');

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

function validation() {
  form.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();
  removeError();
  
  for (let i = 0; i < valid.length; i++) {
    if (!valid[i].value) {
      let error = document.createElement('div')
      error.className='error'
      error.style.color = 'red'
      error.style.marginLeft = '-160px'
      error.innerHTML = 'Заполните поля'
      form[i].parentElement.insertBefore(error, valid[i])
    }else {
      form.submit()
    }
  }
  })
}

function chengeValue() {
  if(search.value.length >=3 || search.value === '')
    dataGet(search.value)
}

async function dataGet(inputValue) {
  tbody.innerHTML = null
  if (inputValue.length < 3) {
    inputValue = '';
  }
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${inputValue}`);
    const data = await response.json();
    addTable(data)
  } catch (error) {
    console.error('Ошибка:', error);
  }
}


function addTable(users) {
  for (let user of users) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.textContent = user.body;
    tr.appendChild(td1);
    let td2 = document.createElement('td');
    td2.textContent = user.id;
    tr.appendChild(td2);
    let td3 = document.createElement('td');
    td3.textContent = user.title;
    tr.appendChild(td3);
    let td4 = document.createElement('td');
    td4.textContent = user.userId;
    tr.appendChild(td4);
    
    tbody.appendChild(tr);
  }
}
localStorage.setItem('stateBody', 1);
localStorage.setItem('stateId', 1);
localStorage.setItem('stateTitle', 1);
localStorage.setItem('stateUserId', 1);

function sortTable(number, props) {
  let sortRows = Array.from(tbody.rows);
  let state = +localStorage.getItem(`${props}`)
  if(state){
    localStorage.setItem(`${props}`, 0);
    if(number === 0 || number === 2){
      console.log(1);
      sortRows.sort((a, b) =>  a.cells[number].innerHTML < b.cells[number].innerHTML ? -1 : 1)
    }else{
      console.log(2);
      sortRows.sort((a, b) =>  a.cells[number].innerHTML - b.cells[number].innerHTML)
    }  
  }else{
    localStorage.setItem(`${props}`, 1);
    if(number === 0 || number === 2){
      console.log(3);
      sortRows.sort((a, b) =>  b.cells[number].innerHTML < a.cells[number].innerHTML ? -1 : 1)
    }else{
      console.log(4);
      sortRows.sort((a, b) =>  b.cells[number].innerHTML - a.cells[number].innerHTML)
    }
     
  }
  tbody.append(...sortRows)
}

function sortBody() {
  sortTable(0,'stateBody')
}
function sortId() {
  sortTable(1,'stateId')
}
function sortTitle() {
  sortTable(2,'stateTitle')
}
function sortUserId() {
  sortTable(3,'stateUserId')
}





