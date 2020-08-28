import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import vehiclePerson from '../../../api/vehiclePerson';
import { NextPageContext } from 'next';

export interface PersonProps {
	ownersList: vehiclePerson[];
}

export default function Person({ ownersList }: PersonProps) {
	const [ owners, setOwners ] = useState(ownersList);

	const router = useRouter();

	useEffect(() => {
		async function loadData() {
			const response = await fetch(
				'http://localhost:4001/vehicles?ownerName=' + router.query.person + '&vehicle=' + router.query.vehicle
			);
			const ownersList: vehiclePerson[] = await response.json();
			setOwners(ownersList);
		}
		if (ownersList.length === 0) {
			loadData();
		}
	}, []);
	if (!owners[0]) {
		return 'Loading...';
	}
	return <pre>{owners[0].details}</pre>;
}

interface MyNextPageContext extends NextPageContext {
	query: {
		person: string;
		vehicle: string;
	};
}

Person.getInitialProps = async (ctx: MyNextPageContext) => {
	//we first navigate to the other page before making the request for better user experience
	if (!ctx.req) {
		return { ownersList: [] };
	}

	const { query } = ctx; //ctx=context provides access to router
	const response = await fetch(
		'http://localhost:4001/vehicles?ownerName=' + query.person + '&vehicle=' + query.vehicle
	);
	const ownersList: vehiclePerson[] = await response.json();
	return { ownersList: ownersList };
};
