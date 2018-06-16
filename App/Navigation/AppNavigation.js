import { StackNavigator } from 'react-navigation'
import PlaylistScreen from '../Containers/PlaylistScreen'
import DownloadMusicScreen from '../Containers/DownloadMusicScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PlaylistScreen: { screen: PlaylistScreen },
  DownloadMusicScreen: { screen: DownloadMusicScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
