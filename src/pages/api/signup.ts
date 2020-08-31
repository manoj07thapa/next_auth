import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { hash } from 'bcrypt';

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse) {
	const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });

	if (req.method === 'POST') {
		hash(req.body.password, 10, async (err, hashedPassword) => {
			const statement = await db.prepare('INSERT INTO person (name,email,password) values(?,?,?)');
			const result = await statement.run(req.body.name, req.body.email, hashedPassword);
			result.stmt.finalize();
			const person = await db.all('select name,email from person');
			console.log(person);

			res.json(person);
		});
	} else {
		res.status(405).json({ message: 'we only support post request' });
	}
}
