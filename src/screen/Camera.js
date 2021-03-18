/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Button, Text} from 'react-native';
import GoToCamera from '../components/GoToCamera';

const Camera = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'space-between' }}>
      <View style={{flex: 1, justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
      <Button style={{width: 20}} title="Open Camera" onPress={() => props.navigation.navigate('GoToCamera')} /></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button title="previous" onPress={() => props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          })} />
        <Button title="next" onPress={() => props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'DropdownKodepos',
              },
            ],
          })}/>
      </View>

    </View>
  );
};

export default Camera;
