import React from "react";
import "./calendarEvent.css";

const hourIndex = 0;

/**
 * a react component which represents a calendarEvent
 * @param  {object} props - the properties which the component uses
 * @return {ReactElement}
 */
export default props => {
    let gridRowStart = props.calendarEvent.start.split(":")[hourIndex];
    let gridRowEnd = props.calendarEvent.end.split(":")[hourIndex];

    return (
        <div
            className="event"
            style={{
                gridRowStart: gridRowStart,
                gridRowEnd: gridRowEnd
            }}
        >

            {props.calendarEvent.title}

            <br/>

            <input
                type="button"
                className="event__edit-button"
                onClick={e => props.onEdit(props.calendarEvent, {x: e.pageX, y: e.pageY})}
                value="Edit"
            />

        </div>
    );
}
