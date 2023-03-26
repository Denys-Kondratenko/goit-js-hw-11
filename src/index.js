import { fethPictures } from './fethPictures';
import { Notify } from 'notiflix';
import './css/styles.css';

let request = '';
let page = 1;
let calcHits = 0;

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnMore: document.querySelector('.load-more'),
};

function template({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
}

const getPictures = async page => {
  try {
    const { totalHits, hits } = await fethPictures(request, page);
    const markup = hits.map(elem => template(elem)).join('');
    console.log(totalHits, hits);
    calcHits += hits.length;

    refs.gallery.insertAdjacentHTML('beforeend', markup);
    refs.btnMore.style.display = 'block';

    if (hits.length === 0) {
      refs.btnMore.style.display = 'none';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (calcHits === totalHits) {
      refs.btnMore.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  request = event.currentTarget.elements.searchQuery.value;

  if (request === '') {
    return;
  }

  calcHits = 0;
  refs.btnMore.style.display = 'none';
  refs.gallery.innerHTML = '';

  getPictures();

  page = 1;
}

refs.btnMore.addEventListener('click', handleMore);

function handleMore(event) {
  page += 1;
  getPictures(page);
}
