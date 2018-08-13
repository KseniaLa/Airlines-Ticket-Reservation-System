function getJsonTypePost() {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
}

export function getPostMethod(bodyContent) {
  return {
    ...getJsonTypePost(),
    body: JSON.stringify(bodyContent),
  };
}

export function loginPost(email, password) {
  return {
    ...getJsonTypePost(),
    body: JSON.stringify({
      email,
      password,
    }),
  };
}

export function signupPost(name, surname, email, password) {
  return {
    ...getJsonTypePost(),
    body: JSON.stringify({
      name,
      surname,
      email,
      password,
    }),
  };
}

export function authGet(token) {
  return {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function searchPost(from, to, date, flightClass) {
  return {
    ...getJsonTypePost(),
    body: JSON.stringify({
      from,
      to,
      date,
      flightClass,
    }),
  };
}
