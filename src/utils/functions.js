// Declaring functions //

// Fetches data
// url: Receives url to fetch the data from
// returns a promise with data
async function fetchData(url) {
  let response = await fetch(url);
  let data = response.json();
  return data;
}

// Exporting functions
const functions = { fetchData, axiosPost };

export default functions;