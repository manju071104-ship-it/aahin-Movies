const API_KEY = "a116dbbe2e6ec0afb0bef57f40c24e21";
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.results);
  });