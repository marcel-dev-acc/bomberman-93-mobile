import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import store from './src/state/store'
import {Provider as ReduxProvider} from 'react-redux'

import colors from './src/constants/colors'
import Navigation from './Navigation'
import {ErrorsContainer, MusicToggle} from './src/components/General'
import {DEBUG} from './src/constants/app'

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <SafeAreaView
        style={{
          ...styles.appContainer,
          backgroundColor: colors.DARK_BLUE,
        }}>
        <Navigation />
        <ErrorsContainer />
        {!DEBUG && <MusicToggle />}
      </SafeAreaView>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
