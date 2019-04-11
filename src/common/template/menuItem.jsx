import React from 'react';
import { criarIdTag } from '../utils';
import { Link } from 'react-router-dom';

export default props => (
    <li>
        <Link id={criarIdTag(`menu_${props.label}`)} to={props.path}>
            <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
        </Link>
    </li>
);