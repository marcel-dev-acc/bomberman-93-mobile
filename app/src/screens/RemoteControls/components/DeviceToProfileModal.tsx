import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from "react-native";

import sharedStyles from "../SharedStyles";
import { Button, Icon, Icons } from "../../../components/General";
import { AndroidGamepadEvent } from "../../../native/interface";
import colors from "../../../constants/colors";
import { AndroidGamepadProfile } from "../types";
import { StorageKeys, storeData } from "../../../utils/localStorage";

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

  const { height, width } = useWindowDimensions();

  const [textInputColor, setTextInputColor] = useState(colors.BLACK);

  return (
    <View
      style={{
        ...sharedStyles.remoteControlDeviceModal,
        width: width,
        height: height,
      }}
    >
      <View
        style={{
          ...sharedStyles.remoteControlDeviceModalContainer,
          width: width * 0.9,
        }}
      >
        <TouchableHighlight
          onPress={(pressEvent) => {
            if (pressEvent.nativeEvent.target === undefined) return;
            setShowDeviceToProfileModal(false);
          }}
          underlayColor='rgba(255,255,255,0.25)'
          style={sharedStyles.remoteControlsIcon}
        >
          <Icon
            name={Icons.close}
            size={30}
            color={colors.WHITE}
          />
        </TouchableHighlight>
        <View style={sharedStyles.remoteControlsTextContainer}>
          <Text style={sharedStyles.remoteControlsHeaderText}>
            Add device to profile
          </Text>
        </View>
        <View
          style={{
            ...sharedStyles.remoteControlsTextContainer,
            marginTop: 10,
          }}
        >
          <Text style={sharedStyles.remoteControlsText}>
            {`Device ID ${activeEvent.deviceId}`}
          </Text>
        </View>
        <View
          style={{
            ...sharedStyles.remoteControlsTextContainer,
            marginTop: 10,
          }}
        >
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
              storeData(StorageKeys.profiles, JSON.stringify(newProfiles));
              setActiveProfileName('');
              setActiveEvent(undefined);
              setShowDeviceToProfileModal(false);
            }}
          />
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