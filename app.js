const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");





for (let select of dropdowns){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currcode;
        newOption.innerText = currcode;
        if (select.name === "from" && currcode === "USD"){
            newOption.selected = true;
        }else if(select.name === "to" && currcode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    })
};
const updateExchangeRate = async ()=>{
    let amount = document.querySelector("form input");
    amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurVal = fromCur.value.toLowerCase();
    let toCurVal = toCur.value.toLowerCase();
    const URL = `${BASE_URL}${fromCurVal}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurVal][toCurVal]

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurVal.toUpperCase()} is equal to ${finalAmount} ${toCurVal.toUpperCase()}`;

};
const updateflag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSourceLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSourceLink;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});



