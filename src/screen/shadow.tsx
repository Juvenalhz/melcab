import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export const Shadow = () => {
    return (
        <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>
            React Native Box Shadow (Shadow Props)
          </Text>
        </View>
        <Text>
          Using the elevation style prop to apply box-shadow for iOS devices
        </Text>
      </View>
    )
}

// remember to import StyleSheet from react-native
const styles = StyleSheet.create({
    heading: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 13,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      paddingVertical: 45,
      paddingHorizontal: 25,
      width: '100%',
      marginVertical: 10,
    },
    shadowProp: {
        elevation: 20,
        shadowColor: '#52006A',
    },
  });