<?php

?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Журнал финансов</title>
</head>
<body>
  <header>
    <h1>Журнал финансов</h1>
  </header>
  <main>
    <div id="container">
      <label>Введите сумму <input type="number" min="1" id="valueSumma" placeholder="Введите сумму"></label>
      <input type="radio" name="transactionType" id="income" value="income">
      <label for="income">Доходы</label>
      <input type="radio" name="transactionType" id="expense" value="expense">
      <label for="expense">Расходы</label>
      <input type="text" id="Category" placeholder="Категория">
      <button id="button">Добавить транзакцию</button>
      </main>
  </div>
  <footer>
  <h1>Список транзакций</h1>
  <div id="List"></div>
  </footer>
  <hr>
  <div id="Num_Income_Expenses">
    <span id="NumIncome">Общая сумма доходов: 0</span>
    <span id="NumExpenses">Общая сумма расходов: 0</span>
    <span id="NumBalance">Текущий баланс: 0</span>
  </div>
  <script src="script.js"></script>
</body>
</html>