let Base_URL = "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const exchangeRate = async() => {
    let input = document.querySelector("input");
  let amount = input.value;
  if (amount < 1 || amount == 0) {
    alert("You have entered Insufficient amount")
    input.value = 1;
    amount = 1;
  }
  const URL = `https://api.frankfurter.app/latest?amount=1&from=${fromCurr.value}&to=${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  let finalAmt = Math.floor((amount*rate)*100)/100;
  msg.innerHTML = `<b>${amount} ${fromCurr.value} is ${finalAmt} ${toCurr.value}</b>`;
}
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value.toUpperCase(); // always uppercase
  let countryCode = countryList[currCode];

  if (!countryCode) return; // safeguard

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchangeRate();
  
});
window.addEventListener("load",() =>{
    exchangeRate();
})
