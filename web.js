/* ================= DEFAULT FALLBACK TEMPLATES ================= */

const headerHTML = `
<header class="site-header">
    <h1 id="headerTitle">Welcome to Webpage</h1>
 <p id="headerSubtitle">Student ID: GMCA</p>
</header>`;

const navHTML = `
<nav class="navbar">
    <div class="logo">GMCA</div>
    <ul class="nav-links">
        <li><a href="home.html">Home</a></li>
        <li class="dropdown">
            <a href="#" class="dropbtn">About Us ▾</a>
            <ul class="dropdown-menu">
                <li><a href="krushant.html">26GMCA43</a></li>
                <li><a href="mihir.html">26GMCA13</a></li>
                <li><a href="ronak.html">26GMCA37</a></li>
            </ul>
        </li>
        <li><a href="#">Services</a></li>
        <li><a href="data.html">Data</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="calculator.html">Calculator</a></li>
    </ul>
</nav>`;

const footerHTML = `
<div style="background-color: #f8f9fa; padding: 6px 0; text-align: center; border-top: 1px solid #e2e8f0;">
    <div class="visit-counter" style="background-color: #ffffff; color: #263445; border: 1px solid #d1d5db; border-radius: 20px; padding: 5px 18px; font-size: 15px; font-weight: bold; display: inline-block; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08); margin: 0;">
        👤 Visitor: <span id="visitCount">0</span>

         <button onclick="resetVisitCounter()" 
            style="margin-left: 10px; padding: 4px 10px; cursor: pointer;">
            Reset
         </button>
    </div>
</div>
<footer class="site-footer">    
    <p>&copy; 2026 Government MCA College, Maninagar. All Rights Reserved.</p>
</footer>`;


/* ================= DYNAMIC HEADER TITLE UPDATE ================= */

function updateHeaderForPage() {
    const headerTitleEl = document.querySelector("#header h1, #headerTitle");
    const headerSubEl = document.querySelector("#header p, #headerSubtitle");

    const pageUrl = window.location.href.toLowerCase();

    if (headerSubEl) headerSubEl.style.display = "block";

    if (pageUrl.includes("krushant.html")) {
        if (headerTitleEl) headerTitleEl.innerText = "Welcome to Krushant Mulani Webpage";
        if (headerSubEl) headerSubEl.innerText = "Student ID: 26GMCA43";
    } else if (pageUrl.includes("mihir.html")) {
        if (headerTitleEl) headerTitleEl.innerText = "Welcome to Mihir Bhayani Webpage";
        if (headerSubEl) headerSubEl.innerText = "Student ID: 26GMCA13";
    } else if (pageUrl.includes("ronak.html")) {
        if (headerTitleEl) headerTitleEl.innerText = "Welcome to Ronak Jethva Webpage";
        if (headerSubEl) headerSubEl.innerText = "Student ID: 26GMCA37";
    } else if (pageUrl.includes("about.html")) {
        if (headerTitleEl) headerTitleEl.innerText = "Welcome to About Us Page";
        if (headerSubEl) headerSubEl.innerText = "Government MCA College, Maninagar";
    } else if (pageUrl.includes("calculator.html")) {
        if (headerTitleEl) headerTitleEl.innerText = "Welcome to Calculator Page";
        if (headerSubEl) headerSubEl.innerText = "Government MCA College, Maninagar";
    } else if (pageUrl.includes("data.html")) {
        if (headerTitleEl) headerTitleEl.innerText = "Hotel Room Booking Form";
        if (headerSubEl) headerSubEl.style.display = "none";
    }
}

function updateVisitCounterOnPage() {
    const visitCountEl = document.getElementById("visitCount");
    if (visitCountEl) {
        let visitCount = localStorage.getItem("visitCount") || 1;
        visitCountEl.innerText = visitCount;
    }
}

function resetVisitCounter() {
    localStorage.setItem("visitCount", "0");

    const visitCountEl = document.getElementById("visitCount");

    if (visitCountEl) {
        visitCountEl.innerText = "0";
    }
}


/* ================= HEADER ================= */

const headerEl = document.getElementById("header");
if (headerEl) {
    fetch("header.html")
        .then(response => {
            if (!response.ok) throw new Error("Header load failed");
            return response.text();
        })
        .then(data => {
            headerEl.innerHTML = data;
            updateHeaderForPage();
        })
        .catch(() => {
            headerEl.innerHTML = headerHTML;
            updateHeaderForPage();
        });
}


/* ================= NAVIGATION ================= */

const navbarEl = document.getElementById("navbar");
if (navbarEl) {
    fetch("navigation.html")
        .then(response => {
            if (!response.ok) throw new Error("Navbar load failed");
            return response.text();
        })
        .then(data => { navbarEl.innerHTML = data; })
        .catch(() => { navbarEl.innerHTML = navHTML; });
}


/* ================= FOOTER ================= */

