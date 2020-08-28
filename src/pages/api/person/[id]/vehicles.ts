import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function getVehicleByPersonId(req: NextApiRequest, res: NextApiResponse) {
	const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });
	const allVehicleofPerson = await db.all('select * from vehicle where ownerId=?', [ req.query.id ]);
	res.json(allVehicleofPerson);
}
