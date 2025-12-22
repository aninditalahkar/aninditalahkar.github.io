let expenses = [];
let nameInput = document.getElementById("expenseName");
let amountInput = document.getElementById("expenseAmount");
let addBtn = document.getElementById("addExpense");
let expenseList = document.getElementById("expenseList");
let totalAmount = document.getElementById("totalAmount");
let total = 0;

function saveExpenses(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function loadExpenses() {
    let stored= localStorage.getItem("expenses");
    if  (stored) {
        expenses= JSON.parse(stored);
        expenses.forEach(function(item) {
            addExpenseToUI(item.name, item.amount);
        });
        updateTotal();
    }
}
function addExpenseToUI(name, amount) {
    let li = document.createElement("li");

    let textSpan= document.createElement("span");
    textSpan.innerText= name + "- ₹" + amount;
    let deleteBtn= document.createElement("span");
    deleteBtn.innerText= "❌";
    deleteBtn.addEventListener("click", function() {
        expenses= expenses.filter(e => !(e.name === name && e.amount === amount));
        saveExpenses();
        li.remove();
        updateTotal();
    });
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
}
function updateTotal() {
    let sum = 0;
    expenses.forEach(e => sum += Number(e.amount));
    totalAmount.innerText= sum;
}
addBtn.addEventListener("click", function(){
    let expenseName= nameInput.value ;
    let expenseValue= amountInput.value ;
    if(expenseName === "" || expenseValue === "") {
        alert("Please enter both name and amount");
        return;
    }
    let expense = {name: expenseName, amount: expenseValue};
    expenses.push(expense);
    saveExpenses();

    addExpenseToUI(expenseName, expenseValue);
    updateTotal();

    nameInput.value= "";
    amountInput.value = "";
    
});
loadExpenses();
