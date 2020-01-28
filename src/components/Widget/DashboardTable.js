import {MdArrowDownward, MdArrowUpward} from 'react-icons/lib/md';
import React from 'react';
import {Row} from 'reactstrap';
import Griddle, {RowDefinition, ColumnDefinition} from 'griddle-react';


const DashboardTable = (props) => {

    const dataTable = props.data.map((data, key) => {

        return {
            'id': key,
            'Entidad': `${data.entidad}`,
            'Compra': `$ ${data.compra}`,
            'Venta': `$ ${data.venta}`,
            'Spread': `$ ${data.spread}`,
            'Última Variacion': data.difventa,
            'Última Actualización': `${data.hora} ${data.dia}`,
        }
    });

    const entidadComponent = (data) => {
        return (
          <div>
              <img className="entidadImg" alt={data.value} src={`../entidades/${data.value}.png`}/>
          </div>
        );
    }

    const ultimaVariacion = ({value}) => (value >= 0) ? <span style={{ color: '#3AAC7F' }}> + {value}</span> : <span style={{ color: '#D31E1E' }}> - {value} {MdArrowDownward}</span>;

    const LocalPlugin = require('griddle-react').plugins.LocalPlugin;

    const styleConfig = {
        icons: {
          TableHeadingCell: {
            sortDescendingIcon: <MdArrowDownward/>,
            sortAscendingIcon: <MdArrowUpward/>
          },
        },
        classNames: {
          Row: 'row-class',
        },
        sortProperties: [
            { id: 'id', sortAscending: true },
            { id: 'Entidad', sortAscending: true },
            { id: 'Compra', sortAscending: true },
            { id: 'Venta', sortAscending: true },
            { id: 'Spread', sortAscending: true },
            { id: 'Última Variacion', sortAscending: true },
            { id: 'Última Actualización', sortAscending: true }
        ],
        styles: {
            Cell: {
                color: '#000000',
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '17px',
                textAlign: 'center',
                padding: '22px 21px 22px 26px',
                minWidth:'15%'
            },
            Filter: {
                display: "none"
            },
            SettingsToggle: {
                display: "none"
            },
            Table: {
                width: '100%'
            },
            TableHeading: {
                backgroundColor: 'rgba(216, 216, 216, 0.4)'
            },
            TableHeadingCell: {
                height:'72px',
                color: '#6F6F6F',
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '18px',
                fontWeight: '300',
                lineHeight: '24px',
                textAlign: 'center'
            }
        }
    }

    const NoResults = () => {
        return (
            <div>Cargando...</div>
        )
    }

    const PreviousButton = ({onClick, hasPrevious, className, text, style}) => {
        return (
            <div content={text} icon='angle left' disabled={!hasPrevious} labelposition='left' floated='left' onClick={onClick} style={style} className={className}></div>
        )
    }

    const NextButton = ({onClick, hasNext, className, text, style}) => {
        return (
            <div content={text} icon='angle right' disabled={!hasNext} labelposition='right' floated='right' onClick={onClick} style={style} className={className}></div>
        )
    }

    const CustomPageDropdown = ({maxPages, currentPage, setPage}) => {
        let pagesObj = [];
        for (let i = 1; i <= maxPages; i++) {
            if (maxPages > 1) {
                pagesObj.push({ value: i });
            }
        }
        return (
            <div className={`${'paginationBox'} page-count-wrapper`}>
                {pagesObj.map((data, key)=> {
                    return (
                        <div key={key} className={(currentPage === data.value) ? 'pageNumberContainerSelected' : 'pageNumberContainer'} value={data.value} onClick={(event) => setPage(parseInt(event.target.getAttribute('value')))}>
                            <div className={`${(currentPage === data.value) ? 'numberSelected' : ''} number`}  value={data.value} onClick={(event) => setPage(parseInt(event.target.getAttribute('value')))}>{data.value}</div>
                        </div>
                    );
                })}
            </div>
        )
    }

    const PaginationPlugin = {
        components: {
          NextButton,
          PreviousButton,
          PageDropdown: CustomPageDropdown,
        },
        styleConfig: {
          classNames: {
            Pagination: 'center',
          },
          styles: {
            Cell: { textAlign: 'center' },
          }
        },
      };

    return (
        <div>
            <Row className="MesaDeDineroTableFirstRow">
                <div className="MesaDeDineroTitle">
                    <h1>Mesa de dinero</h1>
                </div>
            </Row>
            <Row className="MesaDeDineroTableSecondRow">
                <Griddle
                data={dataTable}
                styleConfig={styleConfig}
                components={{
                    NoResults: NoResults
                }}
                plugins={[LocalPlugin, PaginationPlugin]}
                pageProperties={{
                    currentPage: 1,
                    pageSize: 15,
                    recordCount: props.data.length,
                }}>
                    <RowDefinition>
                        <ColumnDefinition id="id" />
                        <ColumnDefinition id="Entidad"  customComponent={entidadComponent}/>
                        <ColumnDefinition id="Compra" />
                        <ColumnDefinition id="Venta" />
                        <ColumnDefinition id="Spread" />
                        <ColumnDefinition id="Última Variacion" customComponent={ultimaVariacion} />
                        <ColumnDefinition id="Última Actualización" />
                    </RowDefinition>
                </Griddle>
            </Row>
        </div>

    );
}

export default DashboardTable;