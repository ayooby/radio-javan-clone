import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import RNFetchBlob from 'react-native-fetch-blob'
import { AudioControls } from 'react-native-hue-player'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PlaylistScreenStyle'

class PlaylistScreen extends Component {
  constructor () {
    super()
    this.state = {
      playlist: []
    }
  }
  async componentDidMount () {
    const { playlistName } = this.props.navigation.state.params
    this.getMusics(playlistName)
  }

  async getMusics (playlistName) {
    const dirs = RNFetchBlob.fs.dirs
    const playlistPath = `${dirs.DocumentDir}/Downloads/Radiojavan/${playlistName}`
    const musics = await RNFetchBlob.fs.ls(playlistPath)
    this.setState({
      playlist: musics.map((title, key) => ({
        key,
        title,
        url: `file://${playlistPath}/${title}`
      }))
    })
  }

  render () {
    const { playlist } = this.state
    return (
      <ScrollView style={styles.container}>
        {playlist.length > 0 &&
          <AudioControls
            initialTrack={0}
            playlist={playlist}
            activeColor={'#fdfa04'}
            inactiveColor={'#fdfab1'}
            hasButtonSkipSeconds
            timeToSkip={30}
          />
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen)
