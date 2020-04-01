import React from 'react';

export default class RestClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            restClient: props.restClient,
            isRestClientAxios: props.restClient==='Axios'
        }
    }

    toggleRestClient() {
        this.setState({restClient: this.state.restClient==='Axios'?'Fetch':'Axios' },
            () => {
                this.setState({isRestClientAxios: this.state.restClient==='Axios'})
                this.props.handler(this.state.restClient)
            })
    }

    render() {
        return (
            <p>{this.state.restClient} Rest Client:&nbsp;
                <button id="axiosButton" type="button" className={'btn  btn-sm '+(this.state.isRestClientAxios?'btn-primary':'btn-outline-primary')} onClick={()=>this.toggleRestClient()}>Axios</button>
                <button id="fetchButton" type="button" className={'btn  btn-sm '+(!this.state.isRestClientAxios?'btn-primary':'btn-outline-primary')} onClick={()=>this.toggleRestClient()}>Fetch</button>
            </p>
        );
    }
}
