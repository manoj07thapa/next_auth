import { useRef, useState } from 'react';
export default function Signup() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [ res, setRes ] = useState<any>(null);

	const handleLogin = async () => {
		const res = await fetch('http://localhost:3000/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: emailRef.current.value,
				password: passwordRef.current.value
			})
		});
		const json = await res.json();
		setRes(json);
	};

	return (
		<div>
			<h1>Create a new User</h1>
			{JSON.stringify(res)}
			<input type="email" placeholder="email" ref={emailRef} />
			<input type="password" placeholder="password" ref={passwordRef} />
			<button onClick={handleLogin}>Signup</button>
		</div>
	);
}
