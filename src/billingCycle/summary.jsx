import React, { Component } from 'react';

import Grid from '../common/layout/grid';
import Row from '../common/layout/row';
import ValueBox from '../common/widget/valueBox';

class Summary extends Component {

    render() {
        const { credit, debt } = this.props;
        const consolidado = credit - debt;

        return (
            <Grid cols='12'>
                <fieldset>
                    <legend>Resumo</legend>
                    <Row>
                        <ValueBox cols='12 4' color='green' icon='bank' value={`R$ ${credit.toLocaleString()}`} text='Total de Créditos'></ValueBox>
                        <ValueBox cols='12 4' color='red' icon='credit-card' value={`R$ ${debt.toLocaleString()}`} text='Total de Débitos'></ValueBox>
                        <ValueBox cols='12 4' color='blue' icon='money' value={`R$ ${consolidado.toLocaleString()}`} text='Valor Consolidado'></ValueBox>
                    </Row>
                </fieldset>
            </Grid>
        );
    }

}
export default Summary;