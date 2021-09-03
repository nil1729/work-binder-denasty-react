const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogSchema = new mongoose.Schema(
	{
		title: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		body: {
			type: mongoose.Schema.Types.String,
			required: true,
			minlength: [300, 'Blog body must be at least 300 characters long'],
		},
		slug: {
			type: mongoose.Schema.Types.String,
			required: true,
			unique: true,
		},
		coverPhoto: {
			publicURL: mongoose.Schema.Types.String,
			fileId: mongoose.Schema.Types.String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

BlogSchema.statics.createSlugString = async function (title) {
	try {
		let trimmedTitle = title.trim();
		let slugString = slugify(trimmedTitle, {
			replacement: '-',
			lower: true,
			strict: true,
		});
		let uniqueSlug = slugString;

		let itr = 1;
		while (await this.findOne({ slug: uniqueSlug })) {
			var rnd = Math.floor(itr + Math.random() * 9 * itr);
			uniqueSlug = `${slugString}-${rnd}`;
			itr *= 10;
		}

		return uniqueSlug;
	} catch (err) {
		return null;
	}
};

module.exports = mongoose.model('Blog', BlogSchema);
