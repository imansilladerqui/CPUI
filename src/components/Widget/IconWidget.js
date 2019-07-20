import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Card, CardBody, CardTitle, CardSubtitle, Row } from 'reactstrap';

const IconWidget = ({
  bgColor,
  entidad,
  icon: Icon,
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
    // entidadHeader =  <Icon size={50} {...iconProps} />
  }
  const classes = classNames('cr-widget', className, {
    [`bg-${bgColor}`]: bgColor,
  });
  return (
    <Card inverse className={classes} {...restProps}>
      {/* <CardBody className="cr-widget__icon">
        {entidadHeader}
      </CardBody> */}
      <CardBody className="text-center">
        <CardSubtitle className="mt-0">{subtitle}</CardSubtitle>
        <CardTitle style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>{entidadHeader}</CardTitle>
        <CardSubtitle className="mt-0">{valor}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

IconWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  subtitle: PropTypes.string,
};

IconWidget.defaultProps = {
  bgColor: 'primary',
  icon: 'span',
  iconProps: { size: 50 },
};

export default IconWidget;
