import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from 'react-native';

import sharedStyles from '../SharedStyles';
import {Icon, Icons} from '../../../components/General';
import {AndroidGamepadEvent} from '../../../native/interface';
import colors from '../../../constants/colors';
import {AndroidGamepadProfile} from '../types';
import {getIsVertical} from '../../../constants/screen';
import {Direction} from '../../../types/serverTypes';

type KeyToProfileModalProps = {
  setShowKeyToProfileModal: (showKeyToProfileModal: boolean) => void;
  displayProfiles: AndroidGamepadProfile[];
  activeEvent: AndroidGamepadEvent;
  handleKeySettingForProfile: (directionOrBomb: Direction | 'bomb') => void;
};

function KeyToProfileModal({
  setShowKeyToProfileModal,
  displayProfiles,
  activeEvent,
  handleKeySettingForProfile,
}: KeyToProfileModalProps): JSX.Element {
  const {height, width} = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  return (
    <View
      style={{
        ...sharedStyles.remoteControlDeviceModal,
        width: width,
        height: width,
      }}>
      <View
        style={{
          ...sharedStyles.remoteControlDeviceModalContainer,
          width: width * 0.9,
        }}>
        <TouchableHighlight
          onPress={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) {
              return;
            }
            setShowKeyToProfileModal(false);
          }}
          underlayColor="rgba(255,255,255,0.25)"
          style={sharedStyles.remoteControlsIcon}>
          <Icon name={Icons.close} size={30} color={colors.WHITE} />
        </TouchableHighlight>
        <View style={sharedStyles.remoteControlsTextContainer}>
          <Text style={sharedStyles.remoteControlsHeaderText}>
            Log Key Event
          </Text>
        </View>
        <View
          style={{
            ...sharedStyles.remoteControlsTextContainer,
            marginTop: 10,
          }}>
          <Text style={sharedStyles.remoteControlsText}>
            {`Profile ${
              displayProfiles.filter(
                profile => profile.deviceId === activeEvent.deviceId,
              )[0].profileName
            }`}
          </Text>
        </View>
        <View
          style={{
            ...sharedStyles.remoteControlsTextContainer,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 20,
          }}>
          <Text style={sharedStyles.remoteControlsText}>
            {`KeyCode ${activeEvent.keyCode}`}
          </Text>
          <Text style={sharedStyles.remoteControlsText}>
            {`Device ID ${activeEvent.deviceId}`}
          </Text>
        </View>
        <ScrollView
          style={{
            marginTop: 10,
            width: width * 0.9,
            height: isVertical ? 300 : 160,
          }}
          contentContainerStyle={sharedStyles.remoteControlsTextContainer}>
          <View
            style={{
              width: width * 0.75,
              borderTopWidth: 1,
              borderTopColor: colors.WHITE,
              marginTop: 5,
              paddingVertical: 5,
            }}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return;
                }
                handleKeySettingForProfile(Direction.up);
              }}
              underlayColor="rgba(255,255,255,0.25)"
              style={{
                borderRadius: 5,
              }}>
              <View style={styles.remoteControlsArrowInputContainer}>
                <Icon name={Icons.arrowUp} color={colors.WHITE} size={30} />
                <Text style={sharedStyles.remoteControlsText}>Up</Text>
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
            }}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return;
                }
                handleKeySettingForProfile(Direction.down);
              }}
              underlayColor="rgba(255,255,255,0.25)"
              style={{
                borderRadius: 5,
              }}>
              <View style={styles.remoteControlsArrowInputContainer}>
                <Icon name={Icons.arrowDown} color={colors.WHITE} size={30} />
                <Text style={sharedStyles.remoteControlsText}>Down</Text>
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
            }}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return;
                }
                handleKeySettingForProfile(Direction.left);
              }}
              underlayColor="rgba(255,255,255,0.25)"
              style={{
                borderRadius: 5,
              }}>
              <View style={styles.remoteControlsArrowInputContainer}>
                <Icon name={Icons.arrowLeft} color={colors.WHITE} size={30} />
                <Text style={sharedStyles.remoteControlsText}>Left</Text>
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
            }}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return;
                }
                handleKeySettingForProfile(Direction.right);
              }}
              underlayColor="rgba(255,255,255,0.25)"
              style={{
                borderRadius: 5,
              }}>
              <View style={styles.remoteControlsArrowInputContainer}>
                <Icon name={Icons.arrowRight} color={colors.WHITE} size={30} />
                <Text style={sharedStyles.remoteControlsText}>Right</Text>
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
            }}>
            <TouchableHighlight
              onPress={pressEvent => {
                if (pressEvent.nativeEvent.target === undefined) {
                  return;
                }
                handleKeySettingForProfile('bomb');
              }}
              underlayColor="rgba(255,255,255,0.25)"
              style={{
                borderRadius: 5,
              }}>
              <View style={styles.remoteControlsArrowInputContainer}>
                <Icon name={Icons.bomb} color={colors.WHITE} size={30} />
                <Text style={sharedStyles.remoteControlsText}>Bomb</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  remoteControlsArrowInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default KeyToProfileModal;
