import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import If from '../operator/if';
import { selectTab } from './tabActions';

const mapStateToProps = state => ({tab: state.tab});
const mapDispatchProps = dispatch => bindActionCreators({selectTab}, dispatch);

class TabHeader extends Component {
    render() {
        const selected = this.props.tab.selected === this.props.target;
        const visible = this.props.tab.visible[this.props.target];
        return (
            <If test={visible}>
                <li id={`tab_header_${this.props.target}`} className={selected ? 'active' : ''}>
                    <a href='javascript:;' data-toggle='tab' title={this.props.title}
                    onClick={() => this.props.selectTab(this.props.target)}
                    data-target={this.props.target}>
                        <i className={`fa fa-${this.props.icon}${this.props.color ? ' color_' + this.props.color : ''}`}></i> {this.props.label}
                    </a>
                </li>
            </If>
        );
    }
}

export default connect(mapStateToProps, mapDispatchProps)(TabHeader);