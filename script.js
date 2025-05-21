// Sample bus data
const busData = [
    {
        id: 1,
        name: "Express Deluxe",
        from: "Mumbai",
        to: "Pune",
        departureTime: "08:00 AM",
        arrivalTime: "11:30 AM",
        duration: "3h 30m",
        price: 45,
        seats: 20,
        date: "2023-12-15"
    },
    {
        id: 2,
        name: "City Shuttle",
        from: "Mumbai",
        to: "Pune",
        departureTime: "10:15 AM",
        arrivalTime: "02:00 PM",
        duration: "3h 45m",
        price: 35,
        seats: 12,
        date: "2023-12-15"
    },
    {
        id: 3,
        name: "Premium Travels",
        from: "Mumbai",
        to: "Pune",
        departureTime: "01:30 PM",
        arrivalTime: "05:15 PM",
        duration: "3h 45m",
        price: 55,
        seats: 28,
        date: "2023-12-15"
    },
    {
        id: 4,
        name: "Night Rider",
        from: "Mumbai",
        to: "Pune",
        departureTime: "10:00 PM",
        arrivalTime: "02:30 AM",
        duration: "4h 30m",
        price: 40,
        seats: 15,
        date: "2023-12-15"
    },
    // Additional routes
    {
        id: 5,
        name: "East Coast Express",
        from: "Mumbai",
        to: "Delhi",
        departureTime: "07:00 AM",
        arrivalTime: "12:00 PM",
        duration: "5h 00m",
        price: 40,
        seats: 18,
        date: "2023-12-15"
    },
    {
        id: 6,
        name: "Metro Shuttle",
        from: "Pune",
        to: "Ahmedabad",
        departureTime: "06:30 AM",
        arrivalTime: "12:30 PM",
        duration: "6h 00m",
        price: 45,
        seats: 22,
        date: "2023-12-15"
    },
    {
        id: 7,
        name: "Capital Connector",
        from: "Delhi",
        to: "Ahmedabad",
        departureTime: "08:00 AM",
        arrivalTime: "10:30 AM",
        duration: "2h 30m",
        price: 25,
        seats: 15,
        date: "2023-12-15"
    },
    {
        id: 8,
        name: "Liberty Line",
        from: "Mumbai",
        to: "Ahmedabad",
        departureTime: "09:00 AM",
        arrivalTime: "11:00 AM",
        duration: "2h 00m",
        price: 20,
        seats: 30,
        date: "2023-12-15"
    },
    {
        id: 9,
        name: "Patriot Express",
        from: "Pune",
        to: "Delhi",
        departureTime: "07:00 AM",
        arrivalTime: "03:00 PM",
        duration: "8h 00m",
        price: 55,
        seats: 25,
        date: "2023-12-15"
    },
    {
        id: 10,
        name: "Harbor Line",
        from: "Mumbai",
        to: "Nagpur",
        departureTime: "10:00 AM",
        arrivalTime: "02:30 PM",
        duration: "4h 30m",
        price: 30,
        seats: 20,
        date: "2023-12-15"
    }
];

// DOM Elements
const searchForm = document.querySelector('.search-form');
const resultsSection = document.querySelector('.results-section');
const bookingSection = document.querySelector('.booking-section');
const confirmationSection = document.querySelector('.confirmation-section');
const busList = document.getElementById('bus-list');
const sortBy = document.getElementById('sort-by');
const newBookingBtn = document.getElementById('new-booking');

// Navigation Elements
const homeLink = document.getElementById('home-link');
const routesLink = document.getElementById('routes-link');
const contactLink = document.getElementById('contact-link');
const footerHomeLink = document.getElementById('footer-home-link');
const footerRoutesLink = document.getElementById('footer-routes-link');
const footerContactLink = document.getElementById('footer-contact-link');

// Section Elements
const homeSection = document.getElementById('home-section');
const routesSection = document.getElementById('routes-section');
const contactSection = document.getElementById('contact-section');

