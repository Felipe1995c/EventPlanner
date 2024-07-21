const registerEventHandler = async (event) => {
    console.log("Running Event Logic")
    // we want to prevent the DEFAULT BROWSER BEHAVIOR (of refreshing the page)
    event.preventDefault()
    // we need to capture the INPUT DATA
    const eventName= document.querySelector('#event-name').value.trim();
    const eventDate = document.querySelector('#event-date').value.trim();
    const eventLocation = document.querySelector('#event-location').value.trim();
    const guests = document.querySelector('#guests').value.trim();
    const eventDressCode = document.querySelector('input[name="event-dress-code"]:checked').value;
    const eventTheme = document.querySelector('#theme-name').value.trim();
    const eventBudget = document.querySelector('#budget').value.trim();
    const eventFood = document.querySelector('input[name="food-option"]:checked').value;
    const eventRentals = document.querySelector('input[name="rentals-option"]:checked').value;
    const eventSupplies = document.querySelector('input[name="supplies-option"]:checked').value;
    const eventEntertainment = document.querySelector('input[name="entertainment-option"]:checked').value;
    // NOW we HAVE data --> Lets SEND it to our SERVER/API 
    // We run a little validation
  console.log("Form Data:", 
              eventName, 
              eventDate, 
              eventLocation, 
              guests, 
              eventDressCode,
              eventTheme,
              eventBudget,
              eventFood,
              eventRentals,
              eventSupplies,
              eventEntertainment
              );

              console.log("Event Theme: ", eventTheme)

    if (
      eventName &&
      eventDate && 
      eventLocation && 
      guests &&
      eventDressCode &&
      eventTheme &&
      eventBudget &&
      eventFood &&
      eventRentals &&
     eventSupplies &&
      eventEntertainment
      ) {
       console.log("Data Valid...")
      const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ 
          eventName, 
          eventDate, 
          eventLocation, 
          guests, 
          eventDressCode,
          eventTheme,
          eventBudget,
          eventFood,
          eventRentals,
          eventSupplies,
          eventEntertainment }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("API response: ", response)
      if (response.ok) {
        document.location.replace('/events');
      } else {
        alert('Failed to Register Event');
      }
    }
  }
  
  document
    .querySelector('.new-event-form')
    .addEventListener('submit', registerEventHandler);