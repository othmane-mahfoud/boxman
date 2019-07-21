export const getLocation = async () => {
    // return 'location test'
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(position => {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            resolve([lat, lng]);
          }, reject);
        });
    }
};
  