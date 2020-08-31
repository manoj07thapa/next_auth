import { useRef, useState } from 'react';
export default function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [ res, setRes ] = useState<any>(null);

	const handleLogin = async () => {
		const res = await fetch('http://localhost:3000/api/login', {
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
			{JSON.stringify(res)}
			<input type="email" placeholder="email" ref={emailRef} />
			<input type="password" placeholder="password" ref={passwordRef} />
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}
