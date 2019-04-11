import React from 'react';
import Grid from '../layout/grid';

export default props => (
    <Grid id={`${props.inputName}`} cols={props.cols}>
        <div id={`div_${props.inputName}`} className='form-group'>
            <label htmlFor={`input_${props.inputName}`}>{props.label}</label>
            <input id={`input_${props.inputName}`} {...props.input}
                 className='form-control'
                 placeholder={props.placeholder}
                 readOnly={props.readOnly}
                 type={props.type} />
        </div>
    </Grid>
);