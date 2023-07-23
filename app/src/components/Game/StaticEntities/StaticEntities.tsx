import React from 'react'
import {StyleSheet, View} from 'react-native'

import {WallComp, PillarComp} from '../../GameEntities'
import {ComponentType} from '../../../constants/types'
import {dimensions} from '../../../constants/screen'

type StaticEntitiesProps = {
  entities: any
}

function Loop({entities}: StaticEntitiesProps): JSX.Element {
  return (
    <View style={styles.staticEntitiesContainer}>
      {Object.keys(entities).length > 0 &&
        Object.keys(entities).map((key, idx) => {
          const entity = entities[key]
          const entityName = entity.name as ComponentType
          switch (entityName) {
            case ComponentType.wall:
              return <WallComp key={idx} left={entity.left} top={entity.top} />
            case ComponentType.pillar:
              return (
                <PillarComp key={idx} top={entity.top} left={entity.left} />
              )
            default:
              return null
          }
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  staticEntitiesContainer: {
    position: 'absolute',
    top: 0,
    width: dimensions.width,
    height: dimensions.height,
    marginTop: -1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loop
