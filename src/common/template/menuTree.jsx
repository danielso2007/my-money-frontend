import React, { Component } from 'react';
import { criarIdTag } from '../utils';


class MenuTree extends Component {
    render() {
        return (
            <li className={(window.location.hash.indexOf(this.props.path) === 1 ? 'treeview active' : 'treeview')}>
                <a id={criarIdTag(`tree_menu_link_${this.props.label}`)} href='#'>
                    <i className={`fa fa-${this.props.icon}`}></i> <span>{this.props.label}</span>
                    <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul id={criarIdTag(`tree_menu_${this.props.label}`)} className="treeview-menu">
                    {this.props.children}
                </ul>
            </li>
        );
    }
}

export default MenuTree;