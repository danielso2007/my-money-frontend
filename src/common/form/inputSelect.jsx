import React, { Component } from 'react';

class InputSelect extends Component {

    renderOptions() {
        const list = this.props.options || [];
        return  list.map((item, index) => (
            <option key={`${index}_${item}`} value={item.value}>{item.description}</option>
        ));
    }

    render() {
        return (
            <select id={`input_${this.props.inputName}`} {...this.props.input} className='form-control' readOnly={this.props.readOnly}>
                <option value='' disabled>Selecione...</option>
                {this.renderOptions()}
            </select>
        );
    }
}
export default InputSelect;


