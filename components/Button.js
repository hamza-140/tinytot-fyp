import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default function Button({
  onPress,
  title,
  buttonStyle,
  textStyle,
  isDisabled,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        isDisabled ? styles.disabledButton : null,
      ]}
      onPress={onPress}
      disabled={isDisabled}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  isDisabled: PropTypes.bool, // New prop for disabling the button
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#004d4d',
    paddingVertical: 12,
    marginBottom: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray', // Change the background color when disabled
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PFSquareSansPro-Bold-subset',
  },
});
