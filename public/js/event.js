const registerEventHandler = async (event) => {
    console.log("Running Register Logic")
    // we want to prevent the DEFAULT BROWSER BEHAVIOR (of refreshing the page)
    event.preventDefault()
    // we need to capture the INPUT DATA
    const eventName= document.querySelector('event.name').value.trim();
    const eventDate = document.querySelector('event.date').value.trim();
    const eventLoction = document.querySelector('event.location').value.trim();
    const eventDressCode = document.querySelector('event.dress_code').value.trim();
    const eventTheme = document.querySelector('event.theme_name').value.trim();
    const eventBudget = document.querySelector('evemt.budget').value.trim();
    const eventFood = document.querySelector('event.food').value.trim();
    const eventRentals = document.querySelector('event.rentals').value.trim();
    const eventSupplies = document.querySelector('event.supplies').value.trim();
    const eventEntertainment = document.querySelector('event.entertainment').value.trim();
    // NOW we HAVE data --> Lets SEND it to our SERVER/API 
    // We run a little validation
    if (name && date && location && dress_code && theme_name && budget && food && rentals && supplies && entertainment) {
      const response = await fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify({ name, date, location, dress_code, theme_name, budget, food, rentals, supplies, entertainment }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("API response: ", response)
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to Register Event');
      }
    }
  }
  
  document
    .querySelector('.event-form')
    .addEventListener('submit', registerEventHandler);