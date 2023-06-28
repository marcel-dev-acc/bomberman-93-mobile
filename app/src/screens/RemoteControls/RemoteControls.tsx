import React, { useEffect, useRef, useState } from 'react';
import {
  DeviceEventEmitter,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  useWindowDimensions,
  Switch,
  TextInput,
  Image,
} from 'react-native';

import { Direction } from '../../constants/types';
import colors from '../../constants/colors';
import {
  Button,
  Icon,
  Icons,
  SplashImage
} from '../../components/General';
import {
  isAlertModuleAvailableOnAndroid,
  createAlertOnAndroid,
  isGamepadModuleAvailableOnAndroid,
  AndroidGamepadEvent,
} from '../../native/interface';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenType, changeScreen } from '../../state/screens/reducer';
import { Gamepad, receiveEvent, setupGamepad } from '../../state/gamepad/reducer';
import { getIsVertical } from '../../constants/screen';
import imageNames from '../../constants/imageNames';

enum Tabs {
  profiles = 'profiles',
  devices = 'devices',
  keys = 'keys',
};

interface AndroidGamepadProfile {
  profileName: string;
  deviceId: number;
  selected: boolean;
  bombKey?: number;
  upKey?: number;
  downKey?: number;
  leftKey?: number;
  rightKey?: number;
};

