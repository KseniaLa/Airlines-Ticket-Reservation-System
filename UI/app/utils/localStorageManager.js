export function addTicket(key, ticketInfo) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([ticketInfo]));
    return;
  }
  const currElement = JSON.parse(localStorage.getItem(key));
  currElement.push = [].push;
  currElement.push(ticketInfo);
  localStorage.setItem(key, JSON.stringify(currElement));
}
