const data = {
  API_KEY: '29769658-2e9c8ec471a16ce567c0ae4f1',
  URL: 'https://pixabay.com/api/',
};

export function getImages(query, page = 1) {
  return fetch(
    `${data.URL}?q=${query}&page=${page}&key=${data.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`The page you were trying to reach couldn't be found`)
    );
  });
}
