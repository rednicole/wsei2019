const apiKey = '50d53005c0fd5f556bb4ef15224c4209';

document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    document.querySelector('#btnMiasto').addEventListener('click', btnMiastoClick);
}

function btnMiastoClick() {
    const miasto = document.querySelector('#miasto').value;
    pobierzpogode(miasto);
}

function pobierzpogode(miasto) {
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${miasto}&APPID=${apiKey}`;
    const pogoda = fetch(apiURL);
    console.log(pogoda);
    pogoda
        .then(
            resp => {
                console.log('OBIETNICA SPEŁNIONA', resp);
                return resp.json();
            },
            resp => console.log('OBIETNICA NIESPEŁNIONA', resp)
        )
        .then(
            resp => wyswietlPogode(resp, miasto)
        );
}

function wyswietlPogode(pogoda, miasto) {
    const szablon = `<div class="pogoda">
                        <h2>${miasto}</h2>
                        <p>Temperatura: ${pogoda.main.temp}</p>
                        <p>Wilgotność: ${pogoda.main.humidity}</p>
                        <p>Data: ${(new Date()).toLocaleString()}</p>`;
    document.querySelector('main').innerHTML = szablon;

}