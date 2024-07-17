document.addEventListener('DOMContentLoaded', () => {
    const dressCodeRadios = document.getElementsByName('event-dress-code');
    const themeNameGroup = document.getElementById('theme-name-group');

    dressCodeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (document.getElementById('dress-code-themed').checked) {
                themeNameGroup.style.display = 'block';
            } else {
                themeNameGroup.style.display = 'none';
            }
        });
    });

    if (document.getElementById('dress-code-themed').checked) {
        themeNameGroup.style.display = 'block';
    }

    document.querySelector('.new-event-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const newEvent = {
            name: document.getElementById('event-name').value.trim(),
            date: document.getElementById('event-date').value,
            location: document.getElementById('event-location').value.trim(),
            dress_code: document.querySelector('input[name="event-dress-code"]:checked').value,
            theme_name: document.getElementById('dress-code-themed').checked ? document.getElementById('theme-name').value.trim() : '',
            budget: document.getElementById('event-budget').value.trim(),
            food: document.getElementById('event-food').value.trim(),
            rentals: document.getElementById('event-rentals').value.trim(),
            supplies: document.getElementById('event-supplies').value.trim(),
            entertainment: document.getElementById('event-entertainment').value.trim()
        };

        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(newEvent),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create event');
        }
    });
});