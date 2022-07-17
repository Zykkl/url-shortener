let { Deta } = require('deta')
let dotenv = require('dotenv')

const deta = Deta(process.env.PROJECT_KEY)
const db = deta.Base(process.env.DB_NAME)
dotenv.config()

async function makeId(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	if (await db.get(result) != null) {
		makeId(length)
	} else {
		return result;
	}
}

module.exports = { makeId }