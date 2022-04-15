import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: 'BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq',
  },
});
