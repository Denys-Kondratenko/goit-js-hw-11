import { fethPictures } from './fethPictures';
import './css/styles.css';

let request = '';

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

const getPictures = async () => {
  const { total, totalHits, hits } = await fethPictures(request);
  const markup = hits.map(elem => template(elem)).join('');
  console.log(markup);

  refs.gallery.innerHTML = markup;
};

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  request = event.currentTarget.elements.searchQuery.value;
  // console.log(event.currentTarget.elements.searchQuery.value);
  getPictures();
}