// Current booking information
let currentBooking = {
    bus: null,
    passenger: null
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

// Event Listeners
document.getElementById('search-btn').addEventListener('click', searchBuses);
sortBy.addEventListener('change', sortBuses);
newBookingBtn.addEventListener('click', resetBooking);

// Navigation Event Listeners
homeLink.addEventListener('click', () => showSection('home'));
routesLink.addEventListener('click', () => showSection('routes'));
contactLink.addEventListener('click', () => showSection('contact'));
footerHomeLink.addEventListener('click', () => showSection('home'));
footerRoutesLink.addEventListener('click', () => showSection('routes'));
footerContactLink.addEventListener('click', () => showSection('contact'));

// Show specific section
function showSection(section) {
    // Hide all sections
    homeSection.classList.add('hidden');
    routesSection.classList.add('hidden');
    contactSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    bookingSection.classList.add('hidden');
    confirmationSection.classList.add('hidden');

    // Show selected section
    if (section === 'home') {
        homeSection.classList.remove('hidden');
        document.querySelector('.search-section').classList.remove('hidden');
        homeLink.classList.add('active');
        routesLink.classList.remove('active');
        contactLink.classList.remove('active');
    } else if (section === 'routes') {
        routesSection.classList.remove('hidden');
        homeLink.classList.remove('active');
        routesLink.classList.add('active');
        contactLink.classList.remove('active');
    } else if (section === 'contact') {
        contactSection.classList.remove('hidden');
        homeLink.classList.remove('active');
        routesLink.classList.remove('active');
        contactLink.classList.add('active');
    }
}

// Search buses function
function searchBuses() {
    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();
    const date = document.getElementById('date').value;

    if (!from || !to || !date) {
        alert('Please fill in all fields');
        return;
    }

    // Filter buses based on search criteria
    const filteredBuses = busData.filter(bus => 
        bus.from.toLowerCase().includes(from.toLowerCase()) &&
        bus.to.toLowerCase().includes(to.toLowerCase()) &&
        bus.date === date
    );

    if (filteredBuses.length === 0) {
        alert('No buses found for your search criteria');
        return;
    }

    // Open new tab and show bus selection and passenger input
    const newTab = window.open('', '_blank');
    if (!newTab) {
        alert('Popup blocked! Please allow popups for this site.');
        return;
    }

    // Prepare HTML for new tab
    let html = `
        <html>
        <head>
            <title>Select Bus & Passengers</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 30px; }
                .bus-card { border: 1px solid #ccc; padding: 16px; margin-bottom: 16px; border-radius: 8px; }
                .bus-name { font-weight: bold; font-size: 1.2em; }
                .bus-route, .bus-timings, .bus-duration { margin: 4px 0; }
                .bus-pricing { margin-top: 8px; }
                .select-btn { margin-top: 8px; padding: 6px 16px; }
                .amount-section { margin-top: 24px; }
            </style>
        </head>
        <body>
            <h2>Select a Bus</h2>
            <div id="bus-list">
    `;

    filteredBuses.forEach(bus => {
        html += `
            <div class="bus-card">
                <div class="bus-name">${bus.name}</div>
                <div class="bus-route">${bus.from} → ${bus.to}</div>
                <div class="bus-timings">Dep: ${bus.departureTime} | Arr: ${bus.arrivalTime}</div>
                <div class="bus-duration">Duration: ${bus.duration}</div>
                <div class="bus-pricing">Price per seat: ₹${bus.price} | Seats available: ${bus.seats}</div>
                <button class="select-btn" onclick="selectBus(${bus.id})">Select This Bus</button>
            </div>
        `;
    });

    html += `
            </div>
            <div id="passenger-section" style="display:none;">
                <h3>Enter Number of Passengers</h3>
                <input type="number" id="num-passengers" min="1" value="1" style="width:60px;">
                <button onclick="calculateAmount()">Calculate Amount</button>
                <div id="amount-result" class="amount-section"></div>
            </div>
            <script>
                let selectedBus = null;
                let busData = ${JSON.stringify(filteredBuses)};
                function selectBus(busId) {
                    selectedBus = busData.find(b => b.id === busId);
                    document.getElementById('passenger-section').style.display = '';
                    document.getElementById('amount-result').innerHTML = '';
                }
                function calculateAmount() {
                    const num = parseInt(document.getElementById('num-passengers').value);
                    if (!selectedBus) {
                        alert('Please select a bus first.');
                        return;
                    }
                    if (num < 1 || num > selectedBus.seats) {
                        alert('Please enter a valid number of passengers (max: ' + selectedBus.seats + ')');
                        return;
                    }
                    const amount = num * selectedBus.price;
                    document.getElementById('amount-result').innerHTML = 
                        '<strong>Total Amount:</strong> ₹' + amount + '<br>' +
                        '<strong>Bus:</strong> ' + selectedBus.name + '<br>' +
                        '<strong>From:</strong> ' + selectedBus.from + ' <strong>To:</strong> ' + selectedBus.to;
                }
            </script>
        </body>
        </html>
    `;

    newTab.document.write(html);
    newTab.document.close();
}

// Display buses in the results section
function displayBuses(buses) {
    busList.innerHTML = '';

    buses.forEach(bus => {
        const busCard = document.createElement('div');
        busCard.className = 'bus-card';

        // Calculate total amount for all available seats
        const totalAmount = bus.price * bus.seats;

        busCard.innerHTML = `
            <div class="bus-info">
                <div class="bus-name">${bus.name}</div>
                <div class="bus-route">
                    <span class="bus-departure">${bus.from}</span>
                    <span>→</span>
                    <span class="bus-arrival">${bus.to}</span>
                </div>
                <div class="bus-timings">
                    <span>Dep: ${bus.departureTime}</span>
                    <span>Arr: ${bus.arrivalTime}</span>
                </div>
                <div class="bus-duration">Duration: ${bus.duration}</div>
            </div>
            <div class="bus-pricing">
                <div class="bus-price">₹${bus.price}</div>
                <div class="bus-seats">${bus.seats} seats available</div>
                <div class="bus-amount">Total Amount: ₹${totalAmount}</div>
                <button class="book-btn" data-id="${bus.id}">Book Now</button>
            </div>
        `;

        busList.appendChild(busCard);
    });

    // Add event listeners to all book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const busId = parseInt(e.target.getAttribute('data-id'));
            const selectedBus = busData.find(bus => bus.id === busId);
            startBookingProcess(selectedBus);
        });
    });
}

