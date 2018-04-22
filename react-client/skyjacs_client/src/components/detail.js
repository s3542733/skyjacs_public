import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';

/* eslint-disable global-require */
/* eslint-disable no-console  */

const MIN_HEIGHT = 0;
const MAX_HEIGHT = 250;

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
});

export default class DetailScreen extends React.Component {
  render() {
    // const { params } = this.props.navigation.state;
    // const itemBrand = params ? params.item_brand : null;
    // const itemType = params ? params.item_type : null;
    // const itemModel = params ? params.item_model : null;
    // const itemGender = params ? params.item_gender : null;
    // const itemCondition = params ? params.item_condition : null;
    // const itemSize = params ? params.item_size : null;
    // const itemColour = params ? params.item_colour : null;
    // const itemMaterial = params ? params.item_material : null;
    // const itemMatching = params ? params.item_matching : null;

    return (
      <View style={{ flex: 1 }}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          fadeOutForeground
          headerImage={require('../images/shoe_images/adidas_ultra_boost.jpeg')}
          style={styles.image}
        >
          <View style={styles.section}>
            <Text style={styles.title}>
              <Text style={styles.name}>Adidas Ultra Boost</Text>, (2018)
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>Some dank comments</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seller</Text>
            <Text style={styles.sectionContent}>Some dank info</Text>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}
