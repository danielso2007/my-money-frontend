import React, { Component } from 'react';
import Grid from '../common/layout/grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, arrayInsert, arrayRemove } from 'redux-form';
import Input from '../common/form/input';
import InputSelect from '../common/form/inputSelect';
import If from '../common/operator/if';

class ItemList extends Component {

    add(index, item = {}) {
        if (!this.props.readOnly) {
            this.props.arrayInsert('billingCycleForm', this.props.field, index, item);
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('billingCycleForm', this.props.field, index);
        }
    }

    renderRows() {
        const list = this.props.list || [];
        const options = [
            {value: 'PAGO', description: 'Pago'},
            {value: 'PENDENTE', description: 'Pendente'},
            {value: 'AGENDADO', description: 'Agendado'}
        ];
        return list.map((item, index) => (
            <tr key={`${this.props.field}_row_${index}`}>
                <td><Field name={`${this.props.field}[${index}].name`} component={Input}
                           placeholder='Informe o nome' readOnly={this.props.readOnly}></Field></td>
                <td><Field name={`${this.props.field}[${index}].value`} component={Input} type='number'
                           placeholder='Informe o valor' readOnly={this.props.readOnly}></Field></td>
                <If test={this.props.showStatus}>
                    <td><Field name={`${this.props.field}[${index}].status`} component={InputSelect}
                           options={options}
                           placeholder='Informe o status' readOnly={this.props.readOnly}></Field></td>
                </If>
                <td>
                    <button type='button' className='btn btn-success margin_right_5' onClick={() => this.add(index + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>
                    <button type='button' className='btn btn-warning margin_right_5' onClick={() => this.add(index + 1, item)}>
                        <i className='fa fa-clone'></i>
                    </button>
                    <button type='button' className='btn btn-danger' onClick={() => this.remove(index)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <Grid id='grid_credits' cols={this.props.cols}>
                <fieldset id='fieldset_credits'>
                    <legend>{this.props.legend}</legend>
                    <table id='table_credit_list' className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <If test={this.props.showStatus}>
                                    <th>Status</th>
                                </If>
                                <th className='table-actions-list'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        );
    }
}

const mapDispatchProps = dispatch => bindActionCreators({arrayInsert, arrayRemove}, dispatch);

export default connect(null, mapDispatchProps)(ItemList);