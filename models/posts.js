const {DateTime} = require("luxon");
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: "Users", required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    published: {type: Boolean, default: false, required: true}
});

postSchema.virtual("url").get(() => {
    return `/api/${this._id}`;
});

postSchema.virtual("date_formatted").get(() => {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("Posts", postSchema);