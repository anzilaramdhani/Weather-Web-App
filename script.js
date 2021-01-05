let api = {
    url: "https://api.openweathermap.org/data/2.5/",
    //Kamu Harus Pergi ke Url penyedia API nya untuk mendapatkan key
    key: ""
}

let search = document.querySelector(".query");
let display = document.querySelector(".display");
display.addEventListener("click", (e) => {
    e.preventDefault();
    //Jika Inputan Kosong Maka Program Tidak Akan Dijalankan 
    if ( search.value === "") {
       alert("Harus Diisi!");
    }
    else {
       getResult(search.value);
    }
})

function getResult(query) {
    fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`) 
       .then(response => response.json()) 
       .then(displayWeather)
       .catch(() => {
            image.src = "img/serverError.png";
       });
}

function displayWeather(response) {
    let city = document.querySelector(".city");
    let weather = document.querySelector(".weather");
    let mainTemp = document.querySelector(".main-temp");
    let mainTempMin = document.querySelector(".main-temp-min");
    let mainTempMax = document.querySelector(".main-temp-max");
    let country = document.querySelector(".country");
    let image = document.querySelector(".image");
    let date = document.querySelector(".date");
    let symbolC = String.fromCharCode(176);
    let d = new Date();
    let now = d.toLocaleString();
    date.innerText = now; 
    city.innerText = response.name;
    
    //Jika inputan mengandung kesalahan dalam penulisan dan lain-lain, maka jalankan error handling
    
    if ( response.name === undefined) {
       alert("Harap Masukan Nama Kota Dengan Benar!");
       date.innerText = ""; 
       country.innerText = "" ;
       mainTempMax.innerText = ""; 
       mainTempMin.innerText = ""; 
       mainTemp.innerText = ""; 
       weather.innerText = "";
       city.innerText = "TIDAK ADA! \n Mohon Masukan Nama Kota Dengan Benar! "
       image.src = "img/error.png";
    } 
    
    weather.innerText = response.weather[0].main;
    //Jika Cuaca A maka gambar akan menyesuaikan dengan cuaca
    if (response.weather[0].main === "Clear") {
       weather.innerText = "Cerah";
       image.src = "img/cerah.jpg";
    }
    if (response.weather[0].main === "Clouds") {
        weather.innerText = "Berawan";
        image.src = "img/berawan.jpg";
    }
    if ( response.weather[0].main === "Rain") {
        weather.innerText = "Hujan";
        image.src = "img/hujan.jpg";
    }
    if ( response.weather[0].main === "Haze") {
       weather.innerText = "Berkabut";
       image.src = "img/kabut.jpg";
    }
    mainTemp.innerText = `${Math.round(response.main.temp)} ${symbolC}C`;
    mainTempMin.innerText = `Min  : ${response.main.temp_min} ${symbolC}C`;
    mainTempMax.innerText = `Max  : ${response.main.temp_max} ${symbolC}C`;
    country.innerText = `${response.sys.country}`;
}