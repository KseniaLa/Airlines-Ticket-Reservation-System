export function loginPost(email, password) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
}

export function signupPost(name, surname, email, password) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      date,
      flightClass,
    }),
  };
}
