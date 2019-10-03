import {Content, Footer, Header, Sidebar} from 'components/Layout';
import {connect} from 'react-redux';
import {getUser} from '../../store/actions/dashboardActions';
import React from 'react';

class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({breakpoint}) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
    this.props.getUser();    
  }

  handleContentClick = event => {
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    const {children} = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar user={this.props.user}/>
        <Content fluid onClick={this.handleContentClick}>
          <Header user={this.props.user}/>
          {children}
          <Footer />
        </Content>
      </main>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    user: state.dashboard.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser())
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainLayout);
