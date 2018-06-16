import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {create} from 'apisauce'
import { Button, Text } from 'native-base'
import RNFetchBlob from 'react-native-fetch-blob'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MusicLinks from '../Components/MusicLinks'

// Styles
import styles from './Styles/DownloadMusicScreenStyle'

const radioJavanApi = create({
  baseURL: 'https://app1.rjapp.io/api2'
})

class DownloadMusicScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dirs: RNFetchBlob.fs.dirs,
      items: [],
      title: null
    }
  }

  getPlayListLinks () {
    radioJavanApi.get(`/mp3_playlist_with_items?id=e2d3ba1031f3`)
    .then(res => {
      this.setState({
        items: res.data.items,
        title: res.data.title.replace(/\s/g, '')
      })
    })
  }

  render () {
    const { items, dirs, title } = this.state

    return (
      <View style={styles.section} >
        <Button onPress={this.getPlayListLinks.bind(this)}>
          <Text>Download</Text>
        </Button>
        <ScrollView>
          {items.length > 0 && items.map((item, key) => (
            <MusicLinks key={key} title={title} item={item} dirs={dirs} />
          ))}
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapDispatchToProps)(DownloadMusicScreen)
