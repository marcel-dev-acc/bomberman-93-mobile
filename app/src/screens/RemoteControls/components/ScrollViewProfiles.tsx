import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import sharedStyles from '../SharedStyles';
import {AndroidGamepadProfile} from '../types';
import {Icon, Icons} from '../../../components/General';
import colors from '../../../constants/colors';
import {AndroidGamepadEvent} from '../../../native/interface';
import {StorageKeys, storeData} from '../../../utils/localStorage';

type ScrollViewProfilesProps = {
  displayedEvents: AndroidGamepadEvent[];
  displayProfiles: AndroidGamepadProfile[];
  setDisplayProfiles: (displayProfiles: AndroidGamepadProfile[]) => void;
  activeGamepadProfileRef: React.MutableRefObject<
    AndroidGamepadProfile | undefined
  >;
};

function ScrollViewProfiles({
  displayedEvents,
  displayProfiles,
  setDisplayProfiles,
  activeGamepadProfileRef,
}: ScrollViewProfilesProps): JSX.Element {
  return (
    <ScrollView
      style={sharedStyles.remoteControlsScrollContainer}
      contentContainerStyle={sharedStyles.remoteControlsScrollContainerContent}>
      {displayProfiles.map((profile, idx) => (
        <View key={idx} style={sharedStyles.remoteControlsScrollViewItem}>
          <View style={sharedStyles.remoteControlsEnableControls}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return;
                }
                if (
                  profile.deviceId === activeGamepadProfileRef.current?.deviceId
                ) {
                  activeGamepadProfileRef.current = undefined;
                  const newProfiles = [
                    ...displayProfiles.filter(
                      _profile => profile.deviceId !== _profile.deviceId,
                    ),
                    {
                      ...displayProfiles.filter(
                        _profile => profile.deviceId === _profile.deviceId,
                      )[0],
                      selected: false,
                    },
                  ];
                  setDisplayProfiles(newProfiles);
                  storeData(StorageKeys.profiles, JSON.stringify(newProfiles));
                } else {
                  activeGamepadProfileRef.current = {
                    profileName: profile.profileName,
                    selected: true,
                    deviceId: profile.deviceId,
                    upKey: profile.upKey,
                    downKey: profile.downKey,
                    leftKey: profile.leftKey,
                    rightKey: profile.rightKey,
                    bombKey: profile.bombKey,
                  };
                  const newProfiles = [
                    ...displayProfiles.filter(
                      _profile => profile.deviceId !== _profile.deviceId,
                    ),
                    {
                      ...displayProfiles.filter(
                        _profile => profile.deviceId === _profile.deviceId,
                      )[0],
                      selected: true,
                    },
                  ];
                  setDisplayProfiles(newProfiles);
                  storeData(StorageKeys.profiles, JSON.stringify(newProfiles));
                }
              }}
              underlayColor="rgba(255,255,255,0.25)"
              style={sharedStyles.remoteControlsTabButton}>
              <Icon
                name={
                  profile.deviceId === activeGamepadProfileRef.current?.deviceId
                    ? Icons.play
                    : Icons.timerSandEmpty
                }
                size={30}
                color={
                  profile.deviceId === activeGamepadProfileRef.current?.deviceId
                    ? colors.GREEN
                    : colors.WHITE
                }
              />
            </TouchableHighlight>
            <Icon
              name={Icons.connection}
              size={30}
              color={
                displayedEvents.filter(
                  event => event.deviceId === profile.deviceId,
                ).length > 0
                  ? colors.WHITE
                  : colors.DARK_GREY
              }
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={sharedStyles.remoteControlsScrollViewItemText}>
              {`${profile.profileName}`}
            </Text>
            <Text style={sharedStyles.remoteControlsText}>
              {`Device ID ${profile.deviceId}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                name={Icons.arrowUp}
                size={15}
                color={
                  profile.upKey !== undefined ? colors.WHITE : colors.DARK_GREY
                }
              />
              <Icon
                name={Icons.arrowDown}
                size={15}
                color={
                  profile.downKey !== undefined
                    ? colors.WHITE
                    : colors.DARK_GREY
                }
              />
              <Icon
                name={Icons.arrowLeft}
                size={15}
                color={
                  profile.leftKey !== undefined
                    ? colors.WHITE
                    : colors.DARK_GREY
                }
              />
              <Icon
                name={Icons.arrowRight}
                size={15}
                color={
                  profile.rightKey !== undefined
                    ? colors.WHITE
                    : colors.DARK_GREY
                }
              />
              <Icon
                name={Icons.bomb}
                size={15}
                color={
                  profile.bombKey !== undefined
                    ? colors.WHITE
                    : colors.DARK_GREY
                }
              />
            </View>
          </View>
          <TouchableHighlight
            onPress={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) {
                return;
              }
              setDisplayProfiles([
                ...displayProfiles.filter(
                  _profile => _profile.deviceId !== profile.deviceId,
                ),
              ]);
              storeData(
                StorageKeys.profiles,
                JSON.stringify([
                  ...displayProfiles.filter(
                    _profile => _profile.deviceId !== profile.deviceId,
                  ),
                ]),
              );
            }}
            underlayColor="rgba(255,255,255,0.25)"
            style={sharedStyles.remoteControlsTabButton}>
            <Icon name={Icons.close} size={30} color={colors.WHITE} />
          </TouchableHighlight>
        </View>
      ))}
    </ScrollView>
  );
}

export default ScrollViewProfiles;
