import { useEffect, useState } from 'react';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar
} from "react-native";
import { Picker } from '@react-native-picker/picker';

import { AntDesign } from '@expo/vector-icons';
import ImagePickerPreview from '../imagePicker/ImagePickerPreview';
import { fields } from '../../requests/config';


function SlotIndex({ route }) {
  const [data, setData] = useState(route.params.data);
  const [length, setLength] = useState(route.params.data[route.params.index - 1].data?.attributes?.customs[fields["length"]]);
  const [width, setWidth] = useState(route.params.data[route.params.index - 1].data?.attributes?.customs[fields["width"]]);
  const [height, setHeight] = useState(route.params.data[route.params.index - 1].data?.attributes?.customs[fields["height"]]);
  const [weight, setWeight] = useState(route.params.data[route.params.index - 1].data?.attributes?.customs[fields["weight"]]);
  const [barcode, setBarcode] = useState(route.params.data[route.params.index - 1].data?.attributes?.customs[fields["barcode"]]);
  const [description, setDescription] = useState(route.params.data[route.params.index - 1].data?.attributes?.description);
  const [selectedValue, setSelectedValue] = useState(route.params.data[route.params.index - 1].data?.attributes?.customs[fields["transport"]]);

  useEffect(() => {
    setData(prev => {
      let slots = JSON.parse(JSON.stringify(prev));
      slots[route.params.index - 1].data.attributes.description = description
      slots[route.params.index - 1].data.attributes.customs[fields["length"]] = length
      slots[route.params.index - 1].data.attributes.customs[fields["width"]] = width
      slots[route.params.index - 1].data.attributes.customs[fields["height"]] = height
      slots[route.params.index - 1].data.attributes.customs[fields["weight"]] = weight
      slots[route.params.index - 1].data.attributes.customs[fields["barcode"]] = barcode
      slots[route.params.index - 1].data.attributes.customs[fields["selectedValue"]] = selectedValue
      return slots
    })
  }, [
    length, width, height, selectedValue, weight, description, barcode
  ])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {/* <Text>{JSON.stringify(route.params.data[route.params.index - 1].attributes?.customs['custom_114632'])}</Text> */}
          <ImagePickerPreview>
            <AntDesign name="picture" size={124} color="black" />
          </ImagePickerPreview>
          <View style={styles.dimensions}>
            <View style={styles.label}>
              <Text style={{ fontSize: 10, opacity: 0.2 }}>Длина:</Text>
              <TextInput
                value={String(length)}
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(e) => setLength(e)}
              />
            </View>
            <View style={styles.label}>
              <Text style={{ fontSize: 10, opacity: 0.2 }}>Ширина:</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(e) => setWidth(e)}
                value={String(width)}
              />
            </View>
            <View style={styles.label}>
              <Text style={{ fontSize: 10, opacity: 0.2 }}>Высота:</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(e) => setHeight(e)}
                value={String(height)}
              />
            </View>
            <View style={styles.label}>
              <Text style={{ fontSize: 10, opacity: 0.2 }}>Вес:</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(e) => setWeight(e)}
                value={String(weight)}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.label}>
              <Text style={{ fontSize: 10, opacity: 0.2 }}>Штрих-код:</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(e) => setBarcode(e)}
                value={String(barcode ?? '')}
              />
            </View>
          </View>
          <View style={{ ...styles.label, alignItems: 'center', justifyContent: 'center', height: 100 }}>
            <Text style={{ fontSize: 10, opacity: 0.2 }}>Вид транспорта:</Text>
            <Picker
              selectedValue={selectedValue}
              style={{ flex: 1 }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="AIRLINE" value="AIRLINE" />
              <Picker.Item label="TRUCK" value="TRUCK" />
              <Picker.Item label="TRAIN" value="TRAIN" />
              <Picker.Item label="SEA" value="SEA" />
            </Picker>
          </View>
          <View style={{ ...styles.label, alignItems: 'flex-start' }}>
            <TextInput
              placeholder="Примечание"
              style={styles.input}
              editable
              multiline
              numberOfLines={4}
              maxLength={20}
              onChangeText={(e) => setDescription(e)}
              value={description}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: '#207aff', alignItems: 'center' }}
              onPress={() => {
                route.params.setData(data);
                route.params.navigation.goBack()
              }}
            >
              <Text style={{ padding: 20, color: '#fff' }}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View >
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  card: {
    flex: 1,
    gap: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  dimensions: {
    flexDirection: 'row',
    flex: 1,
    // padding: 10
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 10,
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  input: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
    flex: 1,
  },
})

export default SlotIndex;