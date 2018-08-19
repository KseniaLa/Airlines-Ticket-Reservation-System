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
    cities: 'cities/',
    companies: 'companies/',
    popularCities: 'cities/popular/',
    userHistory: 'account/iphistory',
    userCart: 'orders/cart/',
    userOrder: 'orders/cart/submit',
    ticketCancellation: 'orders/userorders/cancel',
    addTickets: 'tickets/add',
    addCity: 'cities/add',
    addCompany: 'companies/add',
  },
};

export const config = CONFIG;
