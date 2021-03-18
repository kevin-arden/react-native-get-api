/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Button, Text, FlatList} from 'react-native';
import axios from 'axios';
import _ from 'underscore';
import {Picker} from '@react-native-picker/picker';

const DropdownKodepos = (props) => {
  const [provinsi, setProvinsi] = useState([]);

  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);

  const [kelurahan, setKelurahan] = useState([]);
  const [kodepos, setKodepos] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState();
  const [selectedKota, setSelectedKota] = useState();
  const [selectedKecamatan, setSelectedKecamatan] = useState();
  const [selectedKelurahan, setSelectedKelurahan] = useState();

  const getProvinsi = async () => {
    try {
      const response = await axios.get('https://kodepos-2d475.firebaseio.com/list_propinsi.json?print=pretty');

      let result = [];

      for (const [key  ,value] of Object.entries(response.data))
      {result.push({id: key, label: value});}

      setProvinsi(result);


    } catch (err) {
      console.log(err);
    }
  };

  const getKota = async (itemValue) => {
    try {
      const response = await axios.get(`https://kodepos-2d475.firebaseio.com/list_kotakab/${itemValue}.json?print=pretty`);

      let resultKota = [];

      for (const [key  ,value] of Object.entries(response.data))
      {resultKota.push({id: key, label: value});}

      setKota(resultKota);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getKota();
  }, [selectedProvinsi]);

  const getKecamatan = async (itemValue) => {
    try {
      const response = await axios.get(`https://kodepos-2d475.firebaseio.com/kota_kab/${itemValue}.json?print=pretty`);

      let resultKecamatan = [];
      let flags = {};


      for (let key in response.data)
      {
        if (!flags[response.data[key].kecamatan]){
          flags[response.data[key].kecamatan] = true;
          resultKecamatan.push({id: key, label: response.data[key].kecamatan});
        }
      }
      setKecamatan(resultKecamatan);


    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getKecamatan();

  }, [selectedKota]);


  const getKelurahan = async (itemValue) => {
    try {
      const response = await axios.get(`https://kodepos-2d475.firebaseio.com/kota_kab/${selectedKota}.json?print=pretty`);

      let resultKelurahan = [];


      console.log(response.data);
      for (let key in response.data)
      {
        if (itemValue === response.data[key].kecamatan){
          resultKelurahan.push({id: key, label: response.data[key].kelurahan});

        }
        console.log(response.data[key].kecamatan);
        console.log(selectedKecamatan);
      }


      setKelurahan(resultKelurahan);
      console.log(resultKelurahan);

    } catch (err) {
      console.log(err);
    }
  };

  const getKodepos = async (itemValue) => {
    try {
      const response = await axios.get(`https://kodepos-2d475.firebaseio.com/kota_kab/${selectedKota}.json?print=pretty`);


      let resultKodepos = '';


      console.log(itemValue);
      for (let key in response.data)
      {
        if (response.data[itemValue].kelurahan === response.data[key].kelurahan){
          resultKodepos = response.data[key].kodepos;

        }

      }


      setKodepos(resultKodepos);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getProvinsi();

  }, []);


  return (
    <View style={{flex: 1, justifyContent: 'space-between' }}>
      
      <Picker
        selectedValue={selectedProvinsi}
        onValueChange={(itemValue, itemIndex) =>
          {getKota(itemValue); setSelectedProvinsi(itemValue);}
        }>
        <Picker.Item label="Pilih Provinsi" value="Pilih Provinsi" />
        {
          provinsi.map(prov => (
            <Picker.Item key={prov.id} label={prov.label} value={prov.id}/>
          ))
        }
      </Picker>

      <Picker
        selectedValue={selectedKota}
        onValueChange={async (itemValue, itemIndex) =>
          {getKecamatan(itemValue); setSelectedKota(itemValue);}
        }>
        <Picker.Item label="Pilih Kota" value="Pilih Kota" />
        {
          kota.map(kot => (
            <Picker.Item key={kot.id} label={kot.label} value={kot.id}/>
          ))
        }
      </Picker>

      <Picker
        selectedValue={selectedKecamatan}
        onValueChange={(itemValue, itemIndex) =>
           {getKelurahan(itemValue); setSelectedKecamatan(itemValue);}
        }>
        <Picker.Item label="Pilih Kecamatan" value="Pilih Kecamatan" />
        {
          kecamatan.map(kec => (
            <Picker.Item key={kec.id} label={kec.label} value={kec.label}/>
          ))
        }
      </Picker>

      <Picker
        selectedValue={selectedKelurahan}
        onValueChange={(itemValue, itemIndex) =>
          {getKodepos(itemValue); setSelectedKelurahan(itemValue);}
        }>
        <Picker.Item label="Pilih Kelurahan" value="Pilih Kelurahan" />
        {
          kelurahan.map(kel => (
            <Picker.Item key={kel.id} label={kel.label} value={kel.id}/>
          ))
        }
      </Picker>

      <Text style={{paddingLeft: 10}}>Kode Pos: {kodepos}</Text>


      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button title="previous" onPress={() => props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Camera',
              },
            ],
          })} />
        <Button title="next" onPress={() => props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          })}/>
      </View>

    </View>
  );
};

export default DropdownKodepos;
