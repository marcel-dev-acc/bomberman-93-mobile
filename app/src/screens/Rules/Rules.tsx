import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import { ScreenType, changeScreen } from '../../state/screens/reducer';
import { Icon, Icons } from '../../components/General';




function RulesScreen(): JSX.Element {

  const dispatch = useDispatch();

  return (
    <View style={styles.rulesContainer}>
      <View style={styles.rulesBackButtonContainer}>
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            dispatch(changeScreen({
              screen: ScreenType.welcome,
            }));
          }}
          style={{ borderRadius: 200 }}
          underlayColor='rgba(255,255,255,0.25)'
        >
          <Icon
            name={Icons.arrowLeft}
            color={colors.WHITE}
            size={30}
            style={{ margin: 5 }}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.rulesTextContainer}>
        <Text style={styles.rulesHeading}>
          Game rules
        </Text>
        <Text style={styles.rulesText}>
          "Bomb me" is a game where bombers go head to head
          in order to be the last bomber standing.
        </Text>
        <Text style={styles.rulesText}>
          You will be able walk around the map and drop bombs
          which will destroy objects in the way that are fragile
          and can be destroyed.
        </Text>
        <Text style={styles.rulesText}>
          To beat other bombers you will need to drop bombs
          and have the explotion from the bomb catch the other
          bomber in the fire.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rulesContainer: {
    flex: 1,
  },
  rulesBackButtonContainer: {
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  rulesTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rulesHeading: {
    color: colors.WHITE,
    fontSize: 40,
    marginBottom: 10,
  },
  rulesText: {
    color: colors.WHITE,
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'justify',
    width: Dimensions.get('window').width * 0.95,
  },
});

export default RulesScreen;
