// Function to check for a specific cookie
function checkCookie(cookieName) {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(`${cookieName}=`));
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
// Check for 'loggedin' cookie do this before any other functions
if (!checkCookie("loggedin")) {
  // Redirect to login page
  window.location.href = "/login";
}

function submitFlag(input) {
  // submit flag and name(in cookie)
  e = document.getElementById("user");
  text = e.value;
  text = text.trim();
  if (text == " " || text == "") {
    alert(`Input is empty`);
    return false;
  }
  e2 = document.getElementById("password");
  text2 = e2.value;
  text2 = text2.trim();
  if (text2 == " " || text2 == "") {
    alert(`Input is empty`);
    return false;
  }

  console.log(text);
  let data = { user: text, password: text2 };
  console.log(data);
  try {
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => {
      if (response.status == 200) {
        alert("Correct answer!");
        location.reload();
      } else {
        alert("Incorrect!");
      }
    });
  } catch (error) {
    console.error("Error Logging In:", error);
  }

  // need something for flag already scored
  return false;
}
document.getElementById("submit").onclick = function () {
  submitFlag();
};

// function for calling /data
function getData() {
  // get the json object from /data, and put the results into the scoreboard and hints table
  try {
    fetch("/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          console.log("data received");
        } else {
          console.log("error getting data");
        }
        return response.json();
      })
      .then((data) => {
        // scoreboard not needed, just score of player the user is should update
        let players = data[0];
        let username = getCookie("loggedin");
        let score = players[username];
        console.log(score);
        document.getElementById("score").textContent = `${score}/9`;
        // get players, set the name and score to what matches the cookie and list
      });
  } catch (error) {
    console.error("error getting data:", error);
  }
}
// call getData()

getData();
