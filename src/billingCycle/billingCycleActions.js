import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';
import consts from '../consts';

const INICIAL_VALUES = {credits: [{}], debts: [{}]};

export function getList() {
    const request = axios.get(`${consts.API_URL}/billingCycles`)
    .catch(e => {
        console.error(e);
    });
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post');
};

export function update(values) {
    return submit(values, 'put');
};

export function remove(values) {
    return submit(values, 'delete');
};

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : '';
        axios[method](`${consts.API_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.');
                dispatch([
                    init()
                ]);
            })
            .catch(e => {
                console.error(e);
                e.response.data.errors.forEach(error => toastr.error('Erro', error));
            });
    };
}

export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
};

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]
};

export function init() {
    return [
        getList(),
        selectTab('tabList'),
        showTabs('tabList', 'tabCreate'),
        initialize('billingCycleForm', INICIAL_VALUES)
    ];
}