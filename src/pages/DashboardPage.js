import {connect} from 'react-redux';
import {getDashboardTable} from '../store/actions/dashboardActions';
import {DashboardTable, ResumenCotizaciones} from 'components/Widget';
import Page from 'components/Page';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {Row, Col} from 'reactstrap';

class DashboardPage extends React.Component {

  componentDidMount() {
      this.props.getDashboardTable();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.dashboardData !== nextProps.dashboardData ||
        this.props.tokenExpired !== nextProps.tokenExpired) {
      return true;
    }

    return false
  }

  render() {
    if (this.props.tokenExpired) {
      return <Redirect to="/"/>
    }

    return (
      <Page
        className="DashboardPage content-page"
        style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          <Row>
            <Col xs={12} md={8} className='MesaDeDineroTableContainer'>
              <DashboardTable data={this.props.dashboardData}/>
            </Col>
            <Col xs={12} md={3} className='MesaDeDineroDestacadosContainer'>
              <ResumenCotizaciones
                entidades={this.props.dashboardData}
              />
            </Col>
          </Row>
      </Page>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    tokenExpired: state.dashboard.tokenExpired,
    dashboardData: state.dashboard.dashboardData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardTable: () => dispatch(getDashboardTable())
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(DashboardPage);
