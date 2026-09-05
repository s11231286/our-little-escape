// ======================================
// OUR LITTLE ESCAPE ♡
// ======================================


// Store all selections

let visitorName = "";

let selectedVibe = "";

let selectedDate = "";

let selectedTime = "";

let selectedExtra = "";


// ======================================
// START EXPERIENCE
// ======================================

function startExperience() {

    const nameInput =
        document
            .getElementById("visitorName")
            .value
            .trim();


    const error =
        document
            .getElementById("entryError");


    // Make sure a name was entered

    if (nameInput === "") {

        error.innerText =
            "I need your name first, pretty please ♡";

        return;

    }


    // Save their name

    visitorName =
        nameInput;


    // Remove error message

    error.innerText =
        "";


    // Personalise next screen

    document
        .getElementById("personalHeading")
        .innerHTML =
        `Okay, ${escapeHTML(visitorName)}...<br>
        can I steal you for a little while?`;


    // Go to invitation

    nextScreen(1);

}


// ======================================
// CHANGE SCREEN
// ======================================

function nextScreen(number) {

    // Hide every screen

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen
                .classList
                .remove("active");

        });


    // Show requested screen

    document
        .getElementById(
            "screen" + number
        )
        .classList
        .add("active");


    // Scroll up

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ======================================
// SUSPICIOUS BUTTON
// ======================================

function changeQuestion() {

    document
        .getElementById("secretMessage")
        .innerText =
        "Probably. But the good kind of suspicious. 😌";

}


// ======================================
// CHOOSE VIBE
// ======================================

function chooseVibe(
    button,
    vibe
) {

    // Remove previous selection

    document
        .querySelectorAll(".choice")
        .forEach(btn => {

            btn
                .classList
                .remove("selected");

        });


    // Highlight selected vibe

    button
        .classList
        .add("selected");


    // Save vibe

    selectedVibe =
        vibe;


    // Enable continue button

    document
        .getElementById("vibeNext")
        .classList
        .remove("disabled");

}


// ======================================
// DATE SELECTED
// ======================================

function dateSelected() {

    selectedDate =
        document
            .getElementById("datePicker")
            .value;


    if (selectedDate !== "") {

        // Show time options

        document
            .getElementById("timeSection")
            .classList
            .remove("hidden");

    }

}


// ======================================
// CHOOSE TIME
// ======================================

function chooseTime(
    button,
    time
) {

    // Remove previous selection

    document
        .querySelectorAll(
            ".times button"
        )
        .forEach(btn => {

            btn
                .classList
                .remove("selected");

        });


    // Highlight chosen time

    button
        .classList
        .add("selected");


    // Save time

    selectedTime =
        time;


    // Enable next button

    document
        .getElementById("dateNext")
        .classList
        .remove("disabled");

}


// ======================================
// CHOOSE EXTRA
// ======================================

function chooseExtra(
    button,
    extra
) {

    // Remove previous selection

    document
        .querySelectorAll(
            ".extras button"
        )
        .forEach(btn => {

            btn
                .classList
                .remove("selected");

        });


    // Highlight selected extra

    button
        .classList
        .add("selected");


    // Save extra

    selectedExtra =
        extra;


    // Enable final button

    document
        .getElementById("extraNext")
        .classList
        .remove("disabled");

}


// ======================================
// SHOW FINAL TICKET
// ======================================

function showFinal() {

    // Safety check

    if (
        visitorName === "" ||
        selectedVibe === "" ||
        selectedDate === "" ||
        selectedTime === "" ||
        selectedExtra === ""
    ) {

        return;

    }


    // Make date readable

    const formattedDate =

        new Date(
            selectedDate +
            "T00:00:00"
        )

        .toLocaleDateString(

            "en-US",

            {

                weekday:
                    "long",

                month:
                    "long",

                day:
                    "numeric",

                year:
                    "numeric"

            }

        );


    // Put name on ticket

    document
        .getElementById("finalName")
        .innerText =
        visitorName;


    // Put date on ticket

    document
        .getElementById("finalDate")
        .innerText =
        formattedDate;


    // Put time on ticket

    document
        .getElementById("finalTime")
        .innerText =
        selectedTime;


    // Put vibe on ticket

    document
        .getElementById("finalVibe")
        .innerText =
        selectedVibe;


    // Put extra on ticket

    document
        .getElementById("finalExtra")
        .innerText =
        selectedExtra;


    // Personal final message

    document
        .getElementById("finalGreeting")
        .innerText =
        `Excellent decision, ${visitorName}. ♡`;


    // Show final screen

    nextScreen(5);

}


// ======================================
// COPY DATE PLAN
// ======================================

function copyPlan() {

    const dateText =

        document
            .getElementById("finalDate")
            .innerText;


    const text =

`♡ OUR LITTLE ESCAPE ♡

For: ${visitorName}

Date: ${dateText}
Time: ${selectedTime}
Vibe: ${selectedVibe}
Essential: ${selectedExtra}

It's a date ♡`;


    // Try copying

    navigator
        .clipboard
        .writeText(text)

        .then(() => {

            document
                .getElementById("copyMessage")
                .innerText =
                "Copied ♡ Now you have no excuse to forget.";

        })

        .catch(() => {

            document
                .getElementById("copyMessage")
                .innerText =
                "Our date is officially locked in ♡";

        });

}


// ======================================
// RESTART
// ======================================

function restart() {

    location.reload();

}


// ======================================
// PROTECT PERSONAL HEADING
// ======================================

function escapeHTML(text) {

    const div =
        document
            .createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


// ======================================
// PAGE SETUP
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        const datePicker =

            document
                .getElementById(
                    "datePicker"
                );


        // Today's date

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =

            String(
                today.getMonth() + 1
            )

            .padStart(
                2,
                "0"
            );


        const day =

            String(
                today.getDate()
            )

            .padStart(
                2,
                "0"
            );


        // Prevent past dates

        datePicker.min =
            `${year}-${month}-${day}`;


        // Press Enter on name field

        document
            .getElementById("visitorName")
            .addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        startExperience();

                    }

                }
            );

    }

);