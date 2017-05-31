import React, { Component } from 'react';
import {
  TabBarIOS,
  Text,
  Alert,
  Vibration,
  StatusBar
} from 'react-native';
import NewsFeed from './NewsFeed';
import Search from './Search';
import * as globalStyles from '../styles/global';

// Set the status bar for iOS to light
StatusBar.setBarStyle('dark-content')

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: 'newsFeed'
    };
    this.showBookmarkAlert = this.showBookmarkAlert.bind(this);
  }

  showBookmarkAlert() {
    Vibration.vibrate();
    Alert.alert(
      'Coming soon!',
      'We are hard at work building this feature!',
      [{ text: 'OK', onPress: () => console.log('User pressed OK') }]
    );
  }

  render() {
    return (
      /*Each tab will assign it's selected prop based on the name stored in state.*/
      /*TabBarIOS can use a badge={4} prop*/
      <TabBarIOS
        barTintColor={globalStyles.BAR_COLOR}
        tintColor={globalStyles.LINK_COLOR}
        translucent={false}
      >
        <TabBarIOS.Item
          systemIcon={'featured'}
          selected={this.state.tab === 'newsFeed'}
          onPress={ () => this.setState({tab: 'newsFeed'})}
        >
          <NewsFeed />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon={'search'}
          selected={this.state.tab === 'search'}
          onPress={ () => this.setState({tab: 'search'})}
        >
          <Search />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon={'bookmarks'}
          selected={this.state.tab === 'bookmarks'}
          onPress={ () => this.showBookmarkAlert()}
        >
          <Text>Bookmarks</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}
