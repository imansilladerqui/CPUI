
// import {Row, Col} from 'reactstrap';
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
  }

  shouldComponentUpdate(nextProps, nextState) {
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
    console.log(this.props);

    let iconCotizaciones, numberCotizaciones;

    if (this.props.tokenExpired) {
      return <Redirect to="dashboard"/>
    }

    let ultimasDosRuedas = [];

    ultimasDosRuedas.push(this.props.alpe.slice(1, 3), this.props.columbia.slice(1, 3), this.props.frances.slice(1, 3), this.props.galicia.slice(1, 3), this.props.icbc.slice(1, 3), this.props.maguitur.slice(1, 3), this.props.maxinta.slice(1, 3), this.props.montevideo.slice(1, 3), this.props.nacion.slice(1, 3), this.props.patagonia.slice(1, 3), this.props.provincia.slice(1, 3), this.props.santander.slice(1, 3), this.props.supervielle.slice(1, 3), this.props.vaccaro.slice(1, 3));

    if (Object.entries(this.props.entidades).length !== 0 && this.props.vaccaro.length > 0 && this.props.supervielle.length > 0 && this.props.santander.length > 0 && this.props.provincia.length > 0 && this.props.patagonia.length > 0 && this.props.nacion.length > 0 && this.props.montevideo.length > 0 && this.props.maxinta.length > 0 && this.props.maguitur.length > 0 && this.props.icbc.length > 0 && this.props.galicia.length > 0 && this.props.frances.length > 0 && this.props.columbia.length > 0 && this.props.alpe.length > 0) {
      iconCotizaciones = (<IconsCotizaciones entidades={Object.values(this.props.entidades)}/>);
      numberCotizaciones = (<NumberCotizaciones ultimasDosRuedas={ultimasDosRuedas}/>);
    }


    
    return (
      <Page
        className="DashboardPage"
        title="Panel de control"
        style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          {iconCotizaciones}
          {numberCotizaciones}

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
