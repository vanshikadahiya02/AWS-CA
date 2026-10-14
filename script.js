function loadXML() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "gym.xml", true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            var xml = xhr.responseXML;
            showPlans(xml);
            showMemberships(xml);
        } else {
            showLoadError();
        }
    };

    xhr.onerror = function () {
        showLoadError();
    };

    xhr.send();
}

function showLoadError() {
    var message = "Could not load gym.xml. Open the site using a server (like Vercel or VS Code Live Server).";
    document.getElementById("plansContainer").innerHTML = "<p>" + message + "</p>";
    document.getElementById("membershipContainer").innerHTML = "<p>" + message + "</p>";
}

function showPlans(xml) {
    var plans = xml.getElementsByTagName("plan");
    var output = "";

    for (var i = 0; i < plans.length; i++) {
        var name = plans[i].getElementsByTagName("name")[0].textContent;
        var level = plans[i].getElementsByTagName("level")[0].textContent;
        var days = plans[i].getElementsByTagName("days")[0].textContent;
        var exercises = plans[i].getElementsByTagName("exercise");

        output += '<div class="box plan ' + level + '">';
        output += "<h3>" + name + "</h3>";
        output += "<p>" + days + " (" + level + ")</p>";
        output += "<ul>";
        for (var j = 0; j < exercises.length; j++) {
            output += "<li>" + exercises[j].textContent + "</li>";
        }
        output += "</ul>";
        output += "</div>";
    }

    document.getElementById("plansContainer").innerHTML = output;
}

function showMemberships(xml) {
    var members = xml.getElementsByTagName("membership");
    var output = "";

    for (var i = 0; i < members.length; i++) {
        var name = members[i].getElementsByTagName("name")[0].textContent;
        var price = members[i].getElementsByTagName("price")[0].textContent;
        var features = members[i].getElementsByTagName("feature");

        output += '<div class="box">';
        output += "<h3>" + name + "</h3>";
        output += '<p class="price">' + price + "</p>";
        output += "<ul>";
        for (var j = 0; j < features.length; j++) {
            output += "<li>" + features[j].textContent + "</li>";
        }
        output += "</ul>";
        output += "<button onclick=\"chooseMembership('" + name + "')\">Choose</button>";
        output += "</div>";
    }

    document.getElementById("membershipContainer").innerHTML = output;
}

// Run when the page opens
loadXML();

// ---------- 1. Filter workout plans ----------
function filterPlans(level) {
    var plans = document.getElementsByClassName("plan");

    for (var i = 0; i < plans.length; i++) {
        if (level == "all") {
            plans[i].style.display = "block";
        } else if (plans[i].classList.contains(level)) {
            plans[i].style.display = "block";
        } else {
            plans[i].style.display = "none";
        }
    }
}

// ---------- 2. BMI calculator ----------
function calculateBMI() {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var result = document.getElementById("bmiResult");

    if (weight == "" || height == "" || weight <= 0 || height <= 0) {
        result.innerHTML = "Please enter valid weight and height.";
        return;
    }

    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters * heightInMeters);
    bmi = bmi.toFixed(1);

    var category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    result.innerHTML = "Your BMI is " + bmi + " (" + category + ")";
}

// ---------- 3. Choose membership ----------
function chooseMembership(planName) {
    document.getElementById("membershipMsg").innerHTML =
        "You selected the " + planName + " plan. Please visit the gym or contact us to complete joining.";
}

// ---------- 4. Show / hide health tips ----------
function toggleTip(number) {
    var tip = document.getElementById("tip" + number);

    if (tip.style.display == "block") {
        tip.style.display = "none";
    } else {
        tip.style.display = "block";
    }
}

// ---------- 5. Contact form check ----------
function submitForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var msg = document.getElementById("formMsg");

    if (name == "" || email == "" || message == "") {
        msg.innerHTML = "Please fill all the fields.";
        msg.style.color = "red";
    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        msg.innerHTML = "Please enter a valid email.";
        msg.style.color = "red";
    } else {
        msg.innerHTML = "Thank you " + name + "! We will contact you soon.";
        msg.style.color = "green";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    }
}
