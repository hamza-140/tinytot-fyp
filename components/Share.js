import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppLogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.star}>✦</Text>
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>
            <Text style={{ color: '#FF4500' }}>H</Text>
            <Text style={{ color: '#FFA500' }}>a</Text>
            <Text style={{ color: '#FFD700' }}>b</Text>
            <Text style={{ color: '#00FF00' }}>i</Text>
            <Text style={{ color: '#00BFFF' }}>t</Text>
            <Text style={{ color: '#0000FF' }}>z</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomRightRadius: 12,
    // borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  appNameContainer: {
    backgroundColor: '#FFF',
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  star: {
    fontSize: 24,
    color: '#FFD700',
    marginRight: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AppLogo;