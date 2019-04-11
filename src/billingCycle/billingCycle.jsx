import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import Tabs from '../common/tab/tabs';
import TabsHeader from '../common/tab/tabsHeader';
import TabsContent from '../common/tab/tabsContent';
import TabHeader from '../common/tab/tabHeader';
import TabContent from '../common/tab/tabContent';

import { create, update, remove, init } from './billingCycleActions';

import { selectTab, showTabs } from '../common/tab/tabActions';
import List from '../billingCycle/billingCycleList';
import Form from '../billingCycle/billingCycleForm';

const mapDispatchProps = dispatch => bindActionCreators({selectTab, showTabs, create, update, remove, init}, dispatch);

class BillingCycle extends Component {

    componentWillMount() {
        this.props.init();
    }

    render() {
       return (
        <div>
            <ContentHeader title='Ciclos de Pagamentos' small='Cadastro' />
            <Content>
                <Tabs>
                    <TabsHeader>
                        <TabHeader label='Listar' icon='bars' target='tabList' title='Listar' />
                        <TabHeader label='Incluir' icon='plus' color='blue' target='tabCreate' title='Incluir' />
                        <TabHeader label='Alterar' icon='pencil' color='green' target='tabUpdate' title='Alterar' />
                        <TabHeader label='Excluir' icon='trash-o' color='red' target='tabDelete' title='Excluir' />
                    </TabsHeader>
                    <TabsContent>
                        <TabContent id='tabList'><List/></TabContent>
                        <TabContent id='tabCreate'><Form onSubmit={this.props.create} submitClass='primary' submitLabel='Incluir'/></TabContent>
                        <TabContent id='tabUpdate'><Form onSubmit={this.props.update} submitClass='success' submitLabel='Alterar'/></TabContent>
                        <TabContent id='tabDelete'><Form onSubmit={this.props.remove} submitClass='danger' submitLabel='Excluir' readOnly={true}/></TabContent>
                    </TabsContent>
                </Tabs>
            </Content>
        </div>
       )
    }

}

export default connect(null, mapDispatchProps)(BillingCycle);
