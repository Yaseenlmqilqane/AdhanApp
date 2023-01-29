
let cities = [
  {
    name: "Recife"
  },
  {
    name: "São Paulo"
  },
  {
    name: "Rio de Janeiro"
  },
  {
    name: "Santa Catarina"
  }
]

for (let city of cities) {
  const content = `
    <option>${city.name}</option>
  `
  document.getElementById("city-names").innerHTML += content
}
document.getElementById("city-names").addEventListener("change", function(){
  document.getElementById("name-of-city").innerHTML = this.value
  for (let city of cities) {
    if (city.name == this.value) {
        cityName = city.name
    }
  }
  getPrayerTimeOfCity(cityName)
})

function getPrayerTimeOfCity(cityName){
    let params = {
      country: "BR",
      city: cityName,
      state: "RB-PE"
  }

  axios.get('http://api.aladhan.com/v1/timingsByCity', {
      params: params
    })
    .then(function (response) {
      const timings = response.data.data.timings
      fillTimeForPrayer("fajr-time", timings.Fajr);
      fillTimeForPrayer("sunrise-time", timings.Sunrise);
      fillTimeForPrayer("dhuhr-time", timings.Dhuhr);
      fillTimeForPrayer("asr-time", timings.Asr);
      fillTimeForPrayer("maghrib-time", timings.Maghrib);
      fillTimeForPrayer("isha-time", timings.Isha);

      const readableDate = response.data.data.date.readable
      const weekDay = response.data.data.date.hijri.weekday.en
      document.getElementById("weekday-name").innerHTML = weekDay +" "+ readableDate

    })
    .catch(function (error) {
      console.log(error);
    })
}
getPrayerTimeOfCity("Recife")

  function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time
  }