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
    userHistory: 'account/iphistory',
    userCart: 'orders/cart/',
    userOrder: 'orders/cart/submit',
    ticketCancellation: 'orders/userorders/cancel',
    addTickets: 'tickets/add',
  },
};

export const config = CONFIG;
