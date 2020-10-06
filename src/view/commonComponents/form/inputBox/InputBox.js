import React from 'react';

const InputBox = ({ name, handleChange, handleBlur, formWrapClass, placeholder, inputClass, type, value, inputValue, errorText, errorClass }) => (
    <div className={formWrapClass}>
        <input
            name={name}
            type={type}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            value={value && value}
            className={inputClass} />
             {errorText ? <span style={{ fontSize: '12px', color: 'red' }} > { errorText } </span>: null}
    </div>
);

export default InputBox;