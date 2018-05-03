import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: 200,
  },
});

const SelectedPhoto = (props) => {
  const { uri } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
      />
    </View>
  );
};

export default SelectedPhoto;
