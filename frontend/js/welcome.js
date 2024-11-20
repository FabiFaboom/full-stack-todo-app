const today = document.querySelector(".today");

const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}

const todayDate = new Date().toLocaleDateString("en-AU", options)

today.innerHTML = todayDate;