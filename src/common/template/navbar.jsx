import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../auth/authActions';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    changeOpen() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { name, email } = this.props.user || {name: '', email: ''};
        return (
            <div id='navbar' className="navbar-custom-menu">
                <ul id='navbar-nav' className="nav navbar-nav">
                    <li id='dropdown_user' onMouseLeave={() => this.changeOpen()} className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
                        <a id='dropdown_user_link' href="javascript:;" onClick={() => this.changeOpen()} aria-expanded={this.state.open ? 'true' : 'false'}
                                            className="dropdown-toggle height_50" data-toggle="dropdown">
                            <img src="http://lorempixel.com/160/160/" className="user-image" alt="User Image" />
                            <span className="hidden-xs">{name}</span>
                        </a>
                        <ul id='dropdown-menu' className="dropdown-menu">
                            <li id='dropdown-menu-image' className="user-header">
                                <img src="http://lorempixel.com/160/160/" className="img-circle" alt="User Image" />
                                <p>{name}<small>{email}</small></p>
                            </li>
                            <li id='dropdown-menu-button-exit' className="user-footer">
                                <div className="pull-right">
                                    <a href="#" onClick={this.props.logout} className="btn btn-default btn-flat">Sair</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({user: state.auth.user});
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);