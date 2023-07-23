import {StyleSheet} from 'react-native'
import colors from '../../constants/colors'

const sharedStyles = StyleSheet.create({
  remoteControlsTabButton: {
    borderRadius: 5,
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
  remoteControlsEnableControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
    backgroundColor: 'rgba(50, 9, 127, 0.75)',
    borderBottomLeftRadius: 10,
  },
  remoteControlsScrollViewItemText: {
    color: colors.WHITE,
    fontSize: 20,
  },
  remoteControlsScrollViewItemButton: {
    padding: 2.5,
  },
  remoteControlDeviceModal: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    top: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
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
  remoteControlsIcon: {
    width: 45,
    borderRadius: 200,
    padding: 2.5,
  },
})

export default sharedStyles
