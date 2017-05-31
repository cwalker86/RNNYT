import React, { PropTypes, Component } from 'react';
import {
  ListView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  WebView
} from 'react-native';
import * as globalStyles from '../styles/global';

import SmallText from './SmallText';
import NewsItem from './NewsItem';

export default class NewsFeed extends Component {

  constructor(props) {
    super(props);
    /* rowHasChanged is a func that informs on how to compare rows upon change */
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.title !== row2.title
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(props.news),
      modalVisible: false
    };
    this.renderRow = this.renderRow.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onModalOpen(url){
    this.setState({
      modalVisible: true,
      modalUrl: url
    });
  }

  onModalClose(){
    this.setState({
      modalVisible: false
    });
  }

  renderModal() {
    /*Add animationType to animate the modal to slide in, instead of just becoming visible*/
    // < WebView onNavigationStateChange ={( navState) = > { if (navState.canGoBack) { this.showBackButton(); } }} />
    // ^^^^ in order to add a back button w/in the webview.

    return (
      <Modal
        animationType="slide"
        visible={this.state.modalVisible}
        onRequestClose={this.onModalClose}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={this.onModalClose}
            style={styles.closeButton}
          >
            <SmallText>X</SmallText>
          </TouchableOpacity>
          <WebView
            scalesPageToFit
            source={{uri: this.state.modalUrl}}
          />
        </View>
      </Modal>
    );
  }

  // Method that tells ListView how to render each row.
  renderRow(rowData, ...rest) {
    const index = parseInt(rest[1], 10);
    return (
      <NewsItem
        onPress={ () => this.onModalOpen(rowData.url)}
        style={styles.newsItems}
        index={index}
        {...rowData}
      />
    );
  }

  render() {
    /*renderHeader, renderFooter, renderSeparator can be used with ListView as props*/
    /*Each of these functions should return a renderable React element.*/
    return (
      <View style ={ globalStyles.COMMON_STYLES.pageContainer}>
      {/* enableEmptySections says to render empty list sections*/}
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={this.props.listStyles}
        />
        {this.renderModal()}
      </View>
    );
  }
}

NewsFeed.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  listStyles: View.propTypes.style
};

// Creating Mock Data with default props.
NewsFeed.defaultProps = {
   news: [
     {
       title: 'React Native',
        imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
        description: 'Build Native Mobile Apps using JavaScript and React',
        date: new Date(),
        author: 'Facebook',
        location: 'Menlo Park, California',
        url: 'https://facebook.github.io/react-native'
    },
    {
      title: 'Packt Publishing',
      imageUrl: 'https://www.packtpub.com/sites/default/files/packt_logo.png',
      description: 'Stay Relevant',
      date: new Date(),
      author: 'Packt Publishing',
      location: 'Birmingham, UK',
      url: 'https://www.packtpub.com/'
    }
  ]
};

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: globalStyles.BG_COLOR
  },
  closeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row'
  }
});
