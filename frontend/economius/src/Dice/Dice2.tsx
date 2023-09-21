import * as React from 'react';
import Dice from 'react-dice-roll';
import './Dice2.css';

export default function Dice2() {
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
                <Dice size={50} cheatValue={1} />
            </div>
            <div
                className='Dice2'
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '40%',
                }}
            >
                <Dice size={50} cheatValue={2} />
            </div>
        </>
    );
}
