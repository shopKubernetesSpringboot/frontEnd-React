import React from 'react';

export default class RestClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            restClient: this.props.client==='Fetch'?'Fetch':'Axios',
            isRestClientAxios: true
        }
    }

    toggleRestClient() {
        this.setState({restClient: this.state.restClient==='Axios'?'Fetch':'Axios' },
            () => this.setState({isRestClientAxios: this.state.restClient==='Axios'}))
        
    }

    render() {
        return (
            <p>{this.state.restClient} Rest Client:&nbsp;
                <button data-testid="axiosButton" type="button" className={'btn  btn-sm '+(this.state.isRestClientAxios?'btn-primary':'btn-outline-primary')} onClick={()=>this.toggleRestClient()}>Axios</button>
                <button data-testid="fetchButton" type="button" className={'btn  btn-sm '+(!this.state.isRestClientAxios?'btn-primary':'btn-outline-primary')} onClick={()=>this.toggleRestClient()}>Fetch</button>
            </p>
        );
    }
}
