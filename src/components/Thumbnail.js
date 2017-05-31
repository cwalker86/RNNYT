import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';

import Title from '.Title';

const Thumbnail = ({ url, titleText, accentColor, style }) => {
  /* Add transparency to the color */
  const imageStyle = {
    backgroundColor: `${accentColor}77`
  };

  return (
    {/*Add a colored border to the bottom of the Thumbnail */}
    <View style={[styles.container, { borderColor: accentColor }, style]}>
      {/*If there is a url, display an image*/}
      {url.length > 0 ? (
        <Image
          style={[styles.image]}
          source={{uri: url}}
        >
          <Title style={styles.title}>{titleText}</Title>
        </Image>
      ) : (
       {/*Otherwise display a view of the correct size*/}
        <View style={[styles.image, imageStyle]}>
          <Title style={styles.title}>{titleText}</Title>;
        </View>
      )}
    </View>
  );
};

Thumbnail.propTypes = {
  style: View.propTypes.style,
  url: PropTypes.string.isRequired,
  titleText: PropTypes.string,
  accentColor: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderStyle: 'solid'
  },
  image: {
    height: 100,
    justifyContent: 'flex-end'
  },
  title: {
    padding: 5
  }
});

export default Thumbnail;