const footerEl = document.getElementById("footer");
if (footerEl) {
    fetch("footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Footer load failed");
            return response.text();
        })
        .then(data => {
            footerEl.innerHTML = data;
            updateVisitCounterOnPage();
        })
        .catch(() => {
            footerEl.innerHTML = footerHTML;
            updateVisitCounterOnPage();
        });
}


/* ================= HOME PAGE ================= */

/* ================= HOME PAGE 3-SECOND WELCOME MODAL & VISIT COUNTER ================= */

function closeWelcomeModal() {
    const modal = document.getElementById("firstVisitModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function initWelcomeModal() {
    const modal = document.getElementById("firstVisitModal");
    const timerEl = document.getElementById("timerCountdown");

    if (modal) {
        // Detect if the current page load is a browser refresh/reload
        const navEntries = performance.getEntriesByType("navigation");
        const isReload = (navEntries.length > 0 && navEntries[0].type === "reload") || (window.performance && window.performance.navigation && window.performance.navigation.type === 1);

        // Update visit counter ONLY on navigation (not on refresh)
        let visitCount = localStorage.getItem("visitCount");
        if (visitCount == null) {
            visitCount = 1;
        } else if (!isReload) {
            visitCount = parseInt(visitCount, 10) + 1;
        } else {
            visitCount = parseInt(visitCount, 10);
        }
        localStorage.setItem("visitCount", visitCount);

        const visitCountEl = document.getElementById("visitCount");
        if (visitCountEl) {
            visitCountEl.innerText = visitCount;
        }

        // Show 5-second welcome modal on first visit of session (do NOT show on refresh)
        const hasSeenModal = sessionStorage.getItem("hasSeenWelcomeModal");
        if (!hasSeenModal) {
            sessionStorage.setItem("hasSeenWelcomeModal", "true");

            modal.style.display = "flex";
            let timeLeft = 3;
            if (timerEl) timerEl.innerText = timeLeft;

            const countdownInterval = setInterval(() => {
                timeLeft--;
                if (timerEl) {
                    timerEl.innerText = timeLeft;
                }

                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    closeWelcomeModal();
                }
            }, 1000);
        } else {
            modal.style.display = "none";
        }
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWelcomeModal);
} else {
    initWelcomeModal();
}


/* ================= HOTEL MANAGEMENT FORM VALIDATION ================= */

function clearFormErrors() {
    const errorIds = ["fullNameErr", "emailErr", "mobileErr", "roomTypeErr", "guestsErr", "checkInErr", "checkOutErr"];
    errorIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = "";
    });

    // Hide success message banner if visible
    const msgEl = document.getElementById("dataSubmittedMsg");
    if (msgEl) {
        msgEl.style.display = "none";
    }

    // Clean URL query parameters
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.pathname);
    }
}

function validateHotelForm(event) {
    if (event) event.preventDefault();
    clearFormErrors();

    let isValid = true;

    // 1. Full Name Validation
    const fullName = document.getElementById("fullName").value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (fullName === "") {
        document.getElementById("fullNameErr").innerText = "Full name is required.";
        isValid = false;
    } else if (fullName.length < 3) {
        document.getElementById("fullNameErr").innerText = "Full name must be at least 3 characters long.";
        isValid = false;
    } else if (!nameRegex.test(fullName)) {
        document.getElementById("fullNameErr").innerText = "Full name must contain letters and spaces only.";
        isValid = false;
    }

    // 2. Email Address Validation
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        document.getElementById("emailErr").innerText = "Email address is required.";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("emailErr").innerText = "Please enter a valid email address (e.g. name@example.com).";
        isValid = false;
    }

    // 3. Mobile Number Validation
    const mobile = document.getElementById("mobile").value.trim();
    const mobileRegex = /^[0-9]{10}$/;
    if (mobile === "") {
        document.getElementById("mobileErr").innerText = "Mobile number is required.";
        isValid = false;
    } else if (!mobileRegex.test(mobile)) {
        document.getElementById("mobileErr").innerText = "Mobile number must be exactly 10 digits.";
        isValid = false;
    }

    // 4. Room Type Validation
    const roomType = document.getElementById("roomType").value;
    if (roomType === "") {
        document.getElementById("roomTypeErr").innerText = "Please select a room type.";
        isValid = false;
    }

    // 5. Number of Guests Validation
    const guests = document.getElementById("guests").value.trim();
    if (guests === "") {
        document.getElementById("guestsErr").innerText = "Number of guests is required.";
        isValid = false;
    } else if (parseInt(guests, 10) < 1 || isNaN(parseInt(guests, 10))) {
        document.getElementById("guestsErr").innerText = "Number of guests must be at least 1.";
        isValid = false;
    }

    // 6. Check-in Date Validation
    const checkIn = document.getElementById("checkIn").value;
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    if (checkIn === "") {
        document.getElementById("checkInErr").innerText = "Check-in date is required.";
        isValid = false;
    } else if (checkIn < todayStr) {
        document.getElementById("checkInErr").innerText = "Check-in date cannot be in the past.";
        isValid = false;
    } else {
        document.getElementById("checkInErr").innerText = "";
    }

    // 7. Check-out Date Validation
    const checkOut = document.getElementById("checkOut").value;
    if (checkOut === "") {
        document.getElementById("checkOutErr").innerText = "Check-out date is required.";
        isValid = false;
    } else if (checkOut < todayStr) {
        document.getElementById("checkOutErr").innerText = "Check-out date cannot be in the past.";
        isValid = false;
    } else if (checkIn !== "" && checkOut <= checkIn) {
        document.getElementById("checkOutErr").innerText = "Check-out date must be after check-in date.";
        isValid = false;
    } else {
        document.getElementById("checkOutErr").innerText = "";
    }

    if (isValid) {
        window.location.href = "data.html?status=submitted";
        return false;
    }

    return false;
}

