const miliSecInYear = 31557600000;
const miliSecondInMonth = 2629800000
const miliSecondInDay = 86400000

let intervalId1 = undefined;
let intervalId2 = undefined;

function tellAge() {

    // Calculating when is the next birthday
    if (intervalId1 !== undefined) clearInterval(intervalId1)
    getTimeLeft()
    intervalId1 = setInterval(() => {
        getTimeLeft()
    }, 1000);

    // calculating how old is a person
    if (intervalId2 !== undefined) clearInterval(intervalId2)
    yearOld()
    intervalId2 = setInterval(() => {
        yearOld()
    }, 1000);

}


let getTimeLeft = () => {

    let today = new Date();
    console.log("today: ", today);

    const dateEntered = new Date(
        document.querySelector("#age").value + " 00:00:00"
    );
    console.log("enterd date: ", dateEntered);

    let birthdayDateThisYear = dateEntered; // 20-4-1994
    birthdayDateThisYear.setFullYear(today.getFullYear()); // 20-4-2022


    if (today.getMonth() > dateEntered.getMonth()) {
        // birthday month is already passed
        birthdayDateThisYear.setFullYear(birthdayDateThisYear.getFullYear() + 1) // 20-04-2023
    }

    let nextBirthdayDiffInMili = birthdayDateThisYear - today;

    let nextBirthdayInDays = Math.floor(nextBirthdayDiffInMili / miliSecondInDay);
    let nextBirthdayInDaysReminder = nextBirthdayDiffInMili % miliSecondInDay

    let nextBirthdayInHours = Math.floor(nextBirthdayInDaysReminder / (1000 * 60 * 60));
    let nextBirthdayInHoursReminder = nextBirthdayInDaysReminder % (1000 * 60 * 60);

    let nextBirthdayInMinutes = Math.floor(nextBirthdayInHoursReminder / (1000 * 60));
    let nextBirthdayInMinutesReminder = nextBirthdayInHoursReminder % (1000 * 60);

    let nextBirthdayInSeconds = Math.floor(nextBirthdayInMinutesReminder / 1000);


    console.log(`${nextBirthdayInDays} days, ${nextBirthdayInHours} hours,
${nextBirthdayInMinutes} minutes and ${nextBirthdayInSeconds} seconds left
in your next birthday`);


    document.querySelector("#visible").removeAttribute("class")

    document.querySelector("#day").innerHTML = nextBirthdayInDays;
    document.querySelector("#hour").innerHTML = nextBirthdayInHours;
    document.querySelector("#minute").innerHTML = nextBirthdayInMinutes;
    document.querySelector("#second").innerHTML = nextBirthdayInSeconds;



    // increment
    birthdayDateThisYear.setSeconds(birthdayDateThisYear.getSeconds() - 1);

}

let yearOld = () => {

    let today = new Date();
    const dateEntered = new Date(
        document.querySelector("#age").value + " 00:00:00"
    );

    let diffInMili = today - dateEntered;
    console.log("diffInMili: ", diffInMili);

    let ageInYear = Math.floor(diffInMili / miliSecInYear);
    let reminderOfYearAge = diffInMili % miliSecInYear;

    let ageInMonth = Math.floor(reminderOfYearAge / miliSecondInMonth);
    let reminderOfMonthAge = reminderOfYearAge % miliSecondInMonth;

    let ageInDay = Math.floor(reminderOfMonthAge / miliSecondInDay);
    let ageInDayReminder = reminderOfMonthAge % miliSecondInDay;

    let ageInHour = Math.floor(ageInDayReminder / (1000 * 60 * 60));
    let ageInHourReminder = ageInDayReminder % (1000 * 60 * 60);

    let ageInMinute = Math.floor(ageInHourReminder / (1000 * 60));
    let ageInMinuteReminder = ageInHourReminder % (1000 * 60);

    let ageInSecond = Math.floor(ageInMinuteReminder / 1000);

    console.log(`you are ${ageInYear} years, ${ageInMonth} month, ${ageInDay}
days, ${ageInHour} hour, ${ageInMinute} minutes
and ${ageInSecond} seconds old`);

    document.querySelector("#yearOld").innerHTML = `You are ${ageInYear} years, ${ageInMonth} month, ${ageInDay}
days, ${ageInHour} hour, ${ageInMinute} minutes
and ${ageInSecond} seconds old`;


}

// you are 28 years, 3 month and 5
// days, 11 hour, 9 minutes
// and 6 seconds old













