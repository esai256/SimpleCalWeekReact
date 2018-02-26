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

export default class WeekPlanner extends Component {
    constructor(props, state) {
        super(props, state);

        this.state.currentlyDisplayedDays = getWeekByCurrentDate();
    }

    state = {
        calendarEvents: [],
        currentlyDisplayedDays: [],
        currentlyEditingCalendarEvent: null,
        formOpeningPoint: null
    }

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

    createCalendarEvent = calendarEventToCreate => {
        let currentEventsClone = jsonClone(this.state.calendarEvents);

        calendarEventToCreate.id = getNewId();

        currentEventsClone.push(calendarEventToCreate);

        this.setState({calendarEvents: currentEventsClone});
    }

    updateCalendarEvent = (calendarEventToUpdate, calendarEventToUpdateIndex) => {
        let currentEventsClone = jsonClone(this.state.calendarEvents);

        if(calendarEventToUpdateIndex !== emptyIndex)
        {
            currentEventsClone[calendarEventToUpdateIndex] = calendarEventToUpdate;
        }

        this.setState({calendarEvents: currentEventsClone});
    }

    deleteCalendarEvent = () => {
        let calendarEventToDelete = this.state.currentlyEditingCalendarEvent;
        let newState = {currentlyEditingCalendarEvent: null};
        console.log(calendarEventToDelete);
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

    editingCalendarEventChangeHandler = (field, newValue) => {
        let currentlyEditingCalendarEventClone = jsonClone(this.state.currentlyEditingCalendarEvent);

        currentlyEditingCalendarEventClone[field] = newValue;

        this.setState({currentlyEditingCalendarEvent: currentlyEditingCalendarEventClone});
    }

    render() {
        return (
            <div>

                <WeekPlan
                    days={this.state.currentlyDisplayedDays}
                    calendarEvents={this.state.calendarEvents}
                    onEditCalendarEvent={(calendarEvent, formOpeningPoint) => this.setState({currentlyEditingCalendarEvent: calendarEvent, formOpeningPoint: formOpeningPoint})}
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
