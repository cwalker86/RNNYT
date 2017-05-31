import React , { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActionSheetIOS
} from 'react-native';

import Byline from './Byline';
import AppText from './AppText';
import Thumbnail from './Thumbnail';
import * as globalStyles from '../styles/global';

export default class NewsItem extends Component {

  constructor(props) {
    super(props)
    this.onLongPress = this.onLongPress.bind(this);
  }

  onLongPress() {
    // Open action sheet.
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Bookmar', 'Cancel'],
      cancelButtonIndex: 1,
      title: this.props.title
    }, buttonIndex => console.log('Button Selected', buttonIndex));
  }

  render() {
    const {
      style,
      imageUrl,
      title,
      author,
      date,
      location,
      description,
      onPress
    } = this.props;
    const accentColor = globalStyles.ACCENT_COLORS[this.props.index % globalStyles.ACCENT_COLORS.length];
    /* <TouchableOpacity
            onPressIn ={() = > console.log(' Press started')}
            onPressOut ={() = > console.log(' Press ending')}
            onPress ={() = > console.log(' Press complete')}
            onLongPress={this.openContextMenu}
            delayLongPress ={ 1000} // calls this.openContextMenu after 1 second
            hitSlop ={{ top: 10,  left: 5, right: 5, bottom: 10 }} // distance from the top of the component that press can start
           />
    */
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        onLongPress={this.onLongPress}
      >
        <View>
          <Thumbnail
            url={imageUrl}
            titleText={title}
            accentColor={accentColor}
            style={styles.Thumbnail}
            />
            <View style={styles.content}>
              <Byline
                author={author}
                date={date}
                location={location}
              />
              <AppText>
                {description}
              </AppText>
            </View>
        </View>
      </TouchableOpacity>
    );
  }
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  author: PropTypes.string.isRequired,
  location: PropTypes.string,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style
};

const styles = StyleSheet.create({
  thumbnail: {
    marginBottom: 5
  },
  content: {
    paddingHorizontal: 5
  }
});
