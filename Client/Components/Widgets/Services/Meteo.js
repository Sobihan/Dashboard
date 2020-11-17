export const getTemperature =  (city) => {
    
    let data = async function () {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=189d53774d5ee1fea88cb615e7535fea`, {
        method: 'GET'
    }).then((response) => console.log(response.json()))
    // .then((json) => {console.log(json)})
    // }
}

    data()

}