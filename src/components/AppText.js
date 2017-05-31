import React, { PropTypes } from 'react';
import { Text } from 'react-native';

import * as globalStyles from '../styles/global';

// AppText is a functional component that wraps children in a Text component.
const AppText = ({ children, style, ...rest }) => (
  <Text style={[globalStyles.COMMON_STYLES.text, style ]}
    {...rest}>
    {children}
  </Text>
);

// Prop Validation.
AppText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node
}

export default AppText;
