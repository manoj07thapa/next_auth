import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>This is home page</h1>
				<Link href="/people">
					<a>People</a>
				</Link>

				<Link href="/vehicles">
					<a>Vehicles</a>
				</Link>
			</main>
		</div>
	);
}
