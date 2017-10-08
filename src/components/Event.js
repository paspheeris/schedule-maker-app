import dateService from '../services/dates/dateService';

/**
 * title: (String) title of the scheduled event
 * desciption: (String) a short description
 * start: (hh:mm) time of start
 * end: (hh:mm) time of end
 * repeated: (Boolean) true or false, whether the event is repeated
 * date: (Date) object for the date
 * notifyBool: (Boolean) true or false, true if notification set
 * notifyTimeBefore: (String) time of notification is start - notifyTimeBefore
 * repdays: (Boolean[] -> object) if repeated is true, days on which to repeat
 * color: (String) color of the grid cell or card
 * tags: (String[]) array of tags for filtering events, e.g. ["study","algorithms"]
 * notes: (object[]) notes for the particular event, array of object {id: id, text: "text"}
 */
class Event {

    constructor(title, description, start, end, repeated, date, notifyBool, notifyTimeBefore, repDays, color, tags, notes) {
        this.title = title;
        this.description = description;
        this.time = {
            start: start,
            end: end
        };
        this.repeated = repeated;
        this.date = {
            dateStr: date.toString(),
            year: date.getFullYear(),
            month: date.getMonth(),
            monthString: dateService.getMonthStr(date.getMonth()),
            day: dateService.convertDay(date.getDay()),
            dayStr: dateService.getDayStr(dateService.convertDay(date.getDay()))
        };
        this.notify = {
            enabled: notifyBool,
            time: this.time.start - notifyTimeBefore
        };
        this.repeatOnDay = {
            mon: repDays[0],
            tue: repDays[1],
            wed: repDays[2],
            thu: repDays[3],
            fri: repDays[4],
            sat: repDays[5],
            sun: repDays[6]
        };
        this.color = color;
        this.tags = tags; //array
        this.notes = notes; //array of objects {id: x, text: "y"}

    }

}

export default Event;