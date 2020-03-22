import React from 'react';

class Messages extends React.Component {

    render() {
        return (
            <div className={'alert alert-danger'+(this.props.errorMsg?'':' collapse')} role="alert" id="errorDiv">
                <pre><code>{this.props.errorMsg}</code></pre>
            </div>
        )
    }
}

export default Messages