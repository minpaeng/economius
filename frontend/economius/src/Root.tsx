import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Index from './Index';
import Room from './Room';

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />}></Route>
                <Route path='/app' element={<App />}></Route>
                <Route path='/room' element={<Room />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
