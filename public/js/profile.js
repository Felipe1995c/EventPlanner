document.addEventListener('DOMContentLoaded', () => {
    // chart.js initialization
    const ctx = document.getElementById('myChart').getContext('2d');
    const data = {
        labels: ['Budget Used', 'Remaining Budget'],
        datasets: [{
            label: 'Budget Distribution',
            data: [0, 0], // initial data
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
    };

    const myChart = new Chart(ctx, config);

    // elements for dress code selection
    const dressCodeRadios = document.getElementsByName('event-dress-code');
    const themeNameGroup = document.getElementById('theme-name-group');

    // elements for budget options
    const budgetRadios = document.getElementsByName('budget-option');
    const budgetAmountGroup = document.getElementById('budget-amount-group');

    // elements for food options
    const foodRadios = document.getElementsByName('food-option');
    const foodBudgetGroup = document.getElementById('food-budget-group');

    // elements for rental options
    const rentalsRadios = document.getElementsByName('rentals-option');
    const rentalsBudgetGroup = document.getElementById('rentals-budget-group');

    // elements for supplies options
    const suppliesRadios = document.getElementsByName('supplies-option');
    const suppliesBudgetGroup = document.getElementById('supplies-budget-group');

    // elements for entertainment options
    const entertainmentRadios = document.getElementsByName('entertainment-option');
    const entertainmentBudgetGroup = document.getElementById('entertainment-budget-group');

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
        } else {
            group.style.display = 'none';
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
    } else {
        themeNameGroup.style.display = 'none';
    }

    // toggle display for budget, food, rentals, supplies, and entertainment
    toggleDisplay(budgetRadios, budgetAmountGroup);
    toggleDisplay(foodRadios, foodBudgetGroup);
    toggleDisplay(rentalsRadios, rentalsBudgetGroup);
    toggleDisplay(suppliesRadios, suppliesBudgetGroup);
    toggleDisplay(entertainmentRadios, entertainmentBudgetGroup);

    // event listener for form submission
    document.querySelector('.new-event-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const budget = document.getElementById('budget-yes').checked ? parseFloat(document.getElementById('event-budget').value.trim()) : 0;
        const totalBudget = 1000; // Assume a total budget value or fetch from user input or settings
        const remainingBudget = totalBudget - budget;

        myChart.data.datasets[0].data = [budget, remainingBudget];
        myChart.update();

        // create a new event object
        const newEvent = {
            name: document.getElementById('event-name').value.trim(),
            date: document.getElementById('event-date').value,
            location: document.getElementById('event-location').value.trim(),
            guests: document.getElementById('event-guests').value.trim(), // Corrected this line
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