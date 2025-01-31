
// #8 functional programming clock

const compose = (...fns) => arg =>
    fns.reduce((composed, f) => f(composed), arg);


const oneSecond = () => 1000;
const getCurrentTime = () => new Date();

const clear = () => console.clear();
const log = message => console.log(message);

// date to clocktime object 
const serializeClockTime = date => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
});

// adjust hours within clocktime
const civilianHours = clockTime => ({
    ... clockTime, 
    hours: clockTime.hours > 12 ? clockTime.hours -12: clockTime.hours
})


// adds to clocktime
const appendAMPM = clockTime => ({
    ...clockTime, 
    ampm: clockTime.hours > 12 ? "PM" : "AM"
});


const display = target => time => target(time)

const formatClock = format => time => 
    format
        .replace("hh", addZero(time.hours))
        .replace("mm", addZero(time.minutes))
        .replace("ss", addZero(time.seconds))
        .replace("tt", time.ampm)

const prependZero = key => clockTime => ({
    ...clockTime, 
    key: clockTime[key] < 10 ? "0" + clockTime[key]: "" + clockTime[key]
});

// extra function. otherwise zeros disappear in chrome
const addZero = num => 
    num < 10 ? "0" + num : num;

const convertToCivilianTime = clockTime =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);

const doubleDigits = civilianTime => 
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime)

const startTicking = () => 
    setInterval(
        compose(
            clear,
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime, 
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    );

    startTicking();








