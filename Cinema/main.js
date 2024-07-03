document.addEventListener('DOMContentLoaded', function() {
    chargerCinemas();
});

function chargerCinemas() {
    const urlFirstTwenty = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&rows=20";

    fetch(urlFirstTwenty)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);

            const cinemas = data.records;
            console.log("Cinemas Array:", cinemas);

            afficherPremiersCinemas(cinemas);
        })
        .catch(error => {
            console.error("Error fetching data for the first 20 cinemas: ", error);
        });
}

function afficherPremiersCinemas(cinemas) {
    const cinemaListElement = document.getElementById('cinemaList');
    cinemas.forEach(function(cinema) {
        const name = cinema.fields.nom_etablissement;
        const address = cinema.fields.adresse;
        const city = cinema.fields.commune;

        const li = document.createElement('li');
        li.textContent = `${name} - ${address}, ${city}`;
        cinemaListElement.appendChild(li);
    });
}
