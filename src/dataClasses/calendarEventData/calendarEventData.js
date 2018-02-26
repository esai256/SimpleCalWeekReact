export default class {
    constructor({title, start, end, date})
    {
        this.id = 0;
        this.title = title || "";
        this.date = date || new Date();
        this.start = start || "00:00";
        this.end = end || "00:00";
    }
}
