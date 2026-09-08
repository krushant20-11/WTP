/* ================= HEADER ================= */

fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });


/* ================= NAVIGATION ================= */

fetch("navigation.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });


/* ================= FOOTER ================= */

fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });


/* ================= HOME PAGE ================= */

if (window.location.pathname.endsWith("home.html")) {

    let visitCount = localStorage.getItem("visitCount");

    if (visitCount == null) {

        visitCount = 1;

        // First visit
        document.getElementById("welcomeBox").style.display = "block";

    }
    else {

        visitCount++;

    }

    localStorage.setItem("visitCount", visitCount);

    document.getElementById("visitCount").innerHTML = visitCount;
}