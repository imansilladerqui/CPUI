import {Card, CardBody, CardTitle, CardSubtitle, Row} from 'reactstrap';
import classNames from 'classnames';
import PropTypes from 'utils/propTypes';
import React from 'react';

const ResumenWidget = ({
  bgColor,
  entidad,
  iconProps,
  logo,
  subtitle,
  valor,
  className,
  ...restProps
}) => {
  let entidadHeader;
  if (logo) {
    entidadHeader = (
      <div>
        <Row>
          <img src={logo} alt={subtitle} id="logoIcon"></img>
        </Row>
      </div>
    )
  } else {
    entidadHeader = entidad
  }
  const classes = classNames('cr-widget', className, {
    [`bg-${bgColor}`]: bgColor,
  });
  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="text-center">
        <CardSubtitle className="mt-0">{subtitle}</CardSubtitle>
        <CardTitle style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>{entidadHeader}</CardTitle>
        <CardSubtitle className="mt-0">{valor}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

ResumenWidget.propTypes = {
  bgColor: PropTypes.string,
  iconProps: PropTypes.object,
  subtitle: PropTypes.string,
};

ResumenWidget.defaultProps = {
  bgColor: 'primary',
  iconProps: { size: 50 },
};

export default ResumenWidget;
