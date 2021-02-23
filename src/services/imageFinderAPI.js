const APIkey = 'key=18695501-5acbf60d27f3b96795a230f12';
const baseURL = 'https://pixabay.com/api/';

const getImages = (query, page) => {
  return fetch(`${baseURL}?${APIkey}&q=${query}&page=${page}&per_page=4`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`По запросу ${query} ничего не найдено!`);
    },
  );
};
const imageFinderAPI = { getImages };
export default imageFinderAPI;
