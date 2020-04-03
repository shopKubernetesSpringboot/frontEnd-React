import React from 'react';

import { connect } from "react-redux";

class MessagesComp extends React.Component {

    render() {
        return (
            <div className={'alert alert-danger'+(this.props.errorMsg && this.props.errorMsg!==''?'':' collapse')} role="alert" id="errorDiv">
                <pre><code>{this.props.errorMsg}</code></pre>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const res= { errorMsg: (state.messages.length>0 && state.messages[0].errorMsg+state.messages[0].error!==''?state.messages[0].errorMsg+'\n'+state.messages[0].error:'') }
    state.messages=[]
    return res;
};  

const MessagesRedux = connect(mapStateToProps)(MessagesComp);
  
export default MessagesRedux