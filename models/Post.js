const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		desc: { type: String, required: true },
		photo: { type: String, required: false },
		username: { type: String, required: true },
		userId: { type: String, required: true },
		userPhoto: { type: String, required: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
