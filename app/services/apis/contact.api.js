import fetch from 'isomorphic-fetch';

const baseURL = '/api';

export const fetchAllContacts = () => {
  return fetch(`${baseURL}/contactall`)
    .then(response => response.json())
    .then(contacts => contacts)
    .catch(error => error)
};

export const fetchContact = id => (
  fetch(`${baseURL}/contact/${id}`)
  .then(response => response.json())
  .then(contact => contact)
  .catch(error => error)
);

export const newContact = data => (
  fetch(`${baseURL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...data})
  })
  .then(response => response)
  .catch(error => error)
);

export const updateContact = (data, id) => {
  return fetch(`${baseURL}/contact/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...data})
  })
  .then(response => response)
  .catch(error => error)
};

export const deleteContact = id => (
  fetch(`${baseURL}/contact/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(id => id)
  .catch(error => error)
);
