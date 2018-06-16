import React, { Component } from 'react'
import RNFetchBlob from 'react-native-fetch-blob'
import { AudioControls } from 'react-native-hue-player'
import { ScrollView, Image, View } from 'react-native'
import { Button, Card, Text, CardItem, Body } from 'native-base'

import { Images } from '../Themes'
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor () {
    super()
    this.state = {
      items: [],
      title: null,
      dirs: RNFetchBlob.fs.dirs,
      playlists: []
    }
  }

  handlePress () {
    const { dirs } = this.state
    const filePath = `file:///${dirs.DocumentDir}/Downloads/Radiojavan/WorldCup/Man's Not Hot.mp3`

    return [{
      key: 'isthis',
      title: 'song',
      url: filePath
    }]
  }

  componentDidMount () {
    this.getPlaylists()
  }

  getPlaylists () {
    const { dirs, playlists } = this.state
    if (playlists.length === 0) {
      return RNFetchBlob.fs.ls(`${dirs.DocumentDir}/Downloads/Radiojavan`)
        .then(playlists => this.setState({playlists}))
    }
  }

  goToPlaylistScreen (item) {
    this.props.navigation.navigate('PlaylistScreen', { playlistName: item })
  }

  goToDownloadScreen () {
    this.props.navigation.navigate('DownloadMusicScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.flexCenter}>
            <Button onPress={this.goToDownloadScreen.bind(this)}>
              <Text>Get PlayList</Text>
            </Button>
          </View>
          <Card>
            <CardItem header bordered>
              <Text>Available Files</Text>
            </CardItem>
            {this.state.playlists.map(item => (
              <CardItem bordered button onPress={() => this.goToPlaylistScreen(item)}>
                <Body>
                  <Text>
                    {item}
                  </Text>
                </Body>
              </CardItem>
            ))}
          </Card>
        </ScrollView>
      </View>
    )
  }
}
