import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import {EntidadWidget} from 'components/Widget';
import {MdArrowDownward, MdArrowUpward, MdCompareArrows} from 'react-icons/lib/md';
import React, {Component} from 'react';



class NumberCotizaciones extends Component {
    render() {
        let cotizacionEntidadComparacionWidget = this.props.cotizacionesEntidadComparacion.map((data, i)=>{
            let iconCompra, iconVenta, colorCompra, colorVenta;
            let spread = data[0].venta - data[0].compra;

            if (data[0].venta > data[1].venta) {
                iconCompra = <MdArrowUpward/>;
                colorVenta = 'success';
            } else if (data[0].venta < data[1].venta) {
                iconCompra = <MdArrowDownward/>;
                colorVenta = 'danger';
            } else {
                iconCompra = <MdCompareArrows/>;
                colorVenta = 'muted';
            }

            if(data[0].compra > data[1].compra) {
                iconVenta = <MdArrowUpward/>;
                colorCompra = 'success';
            } else if (data[0].compra < data[1].compra) {
                iconVenta = <MdArrowDownward/>;
                colorCompra = 'danger';
            } else {
                iconVenta = <MdCompareArrows/>;
                colorCompra = 'muted';
            }

            let historico = (data[0].entidad.toLowerCase()==='bapro') ? this.props.provincia : this.props[data[0].entidad.toLowerCase()];

            return (
                <Col key={i} lg={6} md={6} sm={12} xs={12}>
                    <EntidadWidget
                        title={data[0].entidad}
                        subtitle={`${data[0].dia} ${data[0].hora}`}
                        spread={spread}
                        compra={data[0].compra}
                        anteriorcompra = {data[1].compra}
                        venta={data[0].venta}
                        anteriorventa = {data[1].venta}
                        logo = {data[0].entidad === 'Montevideo' ||  data[0].entidad === 'Vaccaro' ? '' : data[0].logo}
                        colorcompra = {colorCompra}
                        colorventa = {colorVenta}
                        iconcompra = {iconCompra}
                        iconventa = {iconVenta}
                        historico = {historico}
                    />
                </Col>
            );
        })
        return (
            <Row>
                {cotizacionEntidadComparacionWidget}
            </Row>
        );
    }


}

const mapStatetoProps = (state) => {
    return {
        alpe: state.dashboard.alpe,
        columbia: state.dashboard.columbia,
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
        vaccaro: state.dashboard.vaccaro,
    }
}

export default connect(mapStatetoProps, {})(NumberCotizaciones);

