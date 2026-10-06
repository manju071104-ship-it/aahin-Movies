// fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.results);
// });

document.addEventListener("DOMContentLoaded", async () => {
  const API_KEY = "a116dbbe2e6ec0afb0bef57f40c24e21";

  // creating slider for aahin-movies

  async function slider(URL) {
    let res = await fetch(`${URL}`)
    let data = await (res.json());
    data = data.results;

    console.log(data)

    let slides = document.querySelectorAll('.slider img');
    let title = document.querySelector('#slidertitle')

    let i = Math.floor(Math.random() * 16);
    function slide() {

        if(i + 2 >= data.length){
          i = 0;
        }
          title.innerHTML = `${data[i].original_title || original_name}`
          slides[0].src = `https://image.tmdb.org/t/p/original/${data[i].backdrop_path}`;
          slides[1].src = `https://media.themoviedb.org/t/p/original${data[i+1].backdrop_path}`;
          slides[2].src = `https://media.themoviedb.org/t/p/original${data[i+2].backdrop_path}`;

        i++;
    }

    slide();

    setInterval(slide,3000);


  }


  slider(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);












  // function to fetch products

  async function Product(URL) {

    let res = await fetch(`${URL}`);
    let data = await (res.json());
    console.log(data.results);
    let div = document.createElement('div');
    div.className = 'movies';

    data.results.forEach(element => {
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
                        <img src="https://media.themoviedb.org/t/p/w440_and_h660_face${element.poster_path}" alt="${element.original_title}">
                        <h4>${element.original_title || element.original_name}</h4>
                        <div class="rating">
                            <pre>${new Date(element.release_date).getFullYear()}</pre>
                            <pre>${element.vote_average}</pre>
                        </div>`
      div.appendChild(card);
    });
    return div;
  }
  const result = await Product(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
  let content = document.querySelector('.content');
  content.appendChild(result);
  console.log(content);


  let trendingbuttons = document.querySelectorAll('.Tog-Button input');

  trendingbuttons.forEach(button => {

    button.addEventListener('change', async () => {

      let trending = document.querySelector(
        `.Tog-Button input[name="Trending"]:checked`
      ).value;


      let oldmovies = document.querySelector('.content .movies');

      oldmovies.remove();
      if (trending == "week") {

        let result = await Product(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
        );

        content.appendChild(result);

      } else {

        let result = await Product(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        );

        content.appendChild(result);
      }

    })

  });

})
