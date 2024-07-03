document.getElementById('geolocateBtn').addEventListener('click', () => {
    navigator.geolocation?.getCurrentPosition(successCallback, errorCallback);
});

function successCallback(position) {
    const { latitude, longitude } = position.coords;
    fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('address').textContent = `Adresse : ${data.features[0]?.properties?.label || "Adresse non trouvée."}`;
        })
        .catch(() => {
            document.getElementById('address').textContent = "Erreur lors de la récupération de l'adresse.";
        });
}

function errorCallback(error) {
    console.error('Error code:', error.code, 'Message:', error.message);
}
