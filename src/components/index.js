import React from 'react';
import { connect } from 'react-redux';
import Authorize from './Authorize';
import Tabs from './Tabs';
import { initBackend } from '../server/server';

class Catalog_view extends React.Component {
    componentDidMount() {
        const backState = initBackend();
        if (backState) {
            this.props.initFetch(backState);
        }
    }

    render()  {
        return (
            <div>
                <Authorize />
                <Tabs authorized={this.props.authorized}/>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    authorized: store.authorized,
})

const mapDispatchToProps = dispatch => ({
    initFetch: state => dispatch({type: 'init-fetch', state}),
})

const Catalog = connect(mapStateToProps, mapDispatchToProps)(Catalog_view);

export default Catalog;
