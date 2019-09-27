import {connect} from 'react-redux';
import {getEntidades, getEntidadesHistorico} from '../store/actions/dashboardActions';
import {NumberCotizaciones, IconsCotizaciones} from 'components/Widget';
import Page from 'components/Page';
import React from 'react';
import {Redirect} from 'react-router-dom';

const entidadesList = [
  'columbia',
  'frances',
  'galicia',
  'icbc',
  'nacion',
  'patagonia',
  'provincia',
  'santander',
  'supervielle',
  'alpe',
  'maguitur',
  'maxinta',
  'montevideo',
  'vaccaro',
]


class DashboardPage extends React.Component {

  componentDidMount() {
    this.props.getEntidades();
    for(let i=0; i < entidadesList.length; i++) {
      this.props.getEntidadesHistorico(entidadesList[i]);
    }
    setInterval(() => this.props.getEntidades(), 3600000);
    setInterval(() => {
      for(let i=0; i < entidadesList.length; i++) {
        this.props.getEntidadesHistorico(entidadesList[i]);
      }
    }, 3600000);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.entidades !== nextProps.entidades ||
        this.props.alpe !== nextProps.alpe ||
        this.props.columbia !== nextProps.columbia ||
        this.props.frances !== nextProps.frances ||
        this.props.galicia !== nextProps.galicia ||
        this.props.icbc !== nextProps.icbc ||
        this.props.maguitur !== nextProps.maguitur ||
        this.props.maxinta !== nextProps.maxinta ||
        this.props.montevideo !== nextProps.montevideo ||
        this.props.nacion !== nextProps.nacion ||
        this.props.patagonia !== nextProps.patagonia ||
        this.props.provincia !== nextProps.provincia ||
        this.props.santander !== nextProps.santander ||
        this.props.supervielle !== nextProps.supervielle ||
        this.props.tokenExpired !== nextProps.tokenExpired ||
        this.props.vaccaro !== nextProps.vaccaro) {
      return true;
    }

    return false
  }

  render() {
    let iconCotizaciones, numberCotizaciones;

    if (this.props.tokenExpired) {
      return <Redirect to="/"/>
    }

    let ultimasDosRuedas = [];

    ultimasDosRuedas.push(this.props.alpe.slice(0, 2), this.props.columbia.slice(0, 2), this.props.frances.slice(0, 2), this.props.galicia.slice(0, 2), this.props.icbc.slice(0, 2), this.props.maguitur.slice(0, 2), this.props.maxinta.slice(0, 2), this.props.montevideo.slice(0, 2), this.props.nacion.slice(0, 2), this.props.patagonia.slice(0, 2), this.props.provincia.slice(0, 2), this.props.santander.slice(0, 2), this.props.supervielle.slice(0, 2), this.props.vaccaro.slice(0, 2));

    if (Object.entries(this.props.entidades).length !== 0 && this.props.vaccaro.length > 0 && this.props.supervielle.length > 0 && this.props.santander.length > 0 && this.props.provincia.length > 0 && this.props.patagonia.length > 0 && this.props.nacion.length > 0 && this.props.montevideo.length > 0 && this.props.maxinta.length > 0 && this.props.maguitur.length > 0 && this.props.icbc.length > 0 && this.props.galicia.length > 0 && this.props.frances.length > 0 && this.props.columbia.length > 0 && this.props.alpe.length > 0) {
      iconCotizaciones = (<IconsCotizaciones entidades={Object.values(this.props.entidades)}/>);
      numberCotizaciones = (<NumberCotizaciones ultimasDosRuedas={ultimasDosRuedas}/>);
    }



    return (
      <Page
        className="DashboardPage content-page"
        title="Panel de control"
        style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          {iconCotizaciones}
          {numberCotizaciones}
      </Page>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    alpe: state.dashboard.alpe,
    columbia: state.dashboard.columbia,
    entidades: state.dashboard.entidades,
    frances: state.dashboard.frances,
    galicia: state.dashboard.galicia,
    icbc: state.dashboard.icbc,
    maguitur: state.dashboard.maguitur,
    maxinta: state.dashboard.maxinta,
    montevideo: state.dashboard.montevideo,
    nacion: state.dashboard.nacion,
    patagonia: state.dashboard.patagonia,
    provincia: state.dashboard.provincia,
    santander: state.dashboard.santander,
    supervielle: state.dashboard.supervielle,
    tokenExpired: state.dashboard.tokenExpired,
    vaccaro: state.dashboard.vaccaro,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEntidades: () => dispatch(getEntidades()),
    getEntidadesHistorico: (entidadesList) => dispatch(getEntidadesHistorico(entidadesList))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(DashboardPage);
