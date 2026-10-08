/* =========================================================
   PASSWORD
========================================================= */

const MOTHER_BIRTHDAY = "1009";
const SON_BIRTHDAY = "0704";


/* =========================================================
   LOCAL STORAGE KEYS
========================================================= */

const DINNER_USED_KEY =
    "momBirthdayDinnerTicketUsed";

const CLEANING_USED_KEY =
    "momBirthdayCleaningTicketUsed";


/* =========================================================
   SELECTED TICKET
========================================================= */

let selectedTicket = null;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadTicketStatus();

    setupNumberInput("motherBirthday");
    setupNumberInput("sonBirthday");

});


/* =========================================================
   NUMERIC INPUT
========================================================= */

function setupNumberInput(id) {

    const input = document.getElementById(id);

    if (!input) {
        return;
    }

    input.addEventListener("input", function () {

        this.value = this.value.replace(/[^0-9]/g, "");

    });

}


/* =========================================================
   LOGIN
========================================================= */

function checkPassword() {

    const motherBirthday =
        document.getElementById("motherBirthday").value;

    const sonBirthday =
        document.getElementById("sonBirthday").value;

    const error =
        document.getElementById("loginError");


    if (
        motherBirthday === MOTHER_BIRTHDAY &&
        sonBirthday === SON_BIRTHDAY
    ) {

        error.textContent = "";

        document.getElementById("loginScreen")
            .classList.add("hidden");

        document.getElementById("mainContent")
            .classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        error.textContent =
            "入力された誕生日が正しくありません。";

    }

}


/* =========================================================
   ENTER KEY LOGIN
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const loginScreen =
            document.getElementById("loginScreen");

        if (
            loginScreen &&
            !loginScreen.classList.contains("hidden")
        ) {

            checkPassword();

        }

    }

});


/* =========================================================
   TICKET CONFIRMATION
========================================================= */

function confirmUseTicket(ticketType) {

    if (ticketType === "dinner") {

        if (
            localStorage.getItem(DINNER_USED_KEY) === "true"
        ) {
            return;
        }

    }


    if (ticketType === "cleaning") {

        if (
            localStorage.getItem(CLEANING_USED_KEY) === "true"
        ) {
            return;
        }

    }


    selectedTicket = ticketType;

    document
        .getElementById("confirmModal")
        .classList.remove("hidden");

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    selectedTicket = null;

    document
        .getElementById("confirmModal")
        .classList.add("hidden");

}


/* =========================================================
   USE TICKET
========================================================= */

function useSelectedTicket() {

    if (!selectedTicket) {
        return;
    }


    if (selectedTicket === "dinner") {

        localStorage.setItem(
            DINNER_USED_KEY,
            "true"
        );

        setTicketUsed("dinner");

    }


    if (selectedTicket === "cleaning") {

        localStorage.setItem(
            CLEANING_USED_KEY,
            "true"
        );

        setTicketUsed("cleaning");

    }


    closeModal();

}


/* =========================================================
   CHANGE TICKET TO USED
========================================================= */

function setTicketUsed(ticketType) {

    if (ticketType === "dinner") {

        const ticket =
            document.getElementById("dinnerTicket");

        const button =
            document.getElementById("dinnerButton");

        const status =
            document.getElementById("dinnerStatus");


        ticket.classList.add("used");

        button.textContent = "使用済み";

        status.textContent = "USED";

    }


    if (ticketType === "cleaning") {

        const ticket =
            document.getElementById("cleaningTicket");

        const button =
            document.getElementById("cleaningButton");

        const status =
            document.getElementById("cleaningStatus");


        ticket.classList.add("used");

        button.textContent = "使用済み";

        status.textContent = "USED";

    }

}


/* =========================================================
   LOAD SAVED TICKET STATUS
========================================================= */

function loadTicketStatus() {

    const dinnerUsed =
        localStorage.getItem(DINNER_USED_KEY);

    const cleaningUsed =
        localStorage.getItem(CLEANING_USED_KEY);


    if (dinnerUsed === "true") {

        setTicketUsed("dinner");

    }


    if (cleaningUsed === "true") {

        setTicketUsed("cleaning");

    }

}


/* =========================================================
   CLOSE MODAL BY BACKGROUND CLICK
========================================================= */

document.addEventListener("click", function (event) {

    const modal =
        document.getElementById("confirmModal");

    if (!modal) {
        return;
    }

    if (
        event.target.classList.contains("modal-background")
    ) {

        closeModal();

    }

});