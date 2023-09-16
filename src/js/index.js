import axios from "axios";
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";

axios.defaults.headers.common["x-api-key"] = "live_x8AT8B0DXvrKQTrZAhs4XUzdPoRV3uBrBDhhYxuKtXoz7ZQJHVateow5oNSF18wc";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const axios = require('axios');

const refs = {
    breedSelector: document.querySelector('.breed-select'),
};


axios.get('/breeds')
  .then(function (response) {

      const storedBreeds = response.data;
   
      for (let i = 0; i < storedBreeds.length; i++) {
          const breed = storedBreeds[i];
          let option = document.createElement('option');
          option.value = `${breed.id}`;
          option.innerHTML = `${breed.name}`;
          document.querySelector('.breed-select').appendChild(option);    
      }
      
  new SlimSelect({
      select: '#placeholder',
      settings: {
    placeholderText: 'Choose the Breed',
  }
})
    console.log(response);
  })
  .catch(function (error) {
   
    console.log(error);
  })
  .finally(function () {
  
  });
  
const selectElement = document.querySelector('.breed-select'); 

selectElement.addEventListener('change', function() {
  const selectedOption = this.options[this.selectedIndex]; 
    console.log(selectedOption); 
    
axios.get(`/images/search?breed_ids=${selectedOption.value}`)
  .then(function (response) {
      let selectedBreed = response.data[0];

      const catImage = response.data[0].url
      const catName = selectedBreed.breeds[0].name;
      const catTemperament = selectedBreed.breeds[0].temperament;
          
      console.log(catImage);
      console.log(catName);
      console.log(catTemperament);

      const catCard = `<img src="${catImage}" alt="${catName}"s>
      <h1>${catName}</h1>
      <p> <span>Temperament:</span> ${catTemperament}</p>`;
      
      const catContainer = document.querySelector('.cat-info')
    //   catContainer.insertAdjacentHTML("beforeend", catCard)
      
      catContainer.innerHTML = catCard;

  })
  .catch(function (error) {
   
    console.log(error);
  })
  .finally(function () {
  
  });


});



