import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

const Button = ({
  children, to, onClick, disabled, theme = 'default',
}) => {

  const Element = (to && !disabled) ? Link : Div; 

  return ( //{disabled}는 있으면 추가 없으면 추가되지 않음
    <Element to={to} className={cx('button', theme, {disabled})} onClick={disabled ? () => null : onClick}>
      {children}
    </Element>
  );
};

export default Button;