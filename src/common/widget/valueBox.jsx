import React from 'react';
import Grid from '../layout/grid';
import { criarIdTag } from '../utils';

export default props => (
    <Grid id={props.text} cols={props.cols}>
        <div id={criarIdTag(`box_${props.text}`)} className={`small-box bg-${props.color}`}>
            <div id={criarIdTag(`inner_${props.text}`)} className='inner'>
                <h3 id={criarIdTag(`box_value_${props.text}`)}>{props.value}</h3>
                <p id={criarIdTag(`box_text_${props.text}`)}>{props.text}</p>
            </div>
            <div className='icon'>
                <i className={`fa fa-${props.icon}`}></i>
            </div>
        </div>
    </Grid>
)