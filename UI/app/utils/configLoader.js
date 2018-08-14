const CONFIG = {
  availableLanguages: ['ru', 'en'],
  defaultLanguage: 'ru',
  appTitle: 'airlines',
  APIUrl: 'http://localhost:57730/api/',
  APIOptions: {
    login: 'account/login',
    signup: 'account/signup',
    getUserTickets: 'orders/userorders/',
    resultTickets: 'tickets/search/',
    popularCities: 'cities/',
  },
};

export const config = CONFIG;
