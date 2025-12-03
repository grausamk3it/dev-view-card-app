import React from 'react';
import { useSelector } from 'react-redux';

const withTheme = (WrappedComponent) => {
  return (props) => {
    const { currentTheme, themes } = useSelector(state => state.theme);
    const theme = themes[currentTheme];

    return <WrappedComponent {...props} theme={theme} />;
  };
};

export default withTheme;