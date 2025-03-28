const apiKey = "AIzaSyBqAJziqzJLUtFKa1WzexnOIdvB1l9ngmM";
const city = document.getElementById("city").value.trim();
const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

fetch(geoUrl)
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      throw new Error("City not found");
    }
    const { lat, lon, name } = data[0];
    console.log(`City: ${name}, Latitude: ${lat}, Longitude: ${lon}`);
    // Now you can use lat & lon for weather API requests
  })
  .catch(error => console.error(error));
