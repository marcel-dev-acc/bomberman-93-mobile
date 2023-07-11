import {
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import sharedStyles from "../SharedStyles";
import { AndroidGamepadProfile } from "../types";
import { Button, GameText } from "../../../components/General";
import { AndroidGamepadEvent } from "../../../native/interface";
import { getIsVertical } from "../../../constants/screen";

type ScrollViewDevicesProps = {
  displayDeviceIds: number[];
  displayedEvents: AndroidGamepadEvent[];
  displayProfiles: AndroidGamepadProfile[];
  setActiveEvent: (event: AndroidGamepadEvent) => void;
  setShowDeviceToProfileModal: (showDeviceToProfileModal: boolean) => void;
};

function ScrollViewDevices({
  displayDeviceIds,
  displayedEvents,
  displayProfiles,
  setActiveEvent,
  setShowDeviceToProfileModal,
}: ScrollViewDevicesProps): JSX.Element {

  const { height, width } = useWindowDimensions();
  const isVertical = getIsVertical(width, height);

  return (
    <ScrollView
      style={sharedStyles.remoteControlsScrollContainer}
      contentContainerStyle={sharedStyles.remoteControlsScrollContainerContent}
    >
      {displayDeviceIds && displayDeviceIds.length > 0 && displayDeviceIds.map((id, idx) => {
        const event = displayedEvents.filter(event => event.deviceId === id)[0];
        return (
          <View
            key={idx}
            style={sharedStyles.remoteControlsScrollViewItem}
          >
            <GameText
              text={`Device ${event.deviceId}`}
              charSize={isVertical ? 12.5 : 20}
            />
            {displayProfiles.filter((profile) => event.deviceId === profile.deviceId).length > 0 ? (
              <Text style={sharedStyles.remoteControlsScrollViewItemText}>
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
                  ...sharedStyles.remoteControlsScrollViewItemButton,
                  width: width > 500 ? 300 : 180,
                }}
              />
            )}
          </View>
        );
      })}
    </ScrollView>  
  );
}

export default ScrollViewDevices;