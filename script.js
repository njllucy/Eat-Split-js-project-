const addBtn = document.querySelector("#addFrnd");
const addform = document.querySelector("#addForm");
const closeBtn = document.querySelector("#closeBtn");
const savefriend = document.querySelector("#saveFriend");
const friendsList = document.querySelector("#friendsList");
const billForm = document.querySelector("#billForm");
let crntFrnd = null;

// open add form
addBtn.addEventListener("click", function () {
  addform.classList.toggle("hidden");
});
// close add form
closeBtn.addEventListener("click", function () {
  addform.classList.toggle("hidden");
});

//add friend
savefriend.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  console.log(image);

  if (!name) return;

  const frndDiv = document.createElement("div");
  frndDiv.className =
    "flex items-center justify-between bg-white p-2 rounded shadow mb-2 gap-10";

  frndDiv.innerHTML = `<div class="flex items-center space-x-2 ">
    <img src="${image}" class="w-10 h-10 rounded-full">
    <div>
    <p class="font-bold">${name}</p>
    <p id="status-${name}" class="text-sm text-gray-600">No bill Yet</p>
    </div>
    </div>
    <button id="selectBtn" class="toggleBtn bg-red-400 text-white font-bold hover:bg-red-600 px-3 py-1 rounded">Select</button>
    `;
  friendsList.insertBefore(frndDiv, addBtn);

  //select button working
  const toggleBtn = frndDiv.querySelector(".toggleBtn");
  toggleBtn.addEventListener("click", () => {
    if (toggleBtn.textContent == "Select") {
      billForm.classList.remove("hidden");
      crntFrnd = name;
      toggleBtn.textContent = "Close";
      toggleBtn.classList.replace("bg-red-400", "bg-red-500");
    } else {
      billForm.classList.add("hidden");
      toggleBtn.textContent = "Select";
      toggleBtn.classList.replace("bg-red-500", "bg-red-400");
    }
  });

  document.getElementById("name").value = "";
  addform.classList.add("hidden");
});

//split bill
document.querySelector("#splitBtn").addEventListener("click", () => {
  const billValue = +document.getElementById("billValue").value;
  const yourExpense = +document.getElementById("yourExpense").value;
  const frndExpense = Math.abs(billValue - yourExpense);
  const payer = document.getElementById("payer").value;
  const status = document.getElementById(`status-${crntFrnd}`);
  if (yourExpense === billValue) {
    status.textContent = `${crntFrnd} owes you ${billValue / 2}`;
    status.className = "text-green-600 text-sm";
  } else if (yourExpense === frndExpense) {
    status.textContent = `Both ${crntFrnd} are even`;
    status.className = "text-orange-600 text-sm";
  } else if (yourExpense > frndExpense) {
    status.textContent = `${crntFrnd} owes you ${yourExpense - frndExpense}`;
    status.className = "text-green-600 text-sm";
  } else {
    status.textContent = `You owe ${crntFrnd} ${frndExpense - yourExpense}`;
    status.className = "text-red-600 text-sm";
  }

  //   if (yourExpense == frndExpense) {
  //     status.textContent = `Both ${crntFrnd} are even`;
  //     status.className = "text-orange-600 text-sm";
  //   } else if (yourExpense > frndExpense) {
  //     status.textContent = `${crntFrnd} owes you ${Math.abs(yourExpense - frndExpense)}`;
  //     status.className = "text-green-600 text-sm";
  //   } else if(yourExpense==billValue){
  //      status.textContent = `${crntFrnd} owes you ${billValue/2}`;
  //     status.className = "text-green-600 text-sm";
  //   }
  //   else {
  //     status.textContent = `you owe ${crntFrnd} ${Math.abs(yourExpense - frndExpense)}`;
  //     status.className = "text-red-600 text-sm";
  //   }
});

const billValueInput = document.getElementById("billValue");
const yourExpenseInput = document.getElementById("yourExpense");
const frndExpenseInput = document.getElementById("friendExpense");
yourExpenseInput.addEventListener("input", () => {
  const billValue = +billValueInput.value || 0;
  const yourExpense = +yourExpenseInput.value || 0;
  let friendExpense = billValue - yourExpense;

  if (friendExpense < 0) friendExpense = 0;
  frndExpenseInput.value = friendExpense;
});
