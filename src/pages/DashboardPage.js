import React from 'react';
import {CardGroup, Row, Col} from 'reactstrap';

import {MdThumbUp} from 'react-icons/lib/md';
import Page from 'components/Page';
import DatatablePage from './TablePage';
import { NumberWidget, IconWidget } from 'components/Widget';
import {connect} from 'react-redux';
import {getEntidad} from '../store/actions/entidadesActions';

const API = 'https://protected-mountain-77919.herokuapp.com/api/';
const ENTIDADES = [
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

  constructor(props) {
    super(props);

    this.state = {
      entidades: {
        columbia:{},
        frances:{},
        galicia:{},
        icbc:{},
        nacion:{},
        patagonia:{},
        provincia:{},
        santander:{},
        supervielle:{},
        alpe:{},
        maguitur:{},
        maxinta:{},
        montevideo:{},
        vaccaro:{}
      }
    }

    this.getCotizacionesNow = this.getCotizacionesNow.bind(this);
  }

  componentDidMount() {
    this.getCotizacionesNow();
  }

  cotizacionAltaCompraIconWidget(cotizacionParam) {
    let dataResultado;
    let resultado = 0;
    
    for(let i=0; i < ENTIDADES.length; i++) {
      if (!cotizacionParam[i]) {
        return;
      }
      if(parseFloat(cotizacionParam[i].compra).toFixed(2) > resultado) {
        resultado = parseFloat(cotizacionParam[i].compra).toFixed(2);
        dataResultado=cotizacionParam[i];
      }
    }
    let logo = dataResultado.entidad === 'Montevideo' ||  dataResultado.entidad === 'Vaccaro' ? '' : dataResultado.logo;
    return (
      <IconWidget
        bgColor="white"
        inverse={false}
        icon={MdThumbUp}
        subtitle="Mayor precio de compra"
        entidad={dataResultado.entidad}
        valor={`$ ${dataResultado.compra}`}
        logo={logo}
      />
    );
  }
  
  cotizacionBajaCompraIconWidget(cotizacionParam) {
    if (!cotizacionParam[0]) {
      return;
    }
    let dataResultado;
    let resultado = parseFloat(cotizacionParam[0].compra).toFixed(2);
    
    for(let i=0; i < ENTIDADES.length; i++) {
      if (!cotizacionParam[i]) {
        return;
      }
      if(parseFloat(cotizacionParam[i].compra).toFixed(2) <= resultado) {
        resultado = parseFloat(cotizacionParam[i].compra).toFixed(2)
        dataResultado = cotizacionParam[i];
      }
    }
    let logo = dataResultado.entidad === 'Montevideo' ||  dataResultado.entidad === 'Vaccaro' ? '' : dataResultado.logo;
    return (
      <IconWidget
        bgColor="white"
        inverse={false}
        icon={MdThumbUp}
        subtitle="Menor precio de compra"
        entidad={dataResultado.entidad}
        valor={`$ ${dataResultado.compra}`}
        logo={logo}
      />
    );
  }

  cotizacionAltaVentaIconWidget(cotizacionParam) {
    let dataResultado;
    let resultado = 0;
    
    for(let i=0; i < ENTIDADES.length; i++) {
      if (!cotizacionParam[i]) {
        return;
      }
      if(parseFloat(cotizacionParam[i].venta).toFixed(2) > resultado) {
        resultado = parseFloat(cotizacionParam[i].venta).toFixed(2);
        dataResultado=cotizacionParam[i];
      }
    }
    let logo = dataResultado.entidad === 'Montevideo' ||  dataResultado.entidad === 'Vaccaro' ? '' : dataResultado.logo;
    return (
      <IconWidget
        bgColor="white"
        inverse={false}
        icon={MdThumbUp}
        subtitle="Mayor precio de venta"
        entidad={dataResultado.entidad}
        valor={`$ ${dataResultado.venta}`}
        logo={logo}
      />
    );
  }

  cotizacionBajaVentaIconWidget(cotizacionParam) {
    if (!cotizacionParam[0]) {
      return;
    }
    let dataResultado;
    let resultado = parseFloat(cotizacionParam[0].venta).toFixed(2);
    
    for(let i=0; i < ENTIDADES.length; i++) {
      if (!cotizacionParam[i]) {
        return;
      }
      if(parseFloat(cotizacionParam[i].venta).toFixed(2) <= resultado) {
        resultado = parseFloat(cotizacionParam[i].venta).toFixed(2)
        dataResultado = cotizacionParam[i];
      }
    }
    let logo = dataResultado.entidad === 'Montevideo' ||  dataResultado.entidad === 'Vaccaro' ? '' : dataResultado.logo;
    return (
      <IconWidget
        bgColor="white"
        inverse={false}
        icon={MdThumbUp}
        subtitle="Menor precio de venta"
        entidad={dataResultado.entidad}
        valor={`$ ${dataResultado.venta}`}
        logo={logo}
      />
    );
  }

  cotizacionMayorSpreadIconWidget(cotizacionParam) {
    if (!cotizacionParam[0]) {
      return;
    }
    let dataResultado;
    let resultadoCompra;
    let resultadoVenta;
    let resultado = 0;
    let resultadoTemp;

    
    for(let i=0; i < ENTIDADES.length; i++) {
      if (!cotizacionParam[i]) {
        return;
      }
      
      resultadoCompra = parseFloat(cotizacionParam[0].compra);
      resultadoVenta = parseFloat(cotizacionParam[0].venta);
      resultadoTemp = resultadoVenta - resultadoCompra;
      if(resultadoTemp > resultado) {
        resultado = resultadoTemp.toFixed(2);
        dataResultado = cotizacionParam[i];
      }
    }
    let logo = dataResultado.entidad === 'Montevideo' ||  dataResultado.entidad === 'Vaccaro' ? '' : dataResultado.logo;
    return (
      <IconWidget
        bgColor="white"
        inverse={false}
        icon={MdThumbUp}
        subtitle="Mayor spread entre precios"
        entidad={dataResultado.entidad}
        valor={`$ ${resultado}`}
        logo={logo}
      />
    );
  }

  cotizacionMenorSpreadIconWidget(cotizacionParam) {
    if (!cotizacionParam[0]) {
      return;
    }
    let dataResultado;
    let resultadoCompra;
    let resultadoVenta;
    let resultado = parseFloat(cotizacionParam[0].venta).toFixed(2) - parseFloat(cotizacionParam[0].compra);

    for(let i=0; i < ENTIDADES.length; i++) {
      if (!cotizacionParam[i]) {
        return;
      }
      
      resultadoCompra = parseFloat(cotizacionParam[i].compra);
      resultadoVenta = parseFloat(cotizacionParam[i].venta);
      let resultadoTemp = resultadoVenta - resultadoCompra;

      if(resultadoTemp <= resultado) {
        resultado = resultadoTemp;
        dataResultado = cotizacionParam[i];
      }
    }
    let logo = dataResultado.entidad === 'Montevideo' ||  dataResultado.entidad === 'Vaccaro' ? '' : dataResultado.logo;
    return (
      <IconWidget
        bgColor="white"
        inverse={false}
        icon={MdThumbUp}
        subtitle="Menor spread entre precios"
        entidad={dataResultado.entidad}
        valor={`$ ${resultado.toFixed(2)}`}
        logo={logo}
      />
    );
  }

  getDataTable(cotizacionParam) {
    return (
      <Col lg="12" md="12" sm="12" xs="12">
        <DatatablePage rowData={cotizacionParam}/>
      </Col>
    );
  }

  async getCotizacionesNow() {
    Promise.all(ENTIDADES.map((entidades)=>{
      fetch(API + entidades)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        data = data.slice(0, 5);
        for(let i=0; i<data.length; i++) {
          data[i].logo = `/entidades/${entidades}.png`;
        }
        return this.setState(prevState => ({
          entidades: {
            ...prevState.entidades,
            [entidades]: {
              data
            }
          }
        }));
      })
      .catch(error => console.log(error));
    }
    ))
  };

  render() {
    console.log(this.props);
    let cotizacionParam = [];

    let cotizacionWidget = ENTIDADES.map((data, i)=>{
      if (!this.state.entidades[data].data) {
        return;
      }
      let item = this.state.entidades[data].data[0];
      cotizacionParam.push(item);
      let logo = item.entidad === 'Montevideo' ||  item.entidad === 'Vaccaro' ? '' : item.logo;
      let barColorCompra = item.compra >= this.state.entidades[data].data[1].compra ? 'success' : 'danger';
      let barColorVenta = item.venta >= this.state.entidades[data].data[1].venta ? 'success' : 'danger';
      let porcentajeCompra = (((item.compra/this.state.entidades[data].data[1].compra)*100)-100).toFixed(2);
      let porcentajeVenta = (((item.venta/this.state.entidades[data].data[1].venta)*100)-100).toFixed(2);
      let spread = item.venta - item.compra;

      return (<Col key={i} lg={6} md={6} sm={12} xs={12}>
        <NumberWidget
          title={item.entidad}
          subtitle={`${item.dia} ${item.hora}`}
          spread={spread}
          compra={item.compra}
          anteriorCompra = {this.state.entidades[data].data[1].compra}
          venta={item.venta}
          anteriorVenta = {this.state.entidades[data].data[1].venta}
          logo = {logo}
          colorCompra = {barColorCompra}
          colorVenta = {barColorVenta}
          modificacionCompra = {porcentajeCompra}
          modificacionVenta = {porcentajeVenta}
          progress={{
            label: 'Porcentaje de variacion',
          }}
        />
      </Col>);
    })
    return (
      <Page
        className="DashboardPage"
        title="Panel de control"
        style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
          <CardGroup style={ {marginTop: '2rem' }}
          lg={3} md={3} sm={12} xs={12}>
            {this.cotizacionAltaCompraIconWidget(cotizacionParam)}
            {this.cotizacionAltaVentaIconWidget(cotizacionParam)}
            {this.cotizacionMayorSpreadIconWidget(cotizacionParam)}
          </CardGroup>
          <CardGroup style={ { marginBottom: '2rem'}}
          lg={3} md={3} sm={12} xs={12}>
            {this.cotizacionBajaCompraIconWidget(cotizacionParam)}
            {this.cotizacionBajaVentaIconWidget(cotizacionParam)}
            {this.cotizacionMenorSpreadIconWidget(cotizacionParam)}
          </CardGroup>
          </Col>
        </Row>

        <Row>
          {cotizacionWidget}
        </Row>

        <Row style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          {this.getDataTable(cotizacionParam)}
        </Row>

        {/* <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Revenue{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Total Expense</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Cost of sales{' '}
                  <Badge color="secondary">$3000</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdBubbleChart size={25} color={primaryColor} /> Management
                  costs <Badge color="secondary">$1200</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdShowChart size={25} color={primaryColor} /> Financial costs{' '}
                  <Badge color="secondary">$800</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdPieChart size={25} color={primaryColor} /> Other operating
                  costs <Badge color="secondary">$2400</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row> */}

        {/* <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Products</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  )
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Users</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'date',
                    'participation',
                    '%',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row> */}

        {/* <Row>
          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [0, 13000, 5000, 24000, 16000, 25000, 10000],
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute' }}>
                <CardTitle>
                  <MdInsertChart /> Sales
                </CardTitle>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [10000, 15000, 5000, 10000, 5000, 10000, 10000],
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute' }}>
                <CardTitle>
                  <MdInsertChart /> Revenue
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <Card>
              <Line
                data={getStackLineChart({
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  data: [0, 13000, 5000, 24000, 16000, 25000, 10000].reverse(),
                })}
                options={stackLineChartOptions}
              />
              <CardBody
                className="text-primary"
                style={{ position: 'absolute', right: 0 }}>
                <CardTitle>
                  <MdInsertChart /> Profit
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row> */}

        {/* <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <InfiniteCalendar
              selected={today}
              minDate={lastWeek}
              width="100%"
              theme={{
                accentColor: primaryColor,
                floatingNav: {
                  background: secondaryColor,
                  chevron: primaryColor,
                  color: '#FFF',
                },
                headerColor: primaryColor,
                selectionColor: secondaryColor,
                textColor: {
                  active: '#FFF',
                  default: '#333',
                },
                todayColor: secondaryColor,
                weekdayColor: primaryColor,
              }}
            />
          </Col>

          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Map with bubbles
              </CardHeader>
              <CardBody>
                <MapWithBubbles />
              </CardBody>
            </Card>
          </Col>
        </Row> */}

        {/* <CardDeck style={{ marginBottom: '1rem' }}>
          <Card body style={{ overflowX: 'auto' }}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
            />
          </Card>

          <Card body style={{ overflowX: 'auto' }}>
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
              reversed
            />
          </Card>
        </CardDeck> */}

        {/* <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-secondary"
              header="Announcement"
              avatarSize={60}
              name="Jamy"
              date="1 hour ago"
              text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <TodosCard todos={todosData} />
          </Col>
        </Row> */}
      </Page>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    columbia: state.entidades.columbia,
    frances: state.entidades.frances,
    galicia: state.entidades.galicia,
    icbc: state.entidades.icbc,
    nacion: state.entidades.nacion,
    patagonia: state.entidades.patagonia,
    provincia: state.entidades.provincia,
    santander: state.entidades.santander,
    supervielle: state.entidades.supervielle,
    alpe: state.entidades.alpe,
    maguitur: state.entidades.maguitur,
    maxinta: state.entidades.maxinta,
    montevideo: state.entidades.montevideo,
    vaccaro: state.entidades.vaccaro

  }
}

export default connect(mapStatetoProps)(DashboardPage);
