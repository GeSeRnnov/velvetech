import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';
import Categories from './Categories';
import Products from './Products';
import '../scss/main.scss';

function Tabs_view(props) {
    const [tabIndex, changeTab] = useState(0);
    const handleChange = (e, id) => changeTab(id);
    
    return (
        <div className='container-fluid my-4 w-50'>
            <Paper>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                    className='bg-light'
                >
                    <Tab label='Categories'  />
                    <Tab label='Products' />
                </Tabs>
                <div className='tab-сontent'>
                    {
                        props.authorized ?
                            tabIndex ? 
                            <Products /> :
                            <Categories /> :
                        <div className='warning-block text-center'>
                            Warning! You must log in to view this list.
                        </div>
                    }
                </div>
            </Paper>
        </div>
    );
}

export default Tabs_view;
