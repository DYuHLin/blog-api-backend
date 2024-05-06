const {DateTime} = require("luxon");
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: "Users", required: true},
    post: {type: Schema.Types.ObjectId, ref: "Posts", required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
});

commentSchema.virtual("url").get(() => {
    return `/api/${this._id}`;
});

commentSchema.virtual("date_formatted").get(() => {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("Comments", commentSchema);