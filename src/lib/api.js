import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-HGNGM7tEDbsUFbPbPpsCD33S';

// Get Market Data (List of Coins)
export const getMarketData = async (page = 1, perPage = 50) => {
  const { data } = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      price_change_percentage: '24h',
    },
    headers: {
        'x-cg-demo-api-key': API_KEY
    }
  });
  return data;
};

// Get Coin Details by ID
export const getCoinDetails = async (id) => {
  const { data } = await axios.get(`${API_URL}/coins/${id}`);
  return data;
};

// Get Coin Market Chart Data by ID
export const getCoinMarketChart = async (id, days = 7) => {
  const { data } = await axios.get(`${API_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days,
    },
  });
  return data;
};

