import { NextPageContext } from 'next';
import { fetchDataFromServer } from '../../api/fetchDataFromServer';

export default function People({ people }: any) {
	return <div>Hi from people {JSON.stringify(people)}</div>;
}

People.getInitialProps = async (ctx: NextPageContext) => {
	const json = await fetchDataFromServer('http://localhost:3000/api/people', ctx);
	return { people: json };
};
