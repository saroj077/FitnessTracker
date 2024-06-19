export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '761cd2b739mshb4d4d311688b937p1467b1jsn4851b755e7a8',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};
export const youtubeOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '761cd2b739mshb4d4d311688b937p1467b1jsn4851b755e7a8',
      'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
    },
  };
export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
};

