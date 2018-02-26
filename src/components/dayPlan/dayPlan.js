import React from "react";
import moment from "moment";
import {sortingEnum, jsonClone, decimalRadix} from "../../helpers";
import CalendarEvent from "../calendarEvent/calendarEvent";
import CalendarEventData from "../../dataClasses/calendarEventData/calendarEventData";
import "./dayPlan.css";

/**
 * A react component, which is used for showing a day with its events
 * @param  {object} props - the properties which the component uses
 * @return {ReactElement} 
 */
export default props => {
    let calendarEventsClone = jsonClone(props.calendarEvents);

    let relevantCalendarEvents = calendarEventsClone.filter(calendarEvent => {
        let calendarEventDate = moment(calendarEvent.date);
        let currentMoment = moment(props.date);
        let isCalendarEventToday = calendarEventDate.isSame(currentMoment, "day");

        return isCalendarEventToday;
    });

    //ensure that the earlier calendarEvents are always left of the latter
    relevantCalendarEvents.sort((a, b) => {
        let aCompareVal = parseInt(a.start.split(":").join(""), decimalRadix);
        let bCompareVal = parseInt(b.start.split(":").join(""), decimalRadix);

        return aCompareVal > bCompareVal ?
        sortingEnum.highter :
            aCompareVal < bCompareVal ?
            sortingEnum.lower :
            sortingEnum.same
    });

    return (
        <div className="dayplan">

            <h1 className="dayplan__label">
                {moment(props.date).format("dd DD.MM.YYYY")}
            </h1>

            <div className="dayplan__table" onClick={e => {
                //check if the day itself and not one of its children is clicked
                if(e.target === e.currentTarget)
                {
                    let newCalendarEvent = new CalendarEventData({
                        title: "",
                        date: props.date
                    });

                    props.onEditCalendarEvent(newCalendarEvent, {x: e.pageX, y: e.pageY});
                }
            }}>
                {
                    relevantCalendarEvents.map(calendarEvent =>
                        <CalendarEvent
                            key={calendarEvent.id}
                            date={props.date}
                            calendarEvent={calendarEvent}
                            onEdit={props.onEditCalendarEvent}
                        />
                    )
                }
            </div>

        </div>
    );
}
