import React, {Component} from "react";

import {
    emptyId,
    emptyIndex,
    jsonClone,
    getWeekByCurrentDate,
    getNewId
} from "../../helpers";

import WeekPlan from "../../components/weekPlan/weekPlan";
import CalendarEventForm from "../../components/calendarEventForm/calendarEventForm";

/**
 * @class
 * A react-component which shows a weekplan which can be filled with events
 * @type {WeekPlanner}
 */
export default class WeekPlanner extends Component {
    constructor(props, state) {
        super(props, state);

        this.state.currentlyDisplayedDays = getWeekByCurrentDate();
    }

    state = {
        calendarEvents: [],
        currentlyDisplayedDays: [],
        currentlyEditingCalendarEvent: null,
        formOpeningPoint: {
            x: null,
            y: null
        },
        draggedCalendarEventIndex: emptyIndex,
        draggingPosition: {
            x: null,
            y: null
        },
        isDraggingActive: false,
        currentlySelectedDateToDrop: null
    }

    /**
     * Saves the calendarEvent, which is currently edited, into the state
     * Updates existing items or creates new
     * @return {void}
     */
    saveCalendarEvent = () => {
        let calendarEventToSaveClone = jsonClone(this.state.currentlyEditingCalendarEvent);

        if(calendarEventToSaveClone.id !== emptyId)
        {
            let calendarEventToUpdateIndex = this.state.calendarEvents.findIndex(calendarEvent => calendarEvent.id === calendarEventToSaveClone.id);

            if(calendarEventToUpdateIndex !== emptyIndex)
            {
                this.updateCalendarEvent(calendarEventToSaveClone, calendarEventToUpdateIndex);
            }
        }
        else
        {
            this.createCalendarEvent(calendarEventToSaveClone);
        }

        this.setState({currentlyEditingCalendarEvent: null});
    }

    /**
     * Creates an all new calendarEvent and adds to the store.
     * @param  {CalendarEventData} calendarEventToCreate - the data which the newly created calendarEvent should have
     * @return {void}
     */
    createCalendarEvent = calendarEventToCreate => {
        let currentEventsClone = jsonClone(this.state.calendarEvents);

        calendarEventToCreate.id = getNewId();

        currentEventsClone.push(calendarEventToCreate);

        this.setState({calendarEvents: currentEventsClone});
    }

    /**
     * Updates an existing calendarEvent.
     * @param  {CalendarEventData} calendarEventToUpdate - the updated data for the calendarEvent which sould be updated
     * @param  {int} calendarEventToUpdateIndex - the index on which the calendarEvent which sould be updated is located on
     * @return {void}
     */
    updateCalendarEvent = (calendarEventToUpdate, calendarEventToUpdateIndex) => {
        let currentEventsClone = jsonClone(this.state.calendarEvents);

        if(calendarEventToUpdateIndex !== emptyIndex)
        {
            currentEventsClone[calendarEventToUpdateIndex] = calendarEventToUpdate;
        }

        this.setState({calendarEvents: currentEventsClone});
    }

    /**
     * Deletes the existing event, which is currently being edited.
     * @return {void}
     */
    deleteCalendarEvent = () => {
        let calendarEventToDelete = this.state.currentlyEditingCalendarEvent;
        let newState = {currentlyEditingCalendarEvent: null};

        let currentEventsClone = jsonClone(this.state.calendarEvents);
        const indexToDelete = currentEventsClone.findIndex(calendarEvent => calendarEvent.id === calendarEventToDelete.id);
        const itemCountToDelete = 1;

        if(indexToDelete !== emptyIndex)
        {
            currentEventsClone.splice(indexToDelete, itemCountToDelete);
            newState.calendarEvents = currentEventsClone;
        }
        else
        {
            console.warn("item to delete was not found in store");
        }

        this.setState(newState);
    }

    /**
     * The change handler, which is invoked every time, when data of the calendarEvent,
     * which is currently being edited, was changed by the user.
     * @param  {string} field - the name of the property of which the value has been changed
     * @param  {any} newValue - the new value which was entered by the user
     * @return {void}
     */
    editingCalendarEventChangeHandler = (field, newValue) => {
        let currentlyEditingCalendarEventClone = jsonClone(this.state.currentlyEditingCalendarEvent);

        currentlyEditingCalendarEventClone[field] = newValue;

        this.setState({currentlyEditingCalendarEvent: currentlyEditingCalendarEventClone});
    }

    /**
     * Is triggered when a calendarEvent is dropped on another day.
     * Changes the day of the calendarEvent to the date which it was dropped on.
     * @param {object} dropData - the data of the drop -> the calendarEvent, and the new date
     * @return {void}
     */
    calendarEventDropedOnDayHandler = dropData => {

        let currentEventsClone = jsonClone(this.state.calendarEvents);

        let droppedCalendarEventIndex = currentEventsClone.findIndex(calendarEvent => dropData.calendarEvent.id === calendarEvent.id);

        if(droppedCalendarEventIndex !== emptyIndex)
        {
            currentEventsClone[droppedCalendarEventIndex].date = dropData.newDate;

            this.setState({calendarEvents: currentEventsClone, currentlyEditingCalendarEvent: null});
        }
    }

    /**
     * Default react method which is used for rendering the component and for initalizing the children
     * @return {ReactElement}
     */
    render() {
        return (
            <div>

                <WeekPlan
                    days={this.state.currentlyDisplayedDays}
                    calendarEvents={this.state.calendarEvents}
                    onEditCalendarEvent={(calendarEvent, formOpeningPoint) =>
                        this.setState({
                            currentlyEditingCalendarEvent: calendarEvent,
                            formOpeningPoint: formOpeningPoint
                        })
                    }
                    onCalendarEventDroppedOnDay={this.calendarEventDropedOnDayHandler}
                />

                {
                    this.state.currentlyEditingCalendarEvent &&
                    <CalendarEventForm
                        openingPoint={this.state.formOpeningPoint}
                        calendarEvent={this.state.currentlyEditingCalendarEvent}
                        onChangeCalendarEvent={this.editingCalendarEventChangeHandler}
                        onSaveCalendarEvent={this.saveCalendarEvent}
                        onOnDeleteCalendarEvent={this.deleteCalendarEvent}
                        onCancel={() => this.setState({currentlyEditingCalendarEvent: null})}
                    />
                }

            </div>
        );
    }
}
