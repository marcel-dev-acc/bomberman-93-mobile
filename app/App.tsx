import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import store from './src/state/store';
import {Provider as ReduxProvider, useSelector} from 'react-redux';

import colors from './src/constants/colors';
import Navigation from './Navigation';
import {
  ErrorsContainer,
  EventsCounter,
  MusicToggle,
} from './src/components/General';



function App(): JSX.Element {

  return (
    <ReduxProvider store={store}>
      <SafeAreaView style={{
        ...styles.appContainer,
        backgroundColor: colors.DARK_BLUE,
      }}>
        <Navigation />
        <ErrorsContainer />
        <EventsCounter />
        <MusicToggle />
      </SafeAreaView>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
