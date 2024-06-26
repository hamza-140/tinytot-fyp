import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const appleImage = require('./assets/apple.png'); // Replace with your apple image path
const basketImage = require('./assets/basket.png'); // Replace with your basket image path

const DraggableItem = ({item, pan, panResponder, inBasket}) => (
  <Animated.View
    {...(inBasket ? {} : panResponder.panHandlers)}
    style={[styles.item, inBasket ? styles.hidden : pan.getLayout()]}>
    <Image source={appleImage} style={styles.itemImage} />
  </Animated.View>
);

export default function App() {
  const [count, setCount] = useState(0);
  const [pans, setPans] = useState(items.map(() => new Animated.ValueXY()));
  const [inBasket, setInBasket] = useState(items.map(() => false));
  const [showModal, setShowModal] = useState(false);

  const resetGame = () => {
    setCount(0);
    setShowModal(false);
    setPans(items.map(() => new Animated.ValueXY()));
    setInBasket(items.map(() => false));
  };

  const createPanResponder = index => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dx: pans[index].x, dy: pans[index].y}],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.moveX > 200) {
          // Adjust this value based on your basket position
          setCount(prevCount => prevCount + 1);
          let newInBasket = [...inBasket];
          newInBasket[index] = true;
          setInBasket(newInBasket);
          if (newInBasket.every(item => item === true)) {
            setShowModal(true);
          }
        } else {
          Animated.spring(pans[index], {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    });
  };

  const panResponders = pans.map((_, index) => createPanResponder(index));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drag the apples to the basket!</Text>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Icon name="refresh" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.leftSide}>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            pan={pans[index]}
            panResponder={panResponders[index]}
            inBasket={inBasket[index]}
          />
        ))}
      </View>
      <View style={styles.rightSide}>
        <View style={styles.basket}>
          {items.map(
            (item, index) =>
              inBasket[index] && (
                <Image
                  key={item.id}
                  source={appleImage}
                  style={styles.itemInBasket}
                />
              ),
          )}
          <Image source={basketImage} style={styles.basketImage} />
        </View>
        <Text style={styles.basketText}>Basket: {count}</Text>
      </View>
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>1 + 1 + 1 = 3</Text>
            <TouchableOpacity style={styles.closeButton} onPress={resetGame}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    position: 'absolute',
    top: 50,
    textAlign: 'center',
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 15,

    position: 'absolute',
    top: 50,
    right: 20,
  },
  leftSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 100,
    height: 100,
    // margin: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemInBasket: {
    width: 50,
    height: 50,
    // margin: 5,
  },
  basket: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'relative',
  },
  basketImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  basketText: {
    fontSize: 18,
    position: 'absolute',
    // top: 10,
    bottom: 2,
    color: '#000',
  },
  hidden: {
    display: 'none',
  },
});

const items = [
  {id: 1, type: 'apple'},
  {id: 2, type: 'apple'},
  {id: 3, type: 'apple'},
];
