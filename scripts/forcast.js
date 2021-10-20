const key = 'WMiRa3mklGaAJYcshZs3GTZMOrWfcK12';
const getCityCode = async (city) => {
    let url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    url += `?apikey=${key}&q=${city}`
    const response = await fetch(url)
    const data = await response.json();
    return data[0];
}

const getCurrentWeather = async (citycode) => {
    let url = 'http://dataservice.accuweather.com/currentconditions/v1/'
    url += citycode + `?apikey=${key}`
    const response = await fetch(url)
    const data = await response.json();
    return data[0];
}


