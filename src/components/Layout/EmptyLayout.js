import {Content} from 'components/Layout';
import React from 'react';
import {connect} from 'react-redux';
import Preloader from '../../common/preloader/Preloader';

// const EmptyLayout = ({ children, ...restProps }) => (

//     let showPreloader;

//     if (this.props.showPreloader) {
//         showPreloader = <Preloader/>;
//     }

//   <main className="cr-app bg-light" {...restProps}>
//     {showPreloader}
//     <Content fluid onClick={this.handleContentClick}>
//       {children}
//     </Content>
//   </main>
// );

// export default EmptyLayout;


class EmptyLayout extends React.Component {
    render() {
      const {children} = this.props;
      let showPreloader;

      if (this.props.showPreloader) {
          showPreloader = <Preloader/>;
      }

      return (
        <main className="cr-app bg-light">
            {showPreloader}
            <Content fluid onClick={this.handleContentClick}>
            {children}
            </Content>
        </main>
      );
    }
  }

  const mapStatetoProps = (state) => {
    return {
      showPreloader: state.dashboard.showPreloader
    }
  }

  export default connect(mapStatetoProps, {})(EmptyLayout);
