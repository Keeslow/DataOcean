import React from 'react';
import PropTypes from 'prop-types';

const BasicPlus = (props) => {
  const { className } = props;
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M34.9991 6.66667H4.9991C3.15816 6.66667 1.66577 8.15906 1.66577 10V30C1.66577 31.841 3.15816 33.3333 4.9991 33.3333H34.9991C36.84 33.3333 38.3324 31.841 38.3324 30V10C38.3324 8.15906 36.84 6.66667 34.9991 6.66667Z"
        stroke="#1C3FAA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66577 16.6667H38.3324"
        stroke="#1C3FAA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66577 23.6667H38.3324"
        stroke="#1C3FAA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

BasicPlus.propTypes = {
  className: PropTypes.string,
};
BasicPlus.defaultProps = {
  className: '',
};

export default BasicPlus;
