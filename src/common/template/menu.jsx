import React from 'react';
import MenuItem from './menuItem';
import MenuTree from './menuTree';

export default props => (
    <ul id='main_menu' className='sidebar-menu' data-widget="tree">
        <MenuItem path='/dashboard' label='Dashboard' icon='dashboard' />
        <MenuTree path='/billingCycle' label='Cadastro' icon='edit'>
             <MenuItem path='/billingCycle'
             label='Ciclos de Pagamentos'
             icon='usd' />
        </MenuTree>
    </ul>
);