import React from 'react';
import { criarIdTag } from '../utils';

export default props => (
    <section id={criarIdTag(`content_header_${props.title}`)} className='content-header'>
        <h1>{props.title} <small>{props.small}</small></h1>
    </section>
)