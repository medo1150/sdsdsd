const form = document.getElementById("appointment-form");
const nameInput = document.getElementById("name");
const timeInput = document.getElementById("time");
const confirmation = document.getElementById("confirmation");
const userNameSpan = document.getElementById("user-name");
const appointmentTimeSpan = document.getElementById("appointment-time");
const appointmentList = document.getElementById("appointment-list");

let appointments = []; // Array to store appointments
let availableTimes = []; // To store available times

// Populate time options (from 09:00 to 18:00 in 45-minute intervals)
for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
        const option = document.createElement("option");
        let formattedHour = hour < 10 ? `0${hour}` : hour; // Format the hour to 2 digits
        let formattedMinute = minute === 0 ? "00" : "30"; // Format minutes as 00 or 45
        const time = `${formattedHour}:${formattedMinute}`;
        
        option.value = time;        // Set the value of the option
        option.textContent = time;  // Set the text content to show in the dropdown
        timeInput.appendChild(option); // Add the option to the select element
        availableTimes.push(time);   // Add the time to available times
    }
}

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const time = timeInput.value;

    if (!name || !time || availableTimes.indexOf(time) === -1) {
        alert("Bitte geben Sie einen gültigen Namen und eine Uhrzeit an.");
        return;
    }

    // Mark the time as booked
    availableTimes = availableTimes.filter(t => t !== time);

    // Save the appointment
    appointments.push({ name, time });

    // Show confirmation message
    userNameSpan.textContent = name;
    appointmentTimeSpan.textContent = time;
    confirmation.classList.remove("hidden");

    // Update the appointments list
    updateAppointmentList();

    // Clear form
    form.reset();
    populateTimeOptions(); // Update available times in dropdown
});

function updateAppointmentList() {
    appointmentList.innerHTML = ""; // Clear existing list

    appointments.forEach((appointment) => {
        const li = document.createElement("li");
        li.classList.add("booked");
        li.textContent = `${appointment.time} - ${appointment.name}`;
        appointmentList.appendChild(li);
    });
}

function populateTimeOptions() {
    // Disable booked times in the select dropdown
    const options = timeInput.querySelectorAll("option");
    options.forEach(option => {
        if (availableTimes.indexOf(option.value) === -1) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });
}