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
    let calendarEventStyle = {
        gridRowStart: gridRowStart,
        gridRowEnd: gridRowEnd
    };

    return (
        <div
            className="event"
            style={calendarEventStyle}
            draggable="true"
            onDragStart={ev => {
                ev.dataTransfer.setData("text/plain", JSON.stringify(props.calendarEvent));
                ev.dataTransfer.dropEffect = "move";
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
