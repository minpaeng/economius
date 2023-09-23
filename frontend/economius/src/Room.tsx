import { Link } from 'react-router-dom';

export default function Room() {
    return (
        <>
            <Link to={`/app`}>
                <h1>game</h1>
            </Link>
            <h1>room page</h1>
        </>
    );
}
