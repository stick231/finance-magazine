document.getElementById("button").addEventListener("click", () => {
  let Summa = document.getElementById("valueSumma").value;
  let radio = document.querySelector('input[type=radio]:checked').value;
  let Category = document.getElementById("Category").value;
      
  AddList(Summa, radio, Category);
  saveDataToLocalStorage(Summa, radio, Category, count);

  if (radio === 'income') {
    updateTotalIncome(Summa);
  } else {
    updateTotalExpenses(Summa);
  }
});

let count = 0;
let totalIncome = 0;
let totalExpenses = 0;

function AddList(Summa, radio, Category) {
  count++;
  let List = document.getElementById("List");
  let DivList = document.createElement('div');
  DivList.classList.add('List');

  let countList = document.createElement("span");
  countList.textContent = count + '.';

  let SummaList = document.createElement("span");
  if (radio === 'income') {
    SummaList.textContent = `+ ${Summa}₽`;
    DivList.style.backgroundColor = "#1b4332";
  } else {
    SummaList.textContent = `- ${Summa}₽`;
    DivList.classList.add('ListM');
    DivList.style.backgroundColor = "red";
  }

  let CategoryList = document.createElement("span");
  CategoryList.textContent = `${Category}`;

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "✖";
  deleteButton.classList.add("deleteButton")
  deleteButton.addEventListener("click", () => {
    List.removeChild(DivList);
    removeFromLocalStorage(Summa, radio, Category);
    if (radio === 'income') {
      updateTotalIncome(-parseInt(Summa));
    } else {
      updateTotalExpenses(-parseInt(Summa));
    }
    updateTotalBalance();
  });

  let editButton = document.createElement("button");
  editButton.textContent = "⚙️";
  editButton.addEventListener("click", () => {
    ChangeList(parseInt(countList.textContent), Summa, radio, Category);
  });

  DivList.appendChild(countList);
  DivList.appendChild(SummaList);
  DivList.appendChild(CategoryList);
  DivList.appendChild(deleteButton);
  DivList.appendChild(editButton);

  List.appendChild(DivList);
}

function saveDataToLocalStorage(Summa, radio, Category, count) {
  let data = {
    Summa: Summa,
    radio: radio,
    Category: Category,
    count: count
  };

  let newData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
  newData.push(data);
  localStorage.setItem("data", JSON.stringify(newData));
  location.reload();
}

function removeFromLocalStorage(Summa, radio, Category) {
  let storedData = JSON.parse(localStorage.getItem("data"));
  let newData = storedData.filter(item => !(item.Summa === Summa && item.radio === radio && item.Category === Category));
  localStorage.setItem("data", JSON.stringify(newData)); 
}

function updateTotalIncome(amount) {
  totalIncome += parseInt(amount);
  let NumIncome = document.getElementById("NumIncome");
  NumIncome.textContent = `Общая сумма доходов: ${totalIncome}₽`;
}

function updateTotalExpenses(amount) {
  totalExpenses += parseInt(amount);
  let NumExpenses = document.getElementById("NumExpenses");
  NumExpenses.textContent = `Общая сумма расходов: ${totalExpenses}₽`;
}

function updateTotalBalance() {
  let totalBalance = totalIncome - totalExpenses;
  let NumBalance = document.getElementById('NumBalance');
  NumBalance.textContent = `Текущий баланс: ${totalBalance}₽`;
}

function ChangeList(index, Summa, radio, Category) {
  let newSumma = prompt("Введите новую сумму:", Summa);
  let newCategory = prompt("Введите новую категорию:", Category);
  let newRadio = prompt("Введите новый тип (доход/расход):", radio);
  if(newRadio === "доход" || newRadio === "расход"){
    if(newRadio === "доход"){
      newRadio = "income";
    }
    else{
      newRadio = "expenses";
    }
    let storedData = JSON.parse(localStorage.getItem("data"));
    storedData[index-1].radio = newRadio;
    storedData[index-1].Summa = newSumma;
    storedData[index-1].Category = newCategory;
    localStorage.setItem("data", JSON.stringify(storedData));
    location.reload();
  }
  else{
    alert("Введите правильные данные!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let storedData = JSON.parse(localStorage.getItem("data"));
  if (storedData) {
    storedData.forEach(item => {
      AddList(item.Summa, item.radio, item.Category);
      if (item.radio === 'income') {
        updateTotalIncome(item.Summa);
      } else {
        updateTotalExpenses(item.Summa);
      }
      updateTotalBalance();
    });
  }
});