import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import sharedStyles from '../SharedStyles';
import imageNames from '../../../constants/imageNames';
import colors from '../../../constants/colors';
import {AndroidGamepadEvent} from '../../../native/interface';

export enum Tabs {
  profiles = 'profiles',
  devices = 'devices',
  keys = 'keys',
}

type TabNavigationProps = {
  activeTab: Tabs;
  setActiveTab: (activeTab: Tabs) => void;
  setDisplayDevicesIds: (setDisplayDevicesIds: number[]) => void;
  setDisplayedEvents: (displayedEvents: AndroidGamepadEvent[]) => void;
};

function TabNavigation({
  activeTab,
  setActiveTab,
  setDisplayDevicesIds,
  setDisplayedEvents,
}: TabNavigationProps): JSX.Element {
  return (
    <View style={styles.remoteControlsTabNavigationContainer}>
      <View style={styles.remoteControlsTabNavigationItem}>
        <TouchableHighlight
          onPress={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) {
              return;
            }
            setActiveTab(Tabs.profiles);
          }}
          underlayColor="rgba(255,255,255,0.25)"
          style={sharedStyles.remoteControlsTabButton}>
          <View
            style={{
              ...styles.remoteControlsTabContainer,
              borderBottomWidth: activeTab === Tabs.profiles ? 2.5 : 0,
            }}>
            <Image
              source={imageNames.profilesText}
              resizeMode="contain"
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
          onPress={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) {
              return;
            }
            setDisplayDevicesIds([]);
            setDisplayedEvents([]);
            setActiveTab(Tabs.devices);
          }}
          underlayColor="rgba(255,255,255,0.25)"
          style={sharedStyles.remoteControlsTabButton}>
          <View
            style={{
              ...styles.remoteControlsTabContainer,
              borderBottomWidth: activeTab === Tabs.devices ? 2.5 : 0,
            }}>
            <Image
              source={imageNames.devicesText}
              resizeMode="contain"
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
          onPress={pressEvent => {
            if (pressEvent.nativeEvent.target === undefined) {
              return;
            }
            setDisplayDevicesIds([]);
            setDisplayedEvents([]);
            setActiveTab(Tabs.keys);
          }}
          underlayColor="rgba(255,255,255,0.25)"
          style={sharedStyles.remoteControlsTabButton}>
          <View
            style={{
              ...styles.remoteControlsTabContainer,
              borderBottomWidth: activeTab === Tabs.keys ? 2.5 : 0,
            }}>
            <Image
              source={imageNames.keysText}
              resizeMode="contain"
              style={{
                width: 100,
                height: 28,
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  remoteControlsTabContainer: {
    borderBottomColor: colors.METALLIC_GOLD,
    margin: 2.5,
    padding: 2.5,
  },
});

export default TabNavigation;
