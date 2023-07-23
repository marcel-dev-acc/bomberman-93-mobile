import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {ServerStatus, SplashImage} from '../../components/General';
import {
  ScreenType,
  changeScreen,
  toggleIsLoading,
} from '../../state/screens/reducer';
import {getIsVertical} from '../../constants/screen';
import imageNames from '../../constants/imageNames';
import colors from '../../constants/colors';
import {requestToken} from './registration';
import {addError} from '../../state/errors/reducer';
import {StorageKeys, storeData} from '../../utils/localStorage';

type RegisterScreenProps = {
  setServerStatus: (serverStatus: ServerStatus) => void;
};

function RegisterScreen({setServerStatus}: RegisterScreenProps): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const dispatch = useDispatch();

  const [showExplanation, setShowExplanation] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [email, setEmail] = useState('');
  const [textInputColor, setTextInputColor] = useState(colors.BLACK);
  const [code, setCode] = useState('');

  return (
    <View
      style={{
        ...styles.registerContainer,
        width: width,
      }}>
      {isVertical && <SplashImage includeHeader />}
      {!isVertical && <SplashImage />}
      <TouchableHighlight
        onPress={pressEvent => {
          if (pressEvent.nativeEvent.target === undefined) {
            return;
          }
          setShowEmailForm(true);
          setShowEmailForm(false);
          setShowCodeForm(false);
          dispatch(changeScreen(ScreenType.welcome));
        }}
        underlayColor="rgba(255,255,255,0.25)"
        style={styles.registerBackIcon}>
        <Image
          source={imageNames.arrowLeftText}
          resizeMode="contain"
          style={{
            width: 40,
            height: 40,
          }}
        />
      </TouchableHighlight>
      {showExplanation && (
        <View style={styles.registerExplanationContainer}>
          <Image
            source={imageNames.registerPart1Text}
            resizeMode="contain"
            style={{
              width: isVertical ? 400 : 480,
              height: 100,
            }}
          />
          <Image
            source={imageNames.registerPart2Text}
            resizeMode="contain"
            style={{
              width: isVertical ? 400 : 480,
              height: 100,
            }}
          />
          <Image
            source={imageNames.registerPart3Text}
            resizeMode="contain"
            style={{
              width: isVertical ? 125 : 125,
              height: 40,
              marginBottom: 30,
            }}
          />
          <TouchableHighlight
            onPress={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) {
                return;
              }
              setShowExplanation(false);
              setShowEmailForm(true);
            }}
            style={{
              ...styles.registerButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor="rgba(255,255,255,0.25)">
            <Image
              source={imageNames.registerText}
              resizeMode="contain"
              style={{
                width: 240,
                height: 40,
              }}
            />
          </TouchableHighlight>
        </View>
      )}
      {showEmailForm && (
        <View style={styles.registerEmailFormContainer}>
          <Image
            source={imageNames.enterEmailText}
            resizeMode="contain"
            style={{
              width: 240,
              height: 40,
            }}
          />
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={{
              ...styles.registerInput,
              width: isVertical ? width * 0.8 : width * 0.4,
              color: isVertical ? colors.WHITE : textInputColor,
            }}
            onFocus={() => setTextInputColor(colors.BLACK)}
            onEndEditing={() => setTextInputColor(colors.WHITE)}
          />
          <TouchableHighlight
            onPress={async pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) {
                return;
              }
              dispatch(toggleIsLoading(true));
              const res = await requestToken(email);
              if (res.ok) {
                setShowEmailForm(false);
                setShowCodeForm(true);
              } else {
                dispatch(
                  addError({
                    title: '[Server Response] Server error response',
                    value: res.message,
                  }),
                );
              }
              dispatch(toggleIsLoading(false));
            }}
            style={{
              ...styles.registerButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor="rgba(255,255,255,0.25)">
            <Image
              source={imageNames.submitText}
              resizeMode="contain"
              style={{
                width: 180,
                height: 40,
              }}
            />
          </TouchableHighlight>
        </View>
      )}
      {showCodeForm && (
        <View style={styles.registerCodeFormContainer}>
          <Image
            source={imageNames.codeText}
            resizeMode="contain"
            style={{
              width: 240,
              height: 40,
            }}
          />
          <TextInput
            onChangeText={setCode}
            value={code}
            style={{
              ...styles.registerInput,
              width: isVertical ? width * 0.8 : width * 0.4,
              color: isVertical ? colors.WHITE : textInputColor,
            }}
            onFocus={() => setTextInputColor(colors.BLACK)}
            onEndEditing={() => setTextInputColor(colors.WHITE)}
          />
          <TouchableHighlight
            onPress={async pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) {
                return;
              }
              // Store the code locally
              await storeData(StorageKeys.token, code);
              setServerStatus(ServerStatus.localToken);
              // Go back to welcome screen
              dispatch(changeScreen(ScreenType.welcome));
            }}
            style={{
              ...styles.registerButton,
              width: isVertical ? width * 0.8 : width * 0.5,
            }}
            underlayColor="rgba(255,255,255,0.25)">
            <Image
              source={imageNames.submitText}
              resizeMode="contain"
              style={{
                width: 180,
                height: 40,
              }}
            />
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBackIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 45,
    borderRadius: 200,
    padding: 2.5,
  },
  registerExplanationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerEmailFormContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerCodeFormContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerInput: {
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;
