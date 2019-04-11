import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSummary } from './dashboardActions';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ValueBox from '../common/widget/valueBox';
import Row from '../common/layout/row';

const mapStateToProps = state => ({summary: state.dashboard.summary});
const mapDispatchProps = dispatch => bindActionCreators({getSummary}, dispatch);

class Dashboard extends Component {

    componentWillMount() {
        this.props.getSummary();
    }

    render() {

        const { credit, debt } = this.props.summary;
        const consolidado = credit - debt;
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 0.1.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='green' icon='bank' value={`R$ ${credit.toLocaleString()}`} text='Total de Créditos'></ValueBox>
                        <ValueBox cols='12 4' color='red' icon='credit-card' value={`R$ ${debt.toLocaleString()}`} text='Total de Débitos'></ValueBox>
                        <ValueBox cols='12 4' color='blue' icon='money' value={`R$ ${consolidado.toLocaleString()}`} text='Valor Consolidado'></ValueBox>
                    </Row>
                </Content>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Dashboard);