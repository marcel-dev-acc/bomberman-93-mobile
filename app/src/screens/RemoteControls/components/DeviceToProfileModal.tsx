import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';

import sharedStyles from '../SharedStyles';
import {Button, GameText, Icon, Icons} from '../../../components/General';
import {AndroidGamepadEvent} from '../../../native/interface';
import colors from '../../../constants/colors';
import {AndroidGamepadProfile} from '../types';
import {StorageKeys, storeData} from '../../../utils/localStorage';

type DeviceToProfileModalProps = {
  setShowDeviceToProfileModal: (showDeviceToProfileModal: boolean) => void;
  activeEvent: AndroidGamepadEvent;
  setActiveEvent: (event: AndroidGamepadEvent | undefined) => void;
  activeProfileName: string;
  setActiveProfileName: (activeProfileName: string) => void;
  displayProfiles: AndroidGamepadProfile[];
  setDisplayProfiles: (displayProfiles: AndroidGamepadProfile[]) => void;
};

function DeviceToProfileModal({
  setShowDeviceToProfileModal,
  activeEvent,
  setActiveEvent,
  activeProfileName,
  setActiveProfileName,
  displayProfiles,
  setDisplayProfiles,
}: DeviceToProfileModalProps): JSX.Element {
  const {height, width} = useWindowDimensions();

  const [textInputColor, setTextInputColor] = useState(colors.BLACK);

  return (
    <View
      style={{
        ...sharedStyles.remoteControlDeviceModal,
        width: width,
        height: height,
      }}>
      <View
        style={{
          ...sharedStyles.remoteControlDeviceModalContainer,
          width: width * 0.9,
        }}>
        <TouchableHighlight
          onPress={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) return;
            setShowDeviceToProfileModal(false);
          }}
          underlayColor="rgba(255,255,255,0.25)"
          style={sharedStyles.remoteControlsIcon}>
          <Icon name={Icons.close} size={30} color={colors.WHITE} />
        </TouchableHighlight>
        <View style={sharedStyles.remoteControlsTextContainer}>
          <GameText text="Add device to profile" charSize={25} />
        </View>
        <View
          style={{
            ...sharedStyles.remoteControlsTextContainer,
            marginTop: 10,
          }}>
          <GameText text={`Device ID ${activeEvent.deviceId}`} charSize={15} />
        </View>
        <View
          style={{
            ...sharedStyles.remoteControlsTextContainer,
            marginTop: 10,
          }}>
          <TextInput
            onChangeText={setActiveProfileName}
            value={activeProfileName}
            style={{
              ...styles.deviceToProfileModalInput,
              width: width * 0.8,
              color: textInputColor,
            }}
            onFocus={() => setTextInputColor(colors.BLACK)}
            onEndEditing={() => setTextInputColor(colors.WHITE)}
          />
        </View>
        <View
          style={{
            ...sharedStyles.remoteControlsTextContainer,
            marginTop: 10,
          }}>
          <Button
            text="Create"
            onPress={pressEvent => {
              if (pressEvent.nativeEvent.target === undefined) return;
              const newProfiles = displayProfiles.some(
                profile => profile.profileName === activeProfileName,
              )
                ? [
                    ...displayProfiles.filter(
                      profile => profile.profileName !== activeProfileName,
                    ),
                    {
                      profileName: activeProfileName,
                      deviceId: activeEvent.deviceId,
                      selected: false,
                      upKey: displayProfiles.filter(
                        profile => profile.profileName === activeProfileName,
                      )[0].upKey,
                      downKey: displayProfiles.filter(
                        profile => profile.profileName === activeProfileName,
                      )[0].downKey,
                      leftKey: displayProfiles.filter(
                        profile => profile.profileName === activeProfileName,
                      )[0].leftKey,
                      rightKey: displayProfiles.filter(
                        profile => profile.profileName === activeProfileName,
                      )[0].rightKey,
                      bombKey: displayProfiles.filter(
                        profile => profile.profileName === activeProfileName,
                      )[0].bombKey,
                    },
                  ]
                : [
                    ...displayProfiles,
                    {
                      profileName: activeProfileName,
                      deviceId: activeEvent.deviceId,
                      selected: false,
                    },
                  ];
              setDisplayProfiles(newProfiles);
              storeData(StorageKeys.profiles, JSON.stringify(newProfiles));
              setActiveProfileName('');
              setActiveEvent(undefined);
              setShowDeviceToProfileModal(false);
            }}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.875,
          }}>
          <GameText text="OR" charSize={20} />
          <ScrollView>
            {displayProfiles.length > 0 &&
              displayProfiles.map((profile, idx) => {
                return (
                  <Button
                    key={idx}
                    text={profile.profileName}
                    onPress={pressEvent => {
                      if (pressEvent.nativeEvent.target === undefined) return;
                      const newProfiles = [
                        ...displayProfiles.filter(
                          profile => profile.profileName !== activeProfileName,
                        ),
                        {
                          profileName: profile.profileName,
                          deviceId: activeEvent.deviceId,
                          selected: false,
                          upKey: profile.upKey,
                          downKey: profile.downKey,
                          leftKey: profile.leftKey,
                          rightKey: profile.rightKey,
                          bombKey: profile.bombKey,
                        },
                      ];
                      setDisplayProfiles(newProfiles);
                      storeData(
                        StorageKeys.profiles,
                        JSON.stringify(newProfiles),
                      );
                      setActiveProfileName('');
                      setActiveEvent(undefined);
                      setShowDeviceToProfileModal(false);
                    }}
                  />
                );
              })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deviceToProfileModalInput: {
    color: colors.WHITE,
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    fontSize: 20,
  },
});

export default DeviceToProfileModal;
