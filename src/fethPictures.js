import axois from 'axios';

export async function fethPictures(request, page) {
  try {
    const response = await axois.get(
      `https://pixabay.com/api/?key=34726411-d79d2bb382e9b3b825be3cd38&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
