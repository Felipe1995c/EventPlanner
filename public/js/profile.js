document.addEventListener('DOMContentLoaded', () => {
    
    // elements for dress code selection
    const dressCode = document.getElementsByName('event-dress-code');
    const themeName = document.getElementById('theme-name-group');

    // elements for budget options
    const budget = document.getElementsByName('budget-option');
    const budgetAmount = document.getElementById('budget-amount-group');

    // elements for food options
    const food = document.getElementsByName('food-option');
    const foodBudget = document.getElementById('food-budget-group');

    // elements for rental options
    const rentals = document.getElementsByName('rentals-option');
    const rentalsBudget = document.getElementById('rentals-budget-group');

    // elements for supplies options
    const supplies = document.getElementsByName('supplies-option');
    const suppliesBudget = document.getElementById('supplies-budget-group');

    // elements for entertainment options
    const entertainment = document.getElementsByName('entertainment-option');
    const entertainmentBudget = document.getElementById('entertainment-budget-group');

    // show or hide input groups based on radio selection
    const toggleDisplay = (radios, group) => {
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked && radio.value === 'yes') {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
        });

        // check initial state
        if (document.querySelector(`input[name="${radios[0].name}"]:checked`).value === 'yes') {
            group.style.display = 'block';
        }
    };

    // toggle display of theme name input based on dress code selection
    dressCodeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (document.getElementById('dress-code-themed').checked) {
                themeNameGroup.style.display = 'block';
            } else {
                themeNameGroup.style.display = 'none';
            }
        });
    });

    // check for dress code
    if (document.getElementById('dress-code-themed').checked) {
        themeNameGroup.style.display = 'block';
    }

    // toggle display for budget, food, rentals, supplies, and entertainment
    toggleDisplay(budget, budgetAmount);
    toggleDisplay(food, foodBudget);
    toggleDisplay(rentals, rentalsBudget);
    toggleDisplay(supplies, suppliesBudget);
    toggleDisplay(entertainment, entertainmentBudget);
    // event listener for form submission
    document.querySelector('.new-event-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        // create a new event object
        const newEvent = {
            name: document.getElementById('event-name').value.trim(),
            date: document.getElementById('event-date').value,
            location: document.getElementById('event-location').value.trim(),
            guests: document.getElementById('event-guests').value.trim(),
            dress_code: document.querySelector('input[name="event-dress-code"]:checked').value,
            theme_name: document.getElementById('dress-code-themed').checked ? document.getElementById('theme-name').value.trim() : '',
            budget: document.getElementById('budget-yes').checked ? document.getElementById('event-budget').value.trim() : '',
            food_budget: document.getElementById('food-yes').checked ? document.getElementById('food-budget').value.trim() : '',
            rentals_budget: document.getElementById('rentals-yes').checked ? document.getElementById('rentals-budget').value.trim() : '',
            supplies_budget: document.getElementById('supplies-yes').checked ? document.getElementById('supplies-budget').value.trim() : '',
            entertainment_budget: document.getElementById('entertainment-yes').checked ? document.getElementById('entertainment-budget').value.trim() : ''
        };

        // send new event data to server
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(newEvent),
            headers: { 'Content-Type': 'application/json' }
        });

        // handle response
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create event');
        }
    });
});