import React from 'react'
import logo from '../logo.svg';
import RestClient from './restClient';

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
                    <p>Icons <a href="https://github.com/danklammer/bytesize-icons">Bootstrap byte-size-icons</a></p>
                    <RestClient handler={this.props.restClientHandler} restClient={this.props.restClient}/>
                </div>
            </div>
        );
    }
  }

export default InfoBox