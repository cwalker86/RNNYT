import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import SmallText from './SmallText';
import * as globalStyles from '../styles/global';

const Byline = ({ date, author, location }) => (
  <View>
    { /* Group SmallText components, showing date and author */}
    <View style={styles.row}>
      <SmallText>
        {date.toLocaleDateString()}
      </SmallText>
      <SmallText>
        {author}
      </SmallText>
    </View>
 {/* optional second row to display article's location*/}
  { location ? (
    <View style ={ styles.row}>
      <SmallText style ={ styles.location}>
        {location}
      </SmallText>
      </View>
    ) : null
  }
</View>
);

Byline.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  author: PropTypes.string.isRequired,
  location: PropTypes.string
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  location: {
    color: globalStyles.MUTED_COLOR
  }
});

export default Byline;
