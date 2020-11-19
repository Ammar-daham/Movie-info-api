/*
	Javascript-tiedosto AJAX-tehtäviä varten.
	Jos etsitään TV-sarjoja haulla "girls", niin TV Maze APIsta suoritettava hakuosoite on:
	http://api.tvmaze.com/search/shows?q=girls
	Testaa haun toimintaa omassa selaimessa.
	Kun koodi toimii, niin poista turhat open höpinät.
*/

// hakuosoitteen vakio-osa.
const apiurl = "https://api.tvmaze.com/search/shows?q=";

// lopullinen hakukysely, joka lähetetään nettiin.
let apiKysely;

// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("hakunappi");
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.
const  tulosAlue = document.getElementById("tulos");
const hakuKentta = document.getElementById('hakuteksti');


// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', teeKysely);

// Funktio muodostaa hakukyselyn.
// Lopuksi funktio kutsuu teeHaku() funktiota.
function teeKysely() {
    // TODO: haetaan html-sivulta käyttäjän antama hakuteksti (muista .value)
    // TODO: poista siis tuo alla oleva kovakoodaus!
    let hakusana = hakuKentta.value;

    // muodostetaan ja tulostetaan konsoliin lopullinen hakukysely
    apiKysely = apiurl + hakusana;
    console.log("Lähetettävä kysely: " + apiKysely);

    // kutsutaan fetch-jutut hoitavaa funktiota
    teeHaku(apiKysely);        // parametrina hakulause
}

// Idea: tämä fetch-osa säilyy yleensä samana.
// Funktio saa parametrina hakulauseen.
function teeHaku(apiKysely)  {

    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(apiKysely).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    }).catch(function(error){       // Jos tapahtuu virhe,
        console.log(error);           // kirjoitetaan virhe konsoliin.
    });
};


// Funktio hoitaa kyselystä saadun json-datan käsittelyn.
// Funktio saa parametrina json-muodossa olevan datan.
function naytaVastaus(jsonData) {
    /*
        Aha, json-dataoliot ovat siis taulukossa.
        Yksi dataolio sisältää yhden sarjan tiedot.
        Eihän ope nyt kaikkia saa tulostettua... 
		    Kokeilen eka hakutuloksen kanssa...
        // TODO: tulosta kaikkien sarjojen tiedot.
    */

	// AJAX-tehtävän vaihe 1 on suoritettu, jos alla oleva koodi
	// tulostaa konsoliin noin 10 sarjan tiedot (Array, jonka koko on 10).
    console.log("json sellaisenaan <br>");
    console.log(jsonData);
    console.log("Sellainen se oli. <br>");

    // harjoittelua konsoliin ennen web-sivulle tulostusta.
    console.log("Hakutuloksia löytyi: " + Object.keys(jsonData).length + " kpl.");
    console.log("Length kertoo: " + jsonData.length);

    // json-datan rakenne riipuu aina datan tarjoajasta.
    // Mistä nyt mikin data löytyy: se on katsottu TVMazen rajapinnan kuvauksesta.
	// TODO: etsi API kuvauksesta, että mistä haluttu data löytyy.

    // Tulostan nyt muutaman tiedon eka sarjasta eli taulukon eka alkiosta (jsonData[0]).
   /* let nimi = jsonData[0].show.name;
    console.log("Check: eka sarjan nimi: " + nimi + "<br>");
    console.log("Check: eka sarjan kuvien url löytyy show.image alta");
*/
    if(jsonData.length == 0) {
        tulosAlue.innerText = "Haullasi ei löytynyt yhtään sarjaa";
        return ;
    }

    // TODO: kerää tarvittava data ja tulosta se web-sivulle.
	  // Valmistellaan html-sivulle tuleva koodi.
    let htmlKoodi = ``;
    for(let i = 0; i <jsonData.length; i++){
        let kuva = "kuvaa ei löydy";
        if(jsonData[i].show.image != null){
          kuva = `<img src="${jsonData[i].show.image.medium}" alt="Sarjan kuva">`;
        }
        htmlKoodi += `
        Sarjan nimi:   ${jsonData[i].show.name} <br>
        Sarjan url:    <a href="${jsonData[i].show.url}">${jsonData[i].show.url}</a> <br>
        Sarjan kuva:   <figure>${kuva}<figcaption>Sarja kuva</figcaption></figure> <br>
        Sarjan info:   <p>${jsonData[i].show.summary}</p>
        Genre:         ${jsonData[i].show.genres}<br><br>
        
    `;
    }


    tulosAlue.innerHTML = htmlKoodi;

    // -- näitä allaolevia juttuja voi joskus hyödyntää.  --
    // Virhetilanteeseen varautuminen, ilman try-catch tekniikkaa:
    let kuva;
    // Haetaan kuva-muuttujaan json-datasta sarjan kuvaa.
    // testatataan, että löytyikö kuva.
    if (kuva == null) {
        // kuvaa ei ollut, jos tänne tullaan.
        // Esitä esim. oma virhetilanteen kuva.
    }

}

function virhetilanne() {
    // Virhealtis koodi kannattaa hallinnoida esim. try-catch tekniikalla.
    // Idea: tehdään yleensä toimivat osat normaalisti.
    // virhealtis kohta try-catch osan sisään.

    // Tässä alla on jotakin virhealista koodia:
    try {
        // virhealtista koodia.
        // Jos tulee virhetilanne, niin tämän koodin suoritus lopetetaan heti.
        // Tänne ei palata.
    }
    catch (e) {
        // jos tapahtui virhe, niin tullaan tänne, muuten ei.
        console.log("Jokin meni pieleen, alla virheen info: <br>")
        console.log(e);
    }

}



