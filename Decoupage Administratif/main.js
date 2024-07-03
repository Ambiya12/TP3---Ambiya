document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://geo.api.gouv.fr';

    const selectRegions = document.getElementById('regions');
    const selectDepartements = document.getElementById('departements');
    const btnAfficherCommunes = document.getElementById('afficherCommunes');
    const listeCommunes = document.getElementById('listeCommunes');

    function chargerRegions() {
        fetch(`${apiUrl}/regions`)
            .then(response => response.json())
            .then(data => {
                data.forEach(region => {
                    const option = document.createElement('option');
                    option.value = region.code;
                    option.textContent = region.nom;
                    selectRegions.appendChild(option);
                });
            })
    }

    function chargerDepartements(codeRegion) {
        fetch(`${apiUrl}/regions/${codeRegion}/departements`)
            .then(response => response.json())
            .then(data => {
                selectDepartements.innerHTML = '';
                data.forEach(departement => {
                    const option = document.createElement('option');
                    option.value = departement.code;
                    option.textContent = departement.nom;
                    selectDepartements.appendChild(option);
                });
            })
    }

function chargerCommunes(codeDepartement) {
    fetch(`${apiUrl}/departements/${codeDepartement}/communes`)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.population - a.population);

            listeCommunes.innerHTML = '';
            data.forEach(commune => {
                const li = document.createElement('li');
                li.textContent = `${commune.nom} - Population : ${commune.population}`;
                listeCommunes.appendChild(li);
            });
        })
}

    chargerRegions();

    selectRegions.addEventListener('change', function() {
        const codeRegion = selectRegions.value;
        chargerDepartements(codeRegion);
    });

    btnAfficherCommunes.addEventListener('click', function() {
        const codeDepartement = selectDepartements.value;
        chargerCommunes(codeDepartement);
    });
});
