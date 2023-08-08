import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerPreview({ children }) {
  const [images, setImages] = useState(null);

  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: false,
      // aspect: [4, 3],
      // quality: 5,
      selectionLimit: 5,
      allowsMultipleSelection: true
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets.map((e) => e.uri));
    }
  };

  return (
    <TouchableOpacity onPress={pickImages} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!!images && (<View>
        {images?.map((image, index) => <Image key={index} source={{ uri: image }} style={{ width: 200, height: 200 }} />)}
      </View>
      )}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  images: {
    flex: 1,
    justifyContent: 'space-between',
    gap: '10px'
  }
})