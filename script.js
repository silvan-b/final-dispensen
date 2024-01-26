function submitForm() {
    // Hier können Sie JavaScript-Code hinzufügen, um die Formulardaten zu verarbeiten
    // Zum Beispiel können Sie AJAX verwenden, um die Daten an einen Server zu senden
    // und sie in einer Datenbank zu speichern.
    // Beachten Sie, dass Sie für die Datenbankinteraktion serverseitigen Code benötigen,
    // da JavaScript im Browser nicht direkt auf eine SQL-Datenbank zugreifen kann.
    // Dies ist nur ein einfaches Beispiel:

    const formData = new FormData(document.getElementById('myForm'));

    // Hier können Sie die Daten an einen Server senden
    // Zum Beispiel mit Hilfe von Fetch oder XMLHttpRequest
    fetch('/submit-form', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Hier können Sie die Antwort vom Server verarbeiten
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
