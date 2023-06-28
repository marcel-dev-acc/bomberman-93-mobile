import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import textMapper from './map';

type GameTextProps = {
  text: string;
  charSize: number;
};

function GameText({
  text,
  charSize,
}: GameTextProps): JSX.Element {
  const textMap = textMapper(text);

  return (
    <View style={styles.gameTextContainer}>
      {textMap.length > 0 && textMap.map((textObj, idx) => textObj.char !== ' ' ?
        <Image
          key={idx}
          source={textObj.image}
          resizeMode='contain'
          style={{
            width: textObj.isCapital ? charSize : charSize,
            height: textObj.isCapital ? charSize * 1.5 : charSize,
            marginBottom: textObj.isCapital ? 6 : 0,
          }}
        /> :
        <View key={idx} style={{ width: 20 }}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gameTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default GameText;
