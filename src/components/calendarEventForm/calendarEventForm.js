import React from "react";
import moment from "moment";
import {emptyId} from "../../helpers";
import "./calendarEventForm.css";

/**
 * a react component, which is used for creating or modifing new calendarEvents by the user
 * @param  {object} props - the properties which the component uses
 * @return {ReactElement}
 */
export default props => {
    /**
     * a change-event handler which invokes the injected event-handler with the parameters it needs
     * it also provides the possibility to modify the values of the event before sending it to the callback
     * @param  {EventArguments} changeEvent - the event argument which are provided by default
     * @param  {function} valueModifier - an optional possibility to modify the value of the event before sending it to the callback
     * @return {void}
     */
    function changeHandler (changeEvent, valueModifier) {
        let currentTarget = changeEvent.currentTarget;
        let currentField = currentTarget.getAttribute("data-field");
        let currentValue = currentTarget.value;

        currentValue = typeof valueModifier === "function" ? valueModifier(currentValue) : currentValue;

        props.onChangeCalendarEvent(currentField, currentValue);
    }

    /**
     * A specific change-event handler which invokes the injected event-handler with the parameters it needs
     * but ensures the value which is sent is a JavaScript-Date
     * @param  {[type]} changeEvent [description]
     * @return {[type]}             [description]
     */
    function changeDateHandler(changeEvent) {
        changeHandler(changeEvent, value => moment(value).toDate());
    }

    return (
        <div className="calendar-eventform" style={{left: props.openingPoint.x, top: props.openingPoint.y}}>

            <div className="calendar-eventform__field">

                <label className="calendar-eventform__label">Title</label>

                <input
                    className="calendar-eventform__input"
                    type="text"
                    data-field="title"
                    value={props.calendarEvent.title}
                    onChange={changeHandler}
                />

            </div>

            <div className="calendar-eventform__field">

                <label className="calendar-eventform__label">Date</label>

                <input
                    className="calendar-eventform__input calendar-eventform__input--date"
                    type="date"
                    data-field="date"
                    value={moment(props.calendarEvent.date).format("YYYY-MM-DD")}
                    onChange={changeDateHandler}
                />

            </div>

            <div className="calendar-eventform__field">

                <label className="calendar-eventform__label">Start</label>

                <input
                    className="calendar-eventform__input calendar-eventform__input--date"
                    type="time"
                    data-field="start"
                    value={props.calendarEvent.start}
                    onChange={changeHandler}
                />

            </div>

            <div className="calendar-eventform__field">

                <label className="calendar-eventform__label">End</label>

                <input
                    className="calendar-eventform__input calendar-eventform__input--date"
                    type="time"
                    data-field="end"
                    value={props.calendarEvent.end}
                    onChange={changeHandler}
                />

            </div>

            <div className="calendar-eventform__field calendar-eventform__field--buttons">

                {props.calendarEvent.id !== emptyId ?
                    <input
                        className="calendar-eventform__button"
                        type="button"
                        onClick={props.onOnDeleteCalendarEvent}
                        value="Delete"
                    />
                :null}

                <input
                    className="calendar-eventform__button"
                    type="button"
                    onClick={props.onSaveCalendarEvent}
                    value="Save"
                />

                <input
                    className="calendar-eventform__button"
                    type="button"
                    onClick={props.onCancel}
                    value="Cancel"
                />

            </div>

        </div>
    );
}
