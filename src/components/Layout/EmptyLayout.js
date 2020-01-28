import {Content} from 'components/Layout';
import React from 'react';


class EmptyLayout extends React.Component {
    render() {
      const {children} = this.props;

      return (
        <main className="cr-app bg-light">
            <Content fluid onClick={this.handleContentClick}>
            {children}
            </Content>
        </main>
      );
    }
  }

  export default EmptyLayout;
