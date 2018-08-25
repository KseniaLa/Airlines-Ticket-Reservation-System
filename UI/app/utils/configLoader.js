const CONFIG = {
  availableLanguages: ['ru', 'en'],
  defaultLanguage: 'ru',
  appTitle: 'airlines',
  APIUrl: 'http://localhost:57730/api/',
  APIOptions: {
    login: 'account/login',
    logout: 'account/logout',
    signup: 'account/signup',
    getUserTickets: 'orders/userorders/',
    resultTickets: 'tickets/search/',
    cities: 'cities/',
    companies: 'companies/',
    flights: 'flights/',
    getLanguages: 'languages',
    addFlight: 'flights/add',
    popularCities: 'cities/popular/',
    userHistory: 'account/iphistory',
    userCart: 'orders/cart/',
    userOrder: 'orders/cart/submit',
    ticketCancellation: 'orders/userorders/cancel',
    addTickets: 'tickets/add',
    addCity: 'cities/add',
    addCompany: 'companies/add',
    addLanguage: 'languages/add',
  },
  locale_ru: {
    months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
      '_',
    ),
    monthsShort: 'Янв._Фев._Мар_Aпр._Май_Июн_Июл._Авг_Сен._Окт._Ноя._Дек.'.split(
      '_',
    ),
    monthsParseExact: true,
    weekdays: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split(
      '_',
    ),
    weekdaysShort: 'Вс._Пн._Вт._Ср._Чт._Пт._Сб.'.split('_'),
    weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    weekdaysParseExact: true,
    week: {
      dow: 1,
      doy: 4,
    },
  },
};

export const config = CONFIG;
