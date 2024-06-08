import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Workbook from './Workbook'; // Assuming Workbook component is in a separate file
import {useNavigation} from '@react-navigation/native';
import CardComponent from '../../components/CardComponent';
import {PieChart} from 'react-native-gifted-charts';
import MathWorkbook from './MathWorkbook';

const MathComponent = ({widthBar}) => {
  console.log(widthBar);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const pieData = [
    {value: widthBar, color: '#006666'},
    {value: 100 - widthBar, color: 'lightgray'},
  ];
  const [completedMathLessons, setCompletedMathLessons] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCompletedMathLessons = async () => {
      try {
        const currentUser = await auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          const math = parentDoc.data().math;

          // Filter out completed lessons
          const completedLessons = Object.keys(math)
            .filter(key => math[key].isCompleted)
            .sort();

          console.log(completedLessons);

          setCompletedMathLessons(completedLessons);
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching completed Math lessons:', error);
      }
    };

    fetchCompletedMathLessons();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        marginHorizontal: 20,
      }}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <CardComponent
          title={'Goto Workbook'}
          color={'#2ECD70'}
          bg={'#A5FECA'}
          onPress={() => {
            navigation.navigate('Working', {category: 'Math'});
          }}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <PieChart
            onPress={openModal}
            donut
            innerRadius={50} // Adjusted inner radius to keep the proportion
            data={pieData}
            width={100} // Set the desired width
            height={100} // Set the desired height
            centerLabelComponent={() => {
              return (
                <TouchableOpacity onPress={openModal}>
                  <Text style={{fontSize: 20}}>{widthBar}%</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <ScrollView>
                <MathWorkbook completedLessons={completedMathLessons} />
                <View style={styles.progressContainer}>
                  <Text>Total Progress:</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[styles.progressFill, {width: `${widthBar}%`}]}
                    />
                  </View>
                  <Text>{widthBar}%</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default MathComponent;

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#37D6DB',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontFamily: 'PFSquareSansPro-Bold-subset',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  menuItem: {
    fontSize: 20,
    color: '#fff',
    paddingVertical: 10,
    fontFamily: 'PFSquareSansPro-Medium-subset',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressBar: {
    backgroundColor: '#ccc',
    height: 20,
    width: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  progressFill: {
    backgroundColor: '#00aa00',
    height: '100%',
    borderRadius: 10,
  },
  modalContainerExit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewExit: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginVertical: 2,
  },
  closeButton: {
    backgroundColor: '#37D6DB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  exitButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
