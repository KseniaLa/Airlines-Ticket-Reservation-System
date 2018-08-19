// create universal methods!!!

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

export function emptyGet() {
  return {
    method: 'GET',
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

export function getTicketsPost(ticketsArr, token) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body:
      ticketsArr === null ? JSON.stringify('[]') : JSON.stringify(ticketsArr),
  };
}

export function cancelTicketPost(ticketId, token) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: ticketId,
  };
}

export function authPut(content, token) {
  return {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  };
}

export function authPutString(content, token) {
  return {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(JSON.stringify(content)),
  };
}
