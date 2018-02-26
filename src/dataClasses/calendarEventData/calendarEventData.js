/**
 * Class of which an instance represents a calendarEvent
 * @type {CalendarEventData}
 */
export default class {
    /**
     * @constructor
     * creates a new instance of the {CalendarEventData} class
     * @param {string} title - the title of the calendarEvent
     * @param {string} start - the start time of the calendarEvent -> "HH:mm" -> "00:00"
     * @param {string} end - the end time of the calendarEvent -> "HH:mm" -> "00:00"
     * @param {Date} date - the day of the calendarEvent
     */
    constructor({title, start, end, date})
    {
        this.id = 0;
        this.title = title || "";
        this.date = date || new Date();
        this.start = start || "00:00";
        this.end = end || "00:00";
    }
}
