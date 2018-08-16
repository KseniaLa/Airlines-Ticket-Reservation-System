export function addTicket(key, ticketInfo) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([ticketInfo]));
    return true;
  }
  const currElement = JSON.parse(localStorage.getItem(key));
  // replace
  for (let i = 0; i < currElement.length; i++) {
    if (currElement[i].ticket === ticketInfo.ticket) {
      return false;
    }
  }
  currElement.push = [].push;
  currElement.push(ticketInfo);
  localStorage.setItem(key, JSON.stringify(currElement));
  return true;
}

export function deleteTicket(key, ticketId) {
  if (localStorage.getItem(key) === null) {
    return true;
  }
  const currElement = JSON.parse(localStorage.getItem(key));
  const newTicketArray = currElement.filter(
    element => element.ticket !== ticketId,
  );
  localStorage.setItem(key, JSON.stringify(newTicketArray));
  return true;
}
