// import Dice from 'react-dice-roll';
import './Dice2.css';

export default function Dice2() {
    const values: any = [1, 2, 3, 4, 5, 6];
    return (
        <>
            <div
                className='Dice2'
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '30%',
                }}
            >
                {/* <Dice size={50} cheatValue={values[0]} /> */}
            </div>
            <div
                className='Dice2'
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '40%',
                }}
            >
                {/* <Dice size={50} cheatValue={values[1]} /> */}
            </div>
        </>
    );
}
