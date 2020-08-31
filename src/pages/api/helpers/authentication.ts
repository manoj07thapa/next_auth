// /*authenticated() is a middle ware used in getProple api ,here to use middleware we wrap the function with middleware */

// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// import { verify } from 'crypto';

// export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
// 	verify(req.headers.authorization!, 'MY_SECRET', async (err: any, decoded: any) => {
// 		if (!err && decoded) {
// 			return fn(req, res);
// 		} else {
// 			res.status(500).json({ error: 'you are not authenticated' });
// 		}
// 	});
// };
