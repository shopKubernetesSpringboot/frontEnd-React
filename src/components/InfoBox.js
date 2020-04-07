import React from 'react'
import logo from '../logo.svg';
import RestClientSelector from './RestClientSelector';

class InfoBox extends React.Component {

    render() {
        return (
            <div className="innerBox">
                <div className="floatLeft"><img src={logo} className="App-logo" alt="logo" /></div>
                <div className="floatLeft padding">
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                    <hr />
                    <p>Developed by <a href="https://github.com/davidgfolch">David G. Folch</a></p>
                    <p>Theme <a href="https://getbootstrap.com/docs/4.0/getting-started/introduction/">Bootstrap 4</a></p>
                    <p>Icons <a href="https://github.com/danklammer/bytesize-icons#grab-n-go">Bootstrap byte-size-icons</a></p>
                    <RestClientSelector handler={this.props.restClientHandler} restClient={this.props.restClient} />
                </div>
            </div>
        );
    }
}

export default InfoBox