function resetBookingForm() {
    document.getElementById("hotelBookingForm").reset();
    clearFormErrors();
    const msgEl = document.getElementById("dataSubmittedMsg");
    if (msgEl) msgEl.style.display = "none";
}

// Live date validation function (only shows error when user selects a WRONG date)
function validateDatesLive() {
    const checkInEl = document.getElementById("checkIn");
    const checkOutEl = document.getElementById("checkOut");
    if (!checkInEl || !checkOutEl) return;

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const checkIn = checkInEl.value;
    const checkOut = checkOutEl.value;

    // Check-in live check: Only show error if a date IS selected AND it's in the past
    if (checkIn !== "") {
        if (checkIn < todayStr) {
            document.getElementById("checkInErr").innerText = "Check-in date cannot be in the past.";
        } else {
            document.getElementById("checkInErr").innerText = "";
        }
    } else {
        document.getElementById("checkInErr").innerText = "";
    }

    // Check-out live check: Only show error if a date IS selected AND it's wrong
    if (checkOut !== "") {
        if (checkOut < todayStr) {
            document.getElementById("checkOutErr").innerText = "Check-out date cannot be in the past.";
        } else if (checkIn !== "" && checkOut <= checkIn) {
            document.getElementById("checkOutErr").innerText = "Check-out date must be after check-in date.";
        } else {
            document.getElementById("checkOutErr").innerText = "";
        }
    } else {
        document.getElementById("checkOutErr").innerText = "";
    }
}

// Automatically set min date attribute and attach live validation listeners
document.addEventListener("DOMContentLoaded", () => {
    // Show success message if redirected with status=submitted
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("status") === "submitted" || urlParams.get("status") === "success") {
        const msgEl = document.getElementById("dataSubmittedMsg");
        if (msgEl) {
            msgEl.style.display = "block";

            // Auto hide message after 3 seconds (3000ms)
            setTimeout(() => {
                msgEl.style.display = "none";
                if (window.history.replaceState) {
                    window.history.replaceState(null, null, window.location.pathname);
                }
            }, 3000);
        }
    }

    const checkInEl = document.getElementById("checkIn");
    const checkOutEl = document.getElementById("checkOut");
    if (checkInEl && checkOutEl) {
        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        checkInEl.setAttribute("min", todayStr);
        checkOutEl.setAttribute("min", todayStr);

        // Attach live date validation on user selection/change
        checkInEl.addEventListener("change", () => {
            if (checkInEl.value) {
                checkOutEl.setAttribute("min", checkInEl.value);
            }
            validateDatesLive();
        });

        checkOutEl.addEventListener("change", () => {
            validateDatesLive();
        });

        checkInEl.addEventListener("input", validateDatesLive);
        checkOutEl.addEventListener("input", validateDatesLive);
    }
});


/* ================= SIMPLE CALCULATOR LOGIC ================= */

function appendCalcVal(val) {
    const display = document.getElementById("calcDisplay");
    if (display) {
        if (display.value === "Error" || display.value === "0") {
            display.value = val;
        } else {
            display.value += val;
        }
    }
}

function clearCalc() {
    const display = document.getElementById("calcDisplay");
    if (display) {
        display.value = "";
    }
}

function backspaceCalc() {
    const display = document.getElementById("calcDisplay");
    if (display && display.value) {
        if (display.value === "Error") {
            display.value = "";
        } else {
            display.value = display.value.slice(0, -1);
        }
    }
}

function calculateResult() {
    const display = document.getElementById("calcDisplay");
    if (display && display.value.trim() !== "") {
        try {
            // Evaluate basic arithmetic expression safely
            const sanitized = display.value.replace(/[^0-9+\-*/.]/g, '');
            const result = Function('"use strict"; return (' + sanitized + ')')();
            display.value = result;
        } catch (e) {
            display.value = "Error";
        }
    }
}