// Sort buses based on selected option
function sortBuses() {
    const buses = Array.from(document.querySelectorAll('.bus-card'));
    const sortValue = sortBy.value;

    buses.sort((a, b) => {
        if (sortValue === 'departure') {
            const timeA = a.querySelector('.bus-departure').textContent.split(':')[0];
            const timeB = b.querySelector('.bus-departure').textContent.split(':')[0];
            return parseInt(timeA) - parseInt(timeB);
        } else if (sortValue === 'arrival') {
            const timeA = a.querySelector('.bus-arrival').textContent.split(':')[0];
            const timeB = b.querySelector('.bus-arrival').textContent.split(':')[0];
            return parseInt(timeA) - parseInt(timeB);
        } else if (sortValue === 'price') {
            const priceA = parseFloat(a.querySelector('.bus-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.bus-price').textContent.replace('$', ''));
            return priceA - priceB;
        } else if (sortValue === 'seats') {
            const seatsA = parseInt(a.querySelector('.bus-seats').textContent);
            const seatsB = parseInt(b.querySelector('.bus-seats').textContent);
            return seatsB - seatsA;
        }
    });

    // Clear and re-append sorted buses
    busList.innerHTML = '';
    buses.forEach(bus => busList.appendChild(bus));
}

// Start booking process for selected bus
function startBookingProcess(bus) {
    currentBooking.bus = bus;
    
    // Fill in bus details
    document.getElementById('booking-bus-name').textContent = bus.name;
    document.getElementById('booking-departure').textContent = `${bus.from} (${bus.departureTime})`;
    document.getElementById('booking-arrival').textContent = `${bus.to} (${bus.arrivalTime})`;
    document.getElementById('booking-date').textContent = bus.date;
    document.getElementById('booking-duration').textContent = bus.duration;
    document.getElementById('booking-price').textContent = `$${bus.price}`;
    document.getElementById('booking-seats').textContent = bus.seats;

    // Show booking section
    resultsSection.classList.add('hidden');
    bookingSection.classList.remove('hidden');

    // Add event listener to confirm booking button
    document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
}

// Confirm booking and show confirmation
function confirmBooking() {
    const name = document.getElementById('passenger-name').value.trim();
    const age = document.getElementById('passenger-age').value.trim();
    const gender = document.getElementById('passenger-gender').value;
    const email = document.getElementById('passenger-email').value.trim();
    const phone = document.getElementById('passenger-phone').value.trim();
    const seats = document.getElementById('passenger-seats').value;

    if (!name || !age || !email || !phone) {
        alert('Please fill in all passenger details');
        return;
    }

    if (parseInt(seats) > currentBooking.bus.seats) {
        alert(`Only ${currentBooking.bus.seats} seats available`);
        return;
    }

    // Save passenger details
    currentBooking.passenger = {
        name,
        age,
        gender,
        email,
        phone,
        seats: parseInt(seats)
    };

    // Calculate total amount
    const totalAmount = currentBooking.bus.price * currentBooking.passenger.seats;

    // Generate random booking ID
    const bookingId = 'BK' + Math.floor(Math.random() * 1000000);

    // Fill in confirmation details
    document.getElementById('booking-id').textContent = bookingId;
    document.getElementById('confirmation-bus-name').textContent = currentBooking.bus.name;
    document.getElementById('confirmation-route').textContent = `${currentBooking.bus.from} to ${currentBooking.bus.to}`;
    document.getElementById('confirmation-date').textContent = `${currentBooking.bus.date} (${currentBooking.bus.departureTime})`;
    document.getElementById('confirmation-passenger').textContent = `${currentBooking.passenger.name} (${currentBooking.passenger.age} years)`;
    document.getElementById('confirmation-amount').textContent = `$${totalAmount}`;

    // Show confirmation section
    bookingSection.classList.add('hidden');
    confirmationSection.classList.remove('hidden');
}

// Reset booking process
function resetBooking() {
    // Clear form fields
    document.getElementById('from').value = '';
    document.getElementById('to').value = '';
    document.getElementById('date').value = '';
    document.getElementById('passenger-name').value = '';
    document.getElementById('passenger-age').value = '';
    document.getElementById('passenger-email').value = '';
    document.getElementById('passenger-phone').value = '';
    document.getElementById('passenger-seats').value = '1';

    // Reset current booking
    currentBooking = {
        bus: null,
        passenger: null
    };

    // Show home section
    showSection('home');
}

// Contact form submission
document.getElementById('send-message').addEventListener('click', () => {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';
});