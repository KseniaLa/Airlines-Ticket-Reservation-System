import { defineMessages } from 'react-intl';

export default defineMessages({
  signin: {
    id: 'app.components.SignInPage.signin',
    defaultMessage: 'Войти',
  },
  signup: {
    id: 'app.components.SignInPage.signup',
    defaultMessage: 'Зарегистрироваться',
  },
  signuptitle: {
    id: 'app.components.SignInPage.signuptitle',
    defaultMessage: 'Регистрация',
  },
  signintitle: {
    id: 'app.components.SignInPage.signintitle',
    defaultMessage: 'Авторизация',
  },
  newuser: {
    id: 'app.components.SignInPage.newuser',
    defaultMessage: 'Я новый пользователь',
  },
  loginexists: {
    id: 'app.components.SignInPage.loginexists',
    defaultMessage: 'Уже есть логин',
  },
  name: {
    id: 'app.components.SignInPage.name',
    defaultMessage: 'имя',
  },
  surname: {
    id: 'app.components.SignInPage.surname',
    defaultMessage: 'фамилия',
  },
  email: {
    id: 'app.components.SignInPage.email',
    defaultMessage: 'e-mail',
  },
  password: {
    id: 'app.components.SignInPage.password',
    defaultMessage: 'пароль',
  },
  invalidinput: {
    id: 'app.components.SignInPage.invalidinput',
    defaultMessage: 'Некоторые поля содержат некорректные значения либо пусты',
  },
  invalidpass: {
    id: 'app.components.SignInPage.invalidpass',
    defaultMessage: 'Минимальная длина пароля - 8 символов',
  },
  invalidemail: {
    id: 'app.components.SignInPage.invalidemail',
    defaultMessage: 'Неверный формат электронной почты',
  },
  invalidemailpassword: {
    id: 'app.components.SignInPage.invalidemailpassword',
    defaultMessage: 'Неверный логин или пароль',
  },
  autherror: {
    id: 'app.components.SignInPage.autherror',
    defaultMessage: 'Ошибка авторизации. Повторите запрос позже',
  },
  signupsuccess: {
    id: 'app.components.SignInPage.signupsuccess',
    defaultMessage: 'Вы успешно зарегистрировались!',
  },
  shortpassword: {
    id: 'app.components.SignInPage.shortpassword',
    defaultMessage: 'Пароль должен быть длиннее 8 символов',
  },
  userexists: {
    id: 'app.components.SignInPage.userexists',
    defaultMessage: 'Пользователь с таким e-mail уже зарегистрирован',
  },
});
