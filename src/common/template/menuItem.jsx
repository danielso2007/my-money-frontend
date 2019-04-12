import React, { Component } from 'react';
import { criarIdTag } from '../utils';
import { NavLink } from 'react-router-dom';


class MenuItem extends Component {

     render() {
        return (
            <li className={(window.location.hash.indexOf(this.props.path) === 1 ? 'active' : '')}>
                <NavLink id={criarIdTag(`menu_${this.props.label}`)} to={this.props.path} activeClassName="menuItemActive">
                    <i className={`fa fa-${this.props.icon}`}></i> <span>{this.props.label}</span>
                </NavLink>
            </li>
        );
    }
}


export default MenuItem;