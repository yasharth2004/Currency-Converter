const Base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
})

for(let select of dropdowns)
{
    for(let currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if(select.name==="from" && currCode==="USD")
        {
            newOption.selected="Selected";
        }
        else if(select.name==="to" && currCode==="INR")
        {
            newOption.selected="Selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateflag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};



btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
const updateExchangeRate =async () => {
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value; 
    if(amtVal==="" || amtVal<1)
    {   amtVal=1;
        amount.value="1"; 
    }

    const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    console.log(response);
    let data=await response.json();
    console.log(data);
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}
