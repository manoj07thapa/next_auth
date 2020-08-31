import { NextPageContext } from 'next';
import { fetchDataFromServer } from '../../api/fetchDataFromServer';

export default function Vehicles({ vehicles }: any) {
	return <div>Hi from Vehicles {JSON.stringify(vehicles)}</div>;
}

Vehicles.getInitialProps = async (ctx: NextPageContext) => {
	const json = await fetchDataFromServer('http://localhost:3000/api/vehicles', ctx);
	return { vehicles: json };
};
