import React from 'react';

export const AXIOS = 'Axios'
export const FETCH = 'Fetch'

export default class RestClientSelector extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            restClient: props.restClient,
            isRestClientAxios: props.restClient === AXIOS
        }
    }

    toggleRestClient() {
        this.setState({ restClient: this.state.restClient === AXIOS ? FETCH : AXIOS },
            () => {
                this.setState({ isRestClientAxios: this.state.restClient === AXIOS })
                this.props.handler(this.state.restClient)
            })
    }

    render() {
        return (
            <p>{this.state.restClient} Rest Client:&nbsp;
                <button id="axiosButton" type="button" className={'btn  btn-sm ' + (this.state.isRestClientAxios ? 'btn-primary' : 'btn-outline-primary')} onClick={() => this.toggleRestClient()}>{AXIOS}</button>
                <button id="fetchButton" type="button" className={'btn  btn-sm ' + (!this.state.isRestClientAxios ? 'btn-primary' : 'btn-outline-primary')} onClick={() => this.toggleRestClient()}>{FETCH}</button>
            </p>
        );
    }
}
