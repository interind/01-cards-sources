const container = document.querySelector('.container');
const templateCard = document.querySelector('#card').content;
const body = document.querySelector('.body');
const cars = [
 {
  name: 'Lamborghini',
  link: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80',
  active: getStorage('Lamborghini'),
 },
  {
   name: 'Mercedes',
   link: 'https://images.unsplash.com/photo-1546518071-fddcdda7580a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
   active: getStorage('Mercedes'),
  },
  {
   name: 'BMW',
   link: 'https://images.unsplash.com/photo-1593460354583-4224ab273cfe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80',
   active: getStorage('BMW'),
  },
  {
   name: 'Porsche',
   link: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
   active: getStorage('Porsche'),
  },
  {
   name: 'Ferrari',
   link: 'https://images.unsplash.com/photo-1542038428-25a73671ca6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
   active: getStorage('Ferrari'),
  },
  {
   name: 'Audi',
   link: 'https://images.unsplash.com/photo-1555652736-e92021d28a10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
   active: getStorage('Audi'),
  },
 ];

 function toggleActiveCard(evt, name, bool) {
  if(evt.target.classList.contains('slide')) {
    clearActiveCard();
    evt.target.classList.toggle('active');
    setStorage(name, bool);
    body.style.backgroundImage = evt.target.style.backgroundImage;
    setStorage('body', evt.target.style.backgroundImage);
  }
 }

 function clearActiveCard() {
   localStorage.clear();
   container.querySelectorAll('.slide').forEach((item) => item.classList.remove('active'));
 }

 function addCard(card) {
   container.append(card);
 }

 function setStorage(name, bool) {
   if (bool) {
     localStorage.setItem(name, bool);
   }
 }

 function getStorage(name) {
   if (localStorage.getItem(name)) {
     return true;
   } else {
     return false;
   };
 }

 function createCard({name, link, active}) {
  const card = templateCard.cloneNode(true);
  const slide = card.querySelector('.slide');
  const title = slide.querySelector('.title');
  slide.style.backgroundImage = `url(${link})`;
  slide.addEventListener('mousedown', (evt) => {
    toggleActiveCard(evt, name, active);
  });
  title.textContent = name;

  setStorage(name, active);
  if (localStorage.getItem('body')) {
    body.style.backgroundImage = localStorage.getItem('body');
  } else if (active) {
    body.style.backgroundImage = slide.style.backgroundImage;
    setStorage('body', body.style.backgroundImage);
  }

  active && slide.classList.add('active');

  return card;
}

cars.forEach((car) => addCard(createCard(car)));