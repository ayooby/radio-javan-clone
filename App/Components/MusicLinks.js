import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import { Button, Text } from 'native-base'
import * as Progress from 'react-native-progress'
import styles from './Styles/MusicLinksStyle'

export default class MusicLinks extends Component {
  constructor () {
    super()
    this.state = {progress: null}
  }
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  download () {
    const { item, dirs, title } = this.props

    RNFetchBlob
      .config({
        path: `${dirs.DocumentDir}/Downloads/Radiojavan/${title}/${item.permlink}.mp3`
      })
      .fetch('GET', item.link
      )
      .progress((received, total) => {
        this.setState({progress: received / total})
        console.log('progress', received / total)
      })
      .then((resp) => {
        this.setState({progress: null})
        console.log('downloaded', resp)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.item.title}</Text>
        <Button onPress={this.download.bind(this)}>
          <Text>Download</Text>
        </Button>
        {this.state.progress &&
          <Progress.Bar progress={this.state.progress} width={200} />
        }
      </View>
    )
  }
}
