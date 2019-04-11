import React from 'react';

export default props => (
    <input id={`input_${props.inputName}`} {...props.input}
                 className='form-control'
                 placeholder={props.placeholder}
                 readOnly={props.readOnly}
                 type={props.type} />
);