import React, {
    Component
} from "react";
import "./calendarEvent.css";

const hourIndex = 0;

export default class extends Component {

    render() {

        let gridRowStart = this.props.calendarEvent.start.split(":")[hourIndex];
        let gridRowEnd = this.props.calendarEvent.end.split(":")[hourIndex];

        return (
            <div
                draggable="true"
                className="event"
                style={{gridRowStart: gridRowStart, gridRowEnd: gridRowEnd}}
            >
                {this.props.calendarEvent.title}

                <br/>
                <input type="button" className="event__edit-button" onClick={e => this.props.onEdit(this.props.calendarEvent, {x: e.pageX, y: e.pageY})} value="Edit" />
            </div>
        );
    }
}
