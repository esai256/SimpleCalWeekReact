import React from "react";
import moment from "moment";
import {firstIndex, indexOffset} from "../../helpers";
import DayPlan from "../dayPlan/dayPlan";
import "./weekPlan.css";

/**
 * a react component which is responsible for viewing a week
 * @param  {object} props - the properties which the component uses
 * @return {ReactElement}
 */
export default props => {
    let relevantEvents = props.calendarEvents.filter(calendarEvent => {
        let calendarEventDate = moment(calendarEvent.date);
        let firstDayMoment = moment(props.days[firstIndex])
        let lastDayMoment = props.days[props.days.length - indexOffset];

        return calendarEventDate.isBetween(firstDayMoment, lastDayMoment);
    });

    return (
        <div className="weekplan">
            {
                props.days.map(day =>
                    <DayPlan
                        key={JSON.stringify(day)}
                        calendarEvents={relevantEvents}
                        date={day}
                        onEditCalendarEvent={props.onEditCalendarEvent}
                        onCalendarEventDropped={props.onCalendarEventDroppedOnDay}
                    />
                )
            }
        </div>
    );
}
