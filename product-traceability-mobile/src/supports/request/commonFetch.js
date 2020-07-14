import axios from 'axios';

const fetch = axios.create({
  timeout: 60000
});

export default fetch;
