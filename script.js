const addBtn = document.querySelector("#addFrnd");
const addform = document.querySelector("#addForm");
const closeBtn = document.querySelector("#closeBtn");
const savefriend = document.querySelector("#saveFriend");
const friendsList = document.querySelector("#friendsList");
const billBox = document.querySelector("#billBox");

let crntFrnd = null;
const friendsData = {}; 

const billinput = document.getElementById("billValue");
const yourInput = document.getElementById("yourExpense");
const friendInput = document.getElementById("friendExpense");
const errormsg = document.getElementById("errormsg");
const splitBtn = document.getElementById("splitBtn");


[billinput, yourInput].forEach((input) => {
  input.addEventListener("focus", () => {
    if (input.value === "0") input.value = "";
  });
});

[billinput, yourInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/-/g, "");
  });
});

billinput.addEventListener("input", validateForm);
yourInput.addEventListener("input", validateForm);

function validateForm() {
  const billVal = Number(billinput.value);
  const yourVal = Number(yourInput.value);

  if (yourVal > billVal) {
    errormsg.textContent = "Cannot be greater than bill value.";
    splitBtn.disabled = true;
    friendInput.value = billVal;
    return;
  }

  errormsg.textContent = "";
  friendInput.value = billVal - yourVal;

  splitBtn.disabled = !(billVal >= 0 && yourVal >= 0 && yourVal <= billVal);
}

addBtn.addEventListener("click", () => addform.classList.toggle("hidden"));
closeBtn.addEventListener("click", () => addform.classList.add("hidden"));

savefriend.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const image = document.getElementById("image").value;

  if (!name) return;

  const frndDiv = document.createElement("div");
  frndDiv.className =
    "flex items-center justify-between bg-white p-2 rounded shadow mb-2 gap-10";

  frndDiv.innerHTML = `<div class="flex items-center space-x-2 ">
    <img src="${image}" class="w-10 h-10 rounded-full">
    <div>
      <p class="font-bold">${name}</p>
      <p id="status-${name}" class="text-sm text-gray-600">No bill yet</p>
    </div>
  </div>
  <div class="flex gap-5 items-center">
    <button class="selectBtn bg-red-400 text-white font-bold hover:bg-red-600 px-3 py-1 rounded">Select</button>
    <button class="deleteBtn hidden bg-red-400 text-white font-bold hover:bg-red-600 px-3 py-1 rounded">Delete</button>
  </div>`;

  friendsList.insertBefore(frndDiv, addBtn);

  const selectBtn = frndDiv.querySelector(".selectBtn");
  const deleteBtn = frndDiv.querySelector(".deleteBtn");
  const status = frndDiv.querySelector(`#status-${name}`);

  selectBtn.addEventListener("click", () => {
    if (billBox.classList.contains("hidden") || crntFrnd !== name) {
      billBox.classList.remove("hidden");
      crntFrnd = name;
      selectBtn.textContent = "Close";
      selectBtn.classList.replace("bg-red-400", "bg-red-500");

      if (friendsData[name]) {
        billinput.value = friendsData[name].billValue;
        yourInput.value = friendsData[name].yourExpense;
        friendInput.value = friendsData[name].frndExpense;
      } else {
        billinput.value = 0;
        yourInput.value = 0;
        friendInput.value = 0;
      }
      validateForm();
    } else {
      billBox.classList.add("hidden");
      selectBtn.textContent = "Select";
      selectBtn.classList.replace("bg-red-500", "bg-red-400");
      crntFrnd = null;
    }
  });

  deleteBtn.addEventListener("click", () => {
    delete friendsData[name];
    frndDiv.remove();
    if (crntFrnd === name) {
      billBox.classList.add("hidden");
      crntFrnd = null;
    }
  });

  document.getElementById("name").value = "";
  addform.classList.add("hidden");
});

splitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!crntFrnd) return;

  const billValue = Number(billinput.value);
  const yourExpense = Number(yourInput.value);
  const frndExpense = billValue - yourExpense;

  friendsData[crntFrnd] = { billValue, yourExpense, frndExpense };

  const status = document.getElementById(`status-${crntFrnd}`);
  const frndDiv = status.closest("div.flex.items-center.justify-between");
  const deleteBtn = frndDiv.querySelector(".deleteBtn");

  if (yourExpense === frndExpense) {
    status.textContent = "Both are even";
    status.className = "text-orange-600 text-sm";
    deleteBtn.classList.remove("hidden");
  } else if (yourExpense > frndExpense) {
    status.textContent = `${crntFrnd} owes you ${yourExpense - frndExpense}`;
    status.className = "text-green-600 text-sm";
    deleteBtn.classList.add("hidden");
  } else {
    status.textContent = `You owe ${crntFrnd} ${frndExpense - yourExpense}`;
    status.className = "text-red-600 text-sm";
    deleteBtn.classList.add("hidden");
  }
});
