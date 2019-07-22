import React from 'react';
import {Spinner} from 'reactstrap';

class Preloader extends React.Component {

    render() {
        return (
            <div style={{
                position: 'fixed',
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: '100',
                }}>
                <div style={{
                    top: '50%',
                    position: 'absolute',
                    left: '50%',
                }}>
                    <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }
}
  
  export default Preloader;
