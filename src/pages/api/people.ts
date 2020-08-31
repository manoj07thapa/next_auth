import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { verify } from 'jsonwebtoken';

/*authenticated() is a middle ware used in getProple api ,here to use middleware we wrap the function with middleware */

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	verify(req.cookies.auth!, 'MY_SECRET', async (err, decoded) => {
		if (!err && decoded) {
			return fn(req, res);
		} else {
			res.status(401).json({ error: 'you are not authenticated' });
		}
	});
};

export default authenticated(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
	const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });
	const people = await db.all('select id,name,email from person');
	res.json(people);
});
