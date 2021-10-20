const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('body > div > div > div.icon.bg-light.mx-auto.text-center > img');

cityForm.addEventListener('submit', (e) => {
    //prevent default action that refresh the page
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    
    cityForm.reset();

    //update UI with the city info
    updateCity(city).then(data => {
        updateUI(data)
    }).catch(err => {
        console.log(err.message)
    });

    //set local storage
    localStorage.setItem('city',city)
})

const updateCity = async (city) => {
    const cityDetails = await getCityCode(city);
    const cityWeather = await getCurrentWeather(cityDetails.Key)
    
    return { cityDetails, cityWeather };
}

const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const cityWeather = data.cityWeather;

    //Update details in the UI HTML
    console.log(cityWeather)
    details.innerHTML = `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
              <div class="my-3">${cityWeather.WeatherText}</div>
              <div class="display-4 my-4">
                  <span>${cityWeather.Temperature.Metric.Value}</span>
                  <span>&deg;C</span>
              </div>`;

    //remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

    //set day or nigh pic
    const timeSrc = cityWeather.IsDayTime ? './icons/day.svg' : './icons/night.svg';
    time.setAttribute('src', timeSrc)
    //set icon based on weather
    const iconUrl = "./icons/" + cityWeather.WeatherIcon + '.svg'
    icon.setAttribute('src', iconUrl)
}


if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city')).then(data=>{
        updateUI(data)
    }).catch(err=>{
        console.log(err.message)
    })
}