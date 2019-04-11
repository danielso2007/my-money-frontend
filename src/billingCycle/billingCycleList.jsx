import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getList, showUpdate, showDelete } from './billingCycleActions';

const mapStateToProps = state => ({ list: state.billingCycle.list });
const mapDispatchProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch);

class BillingCycleList extends Component {

    componentWillMount() {
        // this.props.getList().then(() => console.log(this.props.list));
        this.props.getList();
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map((bc, index) => (
            <tr id={`row_${index}`} key={bc._id}>
                <td id={`col_${index}.1`}>{bc.name}</td>
                <td id={`col_${index}.2`}>{bc.month}</td>
                <td id={`col_${index}.3`}>{bc.year}</td>
                <td>
                     <button title='Editar' className='btn btn-edit margin_right_5' onClick={() => this.props.showUpdate(bc)}>
                         <i className='fa fa-pencil'></i>
                     </button>
                     <button title='Deletar' className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                         <i className='fa fa-trash-o'></i>
                     </button>
                </td>
            </tr>
        ));
    }

    render() {
       return (
           <div>
               <table id='table_list' className='table'>
                   <thead>
                       <tr id='thead_list'>
                           <th>Nome</th>
                           <th>Mês</th>
                           <th>Ano</th>
                           <th className='table-actions'>Ações</th>
                       </tr>
                   </thead>
                   <tbody id='tbody_list'>
                      {this.renderRows()}
                   </tbody>
               </table>
           </div>
       )
    }

}

export default connect(mapStateToProps, mapDispatchProps)(BillingCycleList);
