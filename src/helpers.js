import * as moment from "moment";

export const empty = 1;
export const emptyIndex = -1;
export const firstIndex = 0;
export const indexOffset = 1;
export const weekdayCount = 7;
export const forLoopBeginning = 0;
export const sortingEnum = {
    higher: 1,
    same: 0,
    lower: -1
};

export const decimalRadix = 10;

export function jsonClone (objectToClone) {
    let stringifiedObjectToClone = JSON.stringify(objectToClone);
    let parsedObjectToClone = null;

    try {
        parsedObjectToClone = JSON.parse(stringifiedObjectToClone);
    }
    catch (parsingException) {
        console.warning("While parsing an object to JSON an error occured. null will be returned.", {objectToClone: objectToClone, error: parsingException});
        parsedObjectToClone = null;
    }

    return parsedObjectToClone;
}

export const minHours = 0;
export const minMinutes = 0;
export const minSeconds = 0;
export const minMilliseconds = 0;

export const emptyId = 0;

let lastId = 0;

export function getNewId () {
    return ++lastId;
}

export function getWeekByCurrentDate(date = new Date(Date.now())) {
    let dayOffset = 1;
    let momentDate = moment(date);
    let weekStartDate = momentDate.clone().subtract(momentDate.weekday() - dayOffset, "days").toDate();

    return getWeekByStartDate(weekStartDate);
}

export function getWeekByStartDate(weekStartDate) {
    let result = [];
    let i = forLoopBeginning;
    let weekStartMoment = moment(weekStartDate).hours(minHours).minutes(minMinutes).seconds(minSeconds).milliseconds(minMilliseconds);

    for(; i < weekdayCount; i++)
    {
        result.push(weekStartMoment.clone().add(i, "days").toDate());
    }

    return result;
}
