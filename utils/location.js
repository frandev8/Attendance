export const getUserClockinLoc = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        // The coordinates are available in the position object
        var latitude = position.coords.latitude;

        var longitude = position.coords.longitude;

        console.log("Latitude: " + latitude + ", Longitude: " + longitude);

        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${
            import.meta.env.VITE_REACT_APP_GEOCODING_KEY
          }`
        );

        if (!res.ok) {
          const error = new Error(
            "An error occurred while changing your personal details"
          );
          error.code = res.status;
          error.info = await res.json();
          throw error;
        }

        const data = await res.json();

        if (data.results.length > 0) {
          const city = data.results[0].components.city;
          const street = data.results[0].components.road;

          console.log(`City: ${city}, street: ${street}`);

          return { street, city };
        } else {
          console.error("No results found for the provided coordinates.");
        }
      },
      function (error) {
        // Handle errors (e.g., user denies the request for location)
        console.error("Error getting location: " + error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};
