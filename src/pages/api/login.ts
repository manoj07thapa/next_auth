import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });
	if (req.method === 'POST') {
		const person = await db.get('select * from person where email = ?', [ req.body.email ]);
		compare(req.body.password, person.password, (err, result) => {
			if (!err && result) {
				const claims = { sub: person.id, myPersonEmail: person.email };
				const jwt = sign(claims, 'MY_SECRET', { expiresIn: '1hr' });
				res.setHeader(
					'Set-Cookie',
					cookie.serialize('auth', jwt, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						sameSite: 'strict',
						maxAge: 3600,
						path: '/'
					})
				);
				res.status(200).json({ message: 'Welcome User' });
			} else {
				res.json({ message: 'something went wrong' });
			}
		});
	} else {
		res.status(405).json({ message: 'we only support post request' });
	}
}