function RemoteControlsScreen(): JSX.Element {

  const { height, width } = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  const gamepad: Gamepad = useSelector((state: any) => state.gamepad);
  const dispatch = useDispatch();

  const handleIsAlertModuleAvailable = async () => {
    if (Platform.OS === 'android') {
      const alertIsAvailable: boolean = await isAlertModuleAvailableOnAndroid();
      setAlertModuleIsAvailable(alertIsAvailable);
    }
  };

  const handleIsGamepadModuleAvailable = async () => {
    if (Platform.OS === 'android') {
      const gamepadIsAvailable: boolean = await isGamepadModuleAvailableOnAndroid();
      setGamepadModuleIsAvailable(gamepadIsAvailable);
    }
  };

  const storeData = async (key: string, value: string) => {
    console.error('RemoteControls - storeData - NOT IMPLEMENTED');
    // try {
    //   await AsyncStorage.removeItem(`@${key}`);
    //   await AsyncStorage.setItem(`@${key}`, value);
    // } catch (err: any) {
    //   console.warn('Failed to store profile');
    // }
  };

  const fetchData = async (key: string) => {
    console.error('RemoteControls - fetchData - NOT IMPLEMENTED');
    // try {
    //   const profiles = await AsyncStorage.getItem(`@${key}`);
    //   if (profiles) setDisplayProfiles(JSON.parse(profiles));
    // } catch (err: any) {
    //   console.warn('Failed to store profile');
    // }
  };

  const handleKeySettingForProfile = (
    directionOrBomb: Direction | 'bomb',
  ) => {
    if (!activeEvent) {
      console.warn('No active event set, please try again');
      return;
    }
    const matchingProfiles = displayProfiles.filter((profile) => profile.deviceId === activeEvent.deviceId);
    if (matchingProfiles.length === 0) {
      console.warn('No matching profiles');
      return;
    }
    let activeProfile = matchingProfiles[0];
    switch (directionOrBomb) {
      case Direction.up:
        activeProfile.upKey = activeEvent.keyCode;
        break;
      case Direction.down:
        activeProfile.downKey = activeEvent.keyCode;
        break;
      case Direction.left:
        activeProfile.leftKey = activeEvent.keyCode;
        break;
      case Direction.right:
        activeProfile.rightKey = activeEvent.keyCode;
        break;
      case 'bomb':
        activeProfile.bombKey = activeEvent.keyCode;
        break;
    }
    const currentProfiles = displayProfiles;
    setDisplayProfiles([
      ...currentProfiles.filter((profile) => profile.deviceId !== activeEvent.deviceId),
      activeProfile,
    ]);
    storeData('profiles', JSON.stringify([
      ...currentProfiles.filter((profile) => profile.deviceId !== activeEvent.deviceId),
      activeProfile,
    ]));
    setActiveEvent(undefined);
    setActiveProfileName('');
    setShowKeyToProfileModal(false);
    setActiveTab(Tabs.profiles);
  };

  const [showDeviceToProfileModal, setShowDeviceToProfileModal] = useState(false);
  const [showKeyToProfileModal, setShowKeyToProfileModal] = useState(false);
  const [textInputColor, setTextInputColor] = useState(colors.BLACK);
  const [alertModuleIsAvailable, setAlertModuleIsAvailable] = useState(false);
  const [gamepadModuleIsAvailable, setGamepadModuleIsAvailable] = useState(false);
  const [gamepadIsEnabled, setGamepadIsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState(Tabs.profiles);
  const [activeEvent, setActiveEvent] = useState(undefined as undefined | AndroidGamepadEvent);
  const [activeProfileName, setActiveProfileName] = useState('');
  const [displayProfiles, setDisplayProfiles] = useState([] as AndroidGamepadProfile[]);
  const [displayedEvents, setDisplayedEvents] = useState([] as AndroidGamepadEvent[]);
  const displayEventsRef = useRef(displayedEvents);

  useEffect(() => {
    if (displayProfiles.length === 0) {
      fetchData('profiles');
    }
    // Check if the alert module is available
    if (!alertModuleIsAvailable) handleIsAlertModuleAvailable();
    // Check if the gamepad module is available
    if (!gamepadModuleIsAvailable) handleIsGamepadModuleAvailable();
    // Add listener for events
    if (gamepadIsEnabled && gamepadModuleIsAvailable) {
      if (Platform.OS === 'android') {
        createAlertOnAndroid('Added event listener for "onGamepadKeyEvent"');
        DeviceEventEmitter.addListener('onGamepadKeyEvent', (event: AndroidGamepadEvent) => {
          try {
            const currentDisplayEvents = [...displayEventsRef.current, event];
            displayEventsRef.current = currentDisplayEvents;
            setDisplayedEvents(currentDisplayEvents);
            dispatch(receiveEvent({
              action: event.action,
              keyCode: event.keyCode
            }));
          } catch (err: any) {}
        });
      }
    }
  }, [alertModuleIsAvailable, gamepadModuleIsAvailable, gamepadIsEnabled]);

  return (
    <View
      style={{
        ...styles.remoteControlsContainer,
        width: width,
      }}
    >
      <SplashImage />
      <View
        style={styles.remoteControlsNavigationContainer}
      >
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            dispatch(changeScreen({
              screen: ScreenType.welcome,
            }));
          }}
          underlayColor='rgba(255,255,255,0.25)'
          style={styles.remoteControlsBackIcon}
        >
          <Image
            source={imageNames.arrowLeftText}
            resizeMode='contain'
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableHighlight>
        <View style={styles.remoteControlsEnableControls}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={gamepadIsEnabled ? colors.BLUE : colors.WHITE}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setGamepadIsEnabled}
            value={gamepadIsEnabled}
          />
          <Image
            source={imageNames.enableGamepadsText}
            resizeMode='contain'
            style={{
              width: 180,
              height: 25,
              marginBottom: -2.5,
            }}
          />
        </View>
      </View>
      <View style={styles.remoteControlsHeaderContainer}>
        <Image
          source={imageNames.controlsSettingsText}
          resizeMode='contain'
          style={{
            width: 280,
            height: 40,
          }}
        />
      </View>
      <View
        style={{
          ...styles.remoteControlsTextContainer,
          marginBottom: 10,
        }}
      >
        <Text style={styles.remoteControlsText}>
          {gamepadModuleIsAvailable ? 'Gamepad module is available' : 'Could not find the gamepad module'}
        </Text>
      </View>
      <View style={styles.remoteControlsTabNavigationContainer}>
        <View style={styles.remoteControlsTabNavigationItem}>
          <TouchableHighlight
            onPress={(pressEvent) => {
              if (pressEvent.nativeEvent.target === undefined) return;
              setActiveTab(Tabs.profiles);
            }}
            underlayColor='rgba(255,255,255,0.25)'
            style={styles.remoteControlsTabButton}
          >
            <View
              style={{
                ...styles.remoteControlsTabContainer,
                borderBottomWidth: activeTab === Tabs.profiles ? 2.5 : 0,
              }}
            >
              <Image
                source={imageNames.profilesText}
                resizeMode='contain'
                style={{
                  width: 100,
                  height: 28,
                }}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.remoteControlsTabNavigationItem}>
          <TouchableHighlight
            onPress={(pressEvent) => {
              if (pressEvent.nativeEvent.target === undefined) return;
              setActiveTab(Tabs.devices);
            }}
            underlayColor='rgba(255,255,255,0.25)'
            style={styles.remoteControlsTabButton}
          >
            <View
              style={{
                ...styles.remoteControlsTabContainer,
                borderBottomWidth: activeTab === Tabs.devices ? 2.5 : 0,
              }}
            >
              <Image
                source={imageNames.devicesText}
                resizeMode='contain'
                style={{
                  width: 100,
                  height: 28,
                }}
              />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.remoteControlsTabNavigationItem}>
          <TouchableHighlight
            onPress={(pressEvent) => {
              if (pressEvent.nativeEvent.target === undefined) return;
              setActiveTab(Tabs.keys);
            }}
            underlayColor='rgba(255,255,255,0.25)'
            style={styles.remoteControlsTabButton}
          >
            <View
              style={{
                ...styles.remoteControlsTabContainer,
                borderBottomWidth: activeTab === Tabs.keys ? 2.5 : 0,
              }}
            >
              <Image
                source={imageNames.keysText}
                resizeMode='contain'
                style={{
                  width: 100,
                  height: 28,
                }}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
      {activeTab === Tabs.profiles && (
        <ScrollView
          style={styles.remoteControlsScrollContainer}
          contentContainerStyle={styles.remoteControlsScrollContainerContent}
        >
          {displayProfiles.map((profile, idx) => (
            <View
              key={idx}
              style={styles.remoteControlsScrollViewItem}
            >
              <View
                style={styles.remoteControlsEnableControls}
              >
                <TouchableHighlight
                  onPress={(pressEvent) => {
                    if (pressEvent.nativeEvent.target === undefined) return;
                    if (profile.deviceId === gamepad.deviceId) {
                      dispatch(setupGamepad({
                        events: [],
                        deviceId: undefined,
                      }));
                      const newProfiles = [
                        ...displayProfiles.filter((_profile) => profile.deviceId !== _profile.deviceId),
                        {
                          ...displayProfiles.filter((_profile) => profile.deviceId === _profile.deviceId)[0],
                          selected: false,
                        },
                      ];
                      setDisplayProfiles(newProfiles);
                      storeData('profiles', JSON.stringify(newProfiles));
                    } else {
                      dispatch(setupGamepad({
                        events: [],
                        deviceId: profile.deviceId,
                        upKey: profile.upKey,
                        downKey: profile.downKey,
                        leftKey: profile.leftKey,
                        rightKey: profile.rightKey,
                        bombKey: profile.bombKey,
                      }));
                      const newProfiles = [
                        ...displayProfiles.filter((_profile) => profile.deviceId !== _profile.deviceId),
                        {
                          ...displayProfiles.filter((_profile) => profile.deviceId === _profile.deviceId)[0],
                          selected: true,
                        },
                      ];
                      setDisplayProfiles(newProfiles);
                      storeData('profiles', JSON.stringify(newProfiles));
                    }
                  }}
                  underlayColor='rgba(255,255,255,0.25)'
                  style={styles.remoteControlsTabButton}
                >
                  <Icon
                    name={profile.deviceId === gamepad.deviceId ?
                      Icons.play : Icons.timerSandEmpty
                    }
                    size={30}
                    color={profile.deviceId === gamepad.deviceId ?
                        colors.GREEN : colors.WHITE
                    }
                  />
                </TouchableHighlight>
                <Icon
                  name={Icons.connection}
                  size={30}
                  color={
                    displayedEvents.filter(
                      (event) => event.deviceId === profile.deviceId
                    ).length > 0 ? colors.WHITE: colors.DARK_GREY
                  }
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={styles.remoteControlsScrollViewItemText}>
                  {`${profile.profileName}`}
                </Text>
                <Text style={styles.remoteControlsText}>
                  {`Device ID ${profile.deviceId}`}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <Icon
                    name={Icons.arrowUp}
                    size={15}
                    color={profile.upKey !== undefined ? colors.WHITE: colors.DARK_GREY}
                  />
                  <Icon
                    name={Icons.arrowDown}
                    size={15}
                    color={profile.downKey !== undefined ? colors.WHITE: colors.DARK_GREY}
                  />
                  <Icon
                    name={Icons.arrowLeft}
                    size={15}
                    color={profile.leftKey !== undefined ? colors.WHITE: colors.DARK_GREY}
                  />
                  <Icon
                    name={Icons.arrowRight}
                    size={15}
                    color={profile.rightKey !== undefined ? colors.WHITE: colors.DARK_GREY}
                  />
                  <Icon
                    name={Icons.bomb}
                    size={15}
                    color={profile.bombKey!== undefined ? colors.WHITE: colors.DARK_GREY}
                  />
                </View>
              </View>
              <TouchableHighlight
                onPress={(pressEvent) => {
                  if (pressEvent.nativeEvent.target === undefined) return;
                  setDisplayProfiles([
                    ...displayProfiles.filter((_profile) => _profile.deviceId !== profile.deviceId),
                  ]);
                  storeData('profiles', JSON.stringify([
                    ...displayProfiles.filter((_profile) => _profile.deviceId !== profile.deviceId),
                  ]));
                }}
                underlayColor='rgba(255,255,255,0.25)'
                style={styles.remoteControlsTabButton}
              >
                <Icon
                  name={Icons.close}
                  size={30}
                  color={colors.WHITE}
                />
              </TouchableHighlight>
            </View>
          ))}
        </ScrollView>  
      )}
      {Platform.OS === 'android' && activeTab === Tabs.devices && (
        <ScrollView
          style={styles.remoteControlsScrollContainer}
          contentContainerStyle={styles.remoteControlsScrollContainerContent}
        >
          {displayedEvents.filter((event, idx, self) => self.indexOf(event) === idx).map((event, idx) => (
            <View
              key={idx}
              style={styles.remoteControlsScrollViewItem}
            >
              <Text style={styles.remoteControlsScrollViewItemText}>{`Device ID ${event.deviceId}`}</Text>
              {displayProfiles.filter((profile) => event.deviceId === profile.deviceId).length > 0 ? (
                <Text style={styles.remoteControlsScrollViewItemText}>
                  {displayProfiles.filter((profile) => event.deviceId === profile.deviceId)[0].profileName}
                </Text>
              ) : (
                <Button
                  text='Add to a profile'
                  onPress={(pressEvent) => {
                    if (pressEvent.nativeEvent.target === undefined) return;
                    setActiveEvent(event);
                    setShowDeviceToProfileModal(true);
                  }}
                  customButtonStyle={{
                    ...styles.remoteControlsScrollViewItemButton,
                    width: width > 500 ? 300 : 180,
                  }}
                />
              )}
            </View>
          ))}
        </ScrollView>  
      )}
      {Platform.OS === 'android' && activeTab === Tabs.keys && (
        <ScrollView
          style={styles.remoteControlsScrollContainer}
        >
          {displayedEvents.map((event, idx) => (
            <View
              key={idx}
              style={styles.remoteControlsScrollViewItem}
            >
              <Text style={styles.remoteControlsScrollViewItemText}>
                {`Device ID ${event.deviceId}`}
              </Text>
              <Button
                text={`Log KeyCode ${event.keyCode}`}
                onPress={(pressEvent) => {
                  if (pressEvent.nativeEvent.target === undefined) return;
                  setActiveEvent(event);
                  setShowKeyToProfileModal(true);
                }}
                customButtonStyle={{
                  ...styles.remoteControlsScrollViewItemButton,
                  width: width > 500 ? 300 : 190,
                }}
              />
            </View>
          ))}
        </ScrollView>  
      )}
      {showDeviceToProfileModal && activeEvent !== undefined && (
        <View
          style={{
            ...styles.remoteControlDeviceModal,
            width: width,
            height: height,
          }}
        >
          <View
            style={{
              ...styles.remoteControlDeviceModalContainer,
              width: width * 0.9,
            }}
          >
            <TouchableHighlight
              onPress={(pressEvent) => {
                if (pressEvent.nativeEvent.target === undefined) return;
                setShowDeviceToProfileModal(false);
              }}
              underlayColor='rgba(255,255,255,0.25)'
              style={styles.remoteControlsBackIcon}
            >
              <Icon
                name={Icons.close}
                size={30}
                color={colors.WHITE}
              />
            </TouchableHighlight>
            <View style={styles.remoteControlsTextContainer}>
              <Text style={styles.remoteControlsHeaderText}>
                Add device to profile
              </Text>
            </View>
            <View
              style={{
                ...styles.remoteControlsTextContainer,
                marginTop: 10,
              }}
            >
              <Text style={styles.remoteControlsText}>
                {`Device ID ${activeEvent.deviceId}`}
              </Text>
            </View>
            <View
              style={{
                ...styles.remoteControlsTextContainer,
                marginTop: 10,
              }}
            >
              <TextInput
                onChangeText={setActiveProfileName}
                value={activeProfileName}
                style={{
                  ...styles.remoteControlsInput,
                  width: width * 0.8,
                  color: textInputColor,
                }}
                onFocus={() => setTextInputColor(colors.BLACK)}
                onEndEditing={() => setTextInputColor(colors.WHITE)}
              />
            </View>
            <View
              style={{
                ...styles.remoteControlsTextContainer,
                marginTop: 10,
              }}
            >
              <Button
                text='Create'
                onPress={(pressEvent) => {
                  if (pressEvent.nativeEvent.target === undefined) return;
                  const newProfiles = displayProfiles.some((profile) => profile.profileName === activeProfileName) ? [
                    ...displayProfiles.filter((profile) => profile.profileName !== activeProfileName),
                    {
                      profileName: activeProfileName,
                      deviceId: activeEvent.deviceId,
                      selected: false,
                      upKey: displayProfiles.filter((profile) => profile.profileName === activeProfileName)[0].upKey,
                      downKey: displayProfiles.filter((profile) => profile.profileName === activeProfileName)[0].downKey,
                      leftKey: displayProfiles.filter((profile) => profile.profileName === activeProfileName)[0].leftKey,
                      rightKey: displayProfiles.filter((profile) => profile.profileName === activeProfileName)[0].rightKey,
                      bombKey: displayProfiles.filter((profile) => profile.profileName === activeProfileName)[0].bombKey,
                    },
                  ] : [
                    ...displayProfiles,
                    {
                      profileName: activeProfileName,
                      deviceId: activeEvent.deviceId,
                      selected: false,
                    },
                  ];
                  setDisplayProfiles(newProfiles);
                  storeData('profiles', JSON.stringify(newProfiles));
                  setActiveProfileName('');
                  setActiveEvent(undefined);
                  setShowDeviceToProfileModal(false);
                }}
              />
            </View>
          </View>
        </View>
      )}
      {showKeyToProfileModal && activeEvent && (
        <View
          style={{
            ...styles.remoteControlDeviceModal,
            width: width,
            height: width,
          }}
        >
          <View
            style={{
              ...styles.remoteControlDeviceModalContainer,
              width: width * 0.9,
            }}
          >
            <TouchableHighlight
              onPress={(pressEvent) => {
                if (pressEvent.nativeEvent.target === undefined) return;
                setShowKeyToProfileModal(false);
              }}
              underlayColor='rgba(255,255,255,0.25)'
              style={styles.remoteControlsBackIcon}
            >
              <Icon
                name={Icons.close}
                size={30}
                color={colors.WHITE}
              />
            </TouchableHighlight>
            <View style={styles.remoteControlsTextContainer}>
              <Text style={styles.remoteControlsHeaderText}>
                Log Key Event
              </Text>
            </View>
            <View
              style={{
                ...styles.remoteControlsTextContainer,
                marginTop: 10,
              }}
            >
              <Text style={styles.remoteControlsText}>
                {`Profile ${displayProfiles.filter((profile) => profile.deviceId === activeEvent.deviceId)[0].profileName}`}
              </Text>
            </View>
            <View
              style={{
                ...styles.remoteControlsTextContainer,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.remoteControlsText}>
                {`KeyCode ${activeEvent.keyCode}`}
              </Text>
              <Text style={styles.remoteControlsText}>
                {`Device ID ${activeEvent.deviceId}`}
              </Text>
            </View>
            <ScrollView
              style={{
                marginTop: 10,
                width: width * 0.9,
                height: isVertical ? 300 : 160,
              }}
              contentContainerStyle={styles.remoteControlsTextContainer}
            >
              <View
                style={{
                  width: width * 0.75,
                  borderTopWidth: 1,
                  borderTopColor: colors.WHITE,
                  marginTop: 5,
                  paddingVertical: 5,
                }}
              >
                <TouchableHighlight
                  onPress={(pressEvent) => {
                    if (pressEvent.nativeEvent.target === undefined) return;
                    handleKeySettingForProfile(Direction.up);
                  }}
                  underlayColor='rgba(255,255,255,0.25)'
                  style={{
                    borderRadius: 5,
                  }}
                >
                  <View style={styles.remoteControlsArrowInputContainer}>
                    <Icon
                      name={Icons.arrowUp}
                      color={colors.WHITE}
                      size={30}
                    />
                    <Text style={styles.remoteControlsText}>
                      Up
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  width: width * 0.75,
                  borderTopWidth: 1,
                  borderTopColor: colors.WHITE,
                  marginTop: 5,
                  paddingVertical: 5,
                }}
              >
                <TouchableHighlight
                  onPress={(pressEvent) => {
                    if (pressEvent.nativeEvent.target === undefined) return;
                    handleKeySettingForProfile(Direction.down);
                  }}
                  underlayColor='rgba(255,255,255,0.25)'
                  style={{
                    borderRadius: 5,
                  }}
                >
                  <View style={styles.remoteControlsArrowInputContainer}>
                    <Icon
                      name={Icons.arrowDown}
                      color={colors.WHITE}
                      size={30}
                    />
                    <Text style={styles.remoteControlsText}>
                      Down
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  width: width * 0.75,
                  borderTopWidth: 1,
                  borderTopColor: colors.WHITE,
                  marginTop: 5,
                  paddingVertical: 5,
                }}
              >
                <TouchableHighlight
                  onPress={(pressEvent) => {
                    if (pressEvent.nativeEvent.target === undefined) return;
                    handleKeySettingForProfile(Direction.left);
                  }}
                  underlayColor='rgba(255,255,255,0.25)'
                  style={{
                    borderRadius: 5,
                  }}
                >
                  <View style={styles.remoteControlsArrowInputContainer}>
                    <Icon
                      name={Icons.arrowLeft}
                      color={colors.WHITE}
                      size={30}
                    />
                    <Text style={styles.remoteControlsText}>
                      Left
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  width: width * 0.75,
                  borderTopWidth: 1,
                  borderTopColor: colors.WHITE,
                  marginTop: 5,
                  paddingVertical: 5,
                }}
              >
                <TouchableHighlight
                  onPress={(pressEvent) => {
                    if (pressEvent.nativeEvent.target === undefined) return;
                    handleKeySettingForProfile(Direction.right);
                  }}
                  underlayColor='rgba(255,255,255,0.25)'
                  style={{
                    borderRadius: 5,
                  }}
                >
                  <View style={styles.remoteControlsArrowInputContainer}>
                    <Icon
                      name={Icons.arrowRight}
                      color={colors.WHITE}
                      size={30}
                    />
                    <Text style={styles.remoteControlsText}>
                      Right
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  width: width * 0.75,
                  borderTopWidth: 1,
                  borderTopColor: colors.WHITE,
                  marginTop: 5,
                  paddingVertical: 5,
                }}
              >
                <TouchableHighlight
                  onPress={(pressEvent) => {
                    if (pressEvent.nativeEvent.target === undefined) return;
                    handleKeySettingForProfile('bomb');
                  }}
                  underlayColor='rgba(255,255,255,0.25)'
                  style={{
                    borderRadius: 5,
                  }}
                >
                  <View style={styles.remoteControlsArrowInputContainer}>
                    <Icon
                      name={Icons.bomb}
                      color={colors.WHITE}
                      size={30}
                    />
                    <Text style={styles.remoteControlsText}>
                      Bomb
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  remoteControlsContainer: {
    flex: 1,
  },
  remoteControlsNavigationContainer: {
    margin: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  remoteControlsBackIcon: {
    width: 45,
    borderRadius: 200,
    padding: 2.5,
  },
  remoteControlsEnableControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  remoteControlsHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteControlsHeaderText: {
    color: colors.WHITE,
    fontSize: 25,
    fontWeight: '700',
  },
  remoteControlsTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  remoteControlsText: {
    color: colors.WHITE,
    fontSize: 15,
  },
  remoteControlsScrollContainer: {
    paddingHorizontal: 20,
  },
  remoteControlsScrollContainerContent: {
    justifyContent: 'space-between',
  },
  remoteControlsScrollViewItem: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remoteControlsScrollViewItemText: {
    color: colors.WHITE,
    fontSize: 20,
  },
  remoteControlsScrollViewItemButton: {
    padding: 2.5,
  },
  remoteControlsTabNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteControlsTabNavigationItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  remoteControlsTabButton: {
    borderRadius: 5,
  },
  remoteControlsTabContainer: {
    borderBottomColor: colors.METALLIC_GOLD,
    margin: 2.5,
    padding: 2.5,
  },
  remoteControlDeviceModal: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    top: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  remoteControlDeviceModalContainer: {
    backgroundColor: colors.DARK_BLUE,
    borderColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    alignItems: 'flex-end',
  },
  remoteControlsInput: {
    color: colors.WHITE,
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    fontSize: 20,
  },
  remoteControlsArrowInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default RemoteControlsScreen;
