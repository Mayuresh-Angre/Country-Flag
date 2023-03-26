const countryContainer = document.getElementById("countryContainer")
const countryName = document.getElementById("countryName")
const countryCapital = document.getElementById("countryCapital")
const countryPopulation = document.getElementById("countryPopulation")
const searchBox = document.getElementById("searchBox")
const showPopChart = document.getElementById("showPopChart")
const showLangChart = document.getElementById("showLangChart")
const langaugesChart = document.getElementById("langaugesChart")
const poputionChart = document.getElementById("poputionChart")
const header=document.getElementById("header")

let flag = true;



let templating = (arr) => {
  let result = ``
  arr.forEach((obj) => {
    result += `
     <div class="col-md-3 mb-2">
        <div class="card">
        <div class="card-header text-center">
          <img src="${obj.flag}" alt="${obj.name}">
          </div>
          <div class="card-body">
            <h4 class="text-center flagName">
            ${obj.name.toUpperCase()}</h4>
            <p><strong>Capital:</strong><span class="text-secondary">${obj.capital}</span>
            </p>
            <p><strong>Languages:</strong><span class="text-secondary">${obj.languages}</span>
           </p>
            <p><strong>Population:</strong><span class="text-secondary"> ${obj.population}</span>
           </p>
          </div>
        </div>
      </div>`
  })
  countryContainer.innerHTML = result
}
templating(countries)


function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.lname) {
    return 1;
  }
  return 0;
}

function compareCapital(a, b) {
  if (a.capital < b.capital) {
    return -1;
  }
  if (a.capital > b.capital) {
    return 1
  }
  return 0
}
function comparePopulation(a, b) {
  return a.population - b.population
}

const arrangeByName = ((eve) => {
  if (flag === true) {
    countries.sort(compare);
    eve.target.innerHTML = `NAME`
    templating(countries)
    flag = false;
  } else {
    countries.sort(compare).reverse();
    eve.target.innerHTML = `NAME ↑`;
    templating(countries);
    flag = true;
  }


})

const arrangeByCapital = ((eve) => {
  if (flag === true) {
    countries.sort(compareCapital);
    eve.target.innerHTML = `CAPITAL`
    templating(countries);
    flag = false;
  } else {
    countries.sort(compareCapital).reverse();
    eve.target.innerHTML = `CAPITAL ↑`
    templating(countries);
    flag = true;
  }
})

const arrangeByPopulation = ((eve) => {
  if (flag === true) {
    countries.sort(comparePopulation);
    eve.target.innerHTML = "POPULATION";
    templating(countries);
    flag = false;
  } else {
    countries.sort(comparePopulation).reverse();
    eve.target.innerHTML = "POPULATION ↑";
    templating(countries);
    flag = true;
  }

})

const findFlag = ((eve) => {
  let searchValue = eve.currentTarget.value.toLowerCase();
  let newcountries = countries.filter((obj) => {
    return JSON.stringify(obj).toLowerCase().includes(searchValue)
  })
  // let newcountries = countries.filter((obj) => {
  //   return obj.capital.toLowerCase().includes(searchValue) || obj.name.toLowerCase().includes(searchValue)
  // }).filter((obj) => {
  //     if(obj.languages.toString().toLowerCase().includes(searchValue)) {
  //       return obj
  //     }

  //   // console.log(obj.languages.join().toLowerCase().includes(searchValue))
  // })

  let len=newcountries.length
  header.classList.remove("d-none")
  header.innerHTML=`Currently,we have ${len} countries`
  templating(newcountries)
  if(searchValue===""){
    header.classList.add("d-none")
  }
})
templating(countries)



const popChart = (eve) => {
  langaugesChart.classList.remove("d-none")
  poputionChart.classList.add("d-none")
}

const langChart = (eve) => {
  poputionChart.classList.remove("d-none")
  langaugesChart.classList.add("d-none")
}

countryName.addEventListener("click", arrangeByName)
countryCapital.addEventListener("click", arrangeByCapital)
countryPopulation.addEventListener("click", arrangeByPopulation)
searchBox.addEventListener("input", findFlag)
// searchBox.addEventListener("input ", findFlag2)
showLangChart.addEventListener("click", popChart)
showPopChart.addEventListener("click", langChart)