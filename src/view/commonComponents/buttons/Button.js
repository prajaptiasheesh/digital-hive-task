import React from 'react';

const CommonButton =({type, btnclass,btntext, onClick})=>(
    <button type={type} onClick={onClick} className={btnclass}>{btntext}</button>
)

export default CommonButton;