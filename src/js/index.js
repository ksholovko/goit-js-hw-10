import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const selectElement = document.querySelector('.breed-select'); 
selectElement.addEventListener('change', showBreedInfo);

Loading.standard('Loading...');

fetchBreeds().then( response => createBreedSelector(response))
  .catch(error => {
  Loading.remove();
  Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Okay',
  );
console.log(error);})
 

function createBreedSelector(response) {
      
  Loading.remove();
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
}

function showBreedInfo() {

  Loading.standard('Loading...');
  const selectedOption = this.options[this.selectedIndex];
  const breedId = selectedOption.value;
  
  fetchCatByBreed(breedId)
    .then(response => createBreedMarkup(response))
    .catch(error => {
      Loading.remove();
      Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Okay',
    );
    console.log(error);})
}

function createBreedMarkup(response) {
      
  Loading.remove();
  const selectedBreed = response.data[0];
  const catImage = response.data[0].url;
  const catName = selectedBreed.breeds[0].name;
  const catDescription = selectedBreed.breeds[0].description;
  const catTemperament = selectedBreed.breeds[0].temperament;

      const catCard = `<img src="${catImage}" alt="${catName}"s>
      <h1>${catName}</h1>
      <p>${catDescription}</p>
      <p> <span>Temperament:</span> ${catTemperament}</p>`;
      
  const catContainer = document.querySelector('.cat-info');
    //   catContainer.insertAdjacentHTML("beforeend", catCard)
  catContainer.innerHTML = catCard;

}
