/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import ListItem from '../components/ListItem';
import axios from 'axios';

const Home = (props) => {
  const [items, setItems] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ]);

  const posts = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                params: {
                _limit: 10,
                },
            });
            setItems(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };


  useEffect(() => {
    posts();
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => <ListItem item={item} />}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button title="previous" onPress={() => props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'DropdownKodepos',
              },
            ],
          })}/>
        <Button title="next" onPress={() => props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Camera',
              },
            ],
          })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
