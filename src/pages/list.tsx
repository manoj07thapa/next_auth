import Link from 'next/link';
import { Interface } from 'readline';
import vehiclePerson from '../../api/vehiclePerson';

export interface ListProps {
	ownersList: vehiclePerson[];
}

export default function List({ ownersList }: ListProps) {
	return (
		<div>
			<h1>List page</h1>
			{ownersList.map((e) => (
				<div key={e.details}>
					<Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
						<a>
							Navigate to {e.ownerName}'s {e.vehicle}
						</a>
					</Link>
				</div>
			))}
		</div>
	);
}

List.getInitialProps = async () => {
	const response = await fetch('http://localhost:3000/api/vehicles');
	const ownersList: vehiclePerson[] | undefined = await response.json();
	return { ownersList: ownersList };
};
