import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import colors from '../../../constants/colors';
import { UIError } from '../../../state/errors/reducer';
import Icon from '../Icon/Icon';
import { Icons } from '../Icon/iconMap';
import { removeError } from '../../../state/errors/reducer';



function ErrorsContainer(): JSX.Element {
  const errors: UIError[] = useSelector((state: any) => state.errors.errors);
  const dispatch = useDispatch();
  const screenWidth = useWindowDimensions().width;

  return (
    <View style={styles.errorsContainer}>
      {errors.length > 0 && errors.map((error, idx) => {
        return (
          <View
            key={idx}
            style={{
              ...styles.errorContainer,
              width: screenWidth * 0.9,
            }}
          >
            <View style={{
              ...styles.errorCol,
              flex: 9
            }}>
              <Text style={styles.errorTitle}>{error.title} ({idx + 1})</Text>
              <Text style={styles.errorText}>{error.value}</Text>
            </View>
            <View style={{
              ...styles.errorCol,
              ...styles.errorColEnd,
              flex: 1,
            }}>
              <TouchableHighlight
                onPress={(pressEvent) => {
                  if (pressEvent.nativeEvent.target === undefined) return;
                  dispatch(removeError(idx));
                }}
                underlayColor='rgba(0,0,0,0.1)'
                style={{
                  borderRadius: 100,
                }}
              >
                <Icon
                  name={Icons.close}
                  size={30}
                  color={colors.WHITE}
                />
              </TouchableHighlight>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  errorsContainer: {
    position: 'absolute',
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: colors.FIREBRICK_RED,
    backgroundColor: colors.RED,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 10,
    maxWidth: 600,
  },
  errorCol: {
    justifyContent: 'center',
  },
  errorColEnd: {
    alignItems: 'flex-end',
  },
  errorTitle: {
    fontSize: 20,
    color: colors.WHITE,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 15,
    color: colors.WHITE,
  },
});

export default ErrorsContainer;
