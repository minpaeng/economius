import { Link } from 'react-router-dom';

export default function Index() {
    return (
        <>
            <Link to={`/room`}>
                <h1>room</h1>
            </Link>
            <h1>index page</h1>
        </>
    );
}
