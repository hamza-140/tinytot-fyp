import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  BackHandler,
  Share,
} from 'react-native';
import ShareMe from '../../components/Share';

const Menu = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSetting, setModalVisibleSetting] = useState(false);
  const [modalVisibleExit, setModalVisibleExit] = useState(false);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing kids learning app - Tinytot!',
        url: 'https://www.instagram.com/20s.hamza', // Replace with your app's website or download link
        title: 'Tinytot - Kids Learning App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with specific activity type
          console.log(`Shared with ${result.activityType}`);
        } else {
          // Shared successfully
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Share dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error while sharing:', error);
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const openModalSetting = () => {
    setModalVisibleSetting(true);
  };

  const closeModalSetting = () => {
    setModalVisibleSetting(false);
  };
  const openModalExit = () => {
    setModalVisibleExit(true);
  };

  const closeModalExit = () => {
    setModalVisibleExit(false);
  };

  return (
    <View style={styles.menu}>
      <Text style={styles.title}>Tinytot</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.menuItem}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openModalSetting}>
        <Text style={styles.menuItem}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.menuItem}>Terms and Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openModalExit}>
        <Text style={styles.menuItem}>Exit</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleExit}
        onRequestClose={closeModalExit}>
        <View style={styles.modalContainerExit}>
          <View style={styles.modalViewExit}>
            <Text style={styles.modalTitle}>Do you want to exit?</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={styles.exitButton}
                onPress={() => {
                  BackHandler.exitApp();
                }}>
                <Text style={styles.closeButtonText}>Exit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModalExit}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSetting}
        onRequestClose={closeModalSetting}>
        <View style={styles.modalContainerExit}>
          <View style={styles.modalViewExit}>
            <Text style={styles.modalTitle}>Settings</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={styles.exitButton}
                onPress={() => {
                  // BackHandler.exitApp();
                }}>
                <Text style={styles.closeButtonText}>Music : ON/OFF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.closeButton,{width:150}]} onPress={onShare}>
                <Text style={styles.closeButtonText}>Share App</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.closeButton,{width:150}]}
                onPress={closeModalSetting}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalTitle}>Terms and Policy</Text>
              <Text style={styles.modalContent}>
                <Text style={styles.sectionTitle}>Terms and Conditions</Text>
                {'\n'}
                {'\n'}
                <Text style={styles.sectionHeader}>1. Introduction</Text>
                {'\n'}
                Welcome to Tinytot, a kids learning application designed to make
                education fun and engaging for children. By using our app, you
                agree to these terms and conditions. Please read them carefully.
                {'\n'}
                <Text style={styles.sectionHeader}>2. User Accounts</Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  •{' '}
                  <Text style={{textDecorationLine: 'underline'}}>
                    Account Creation
                  </Text>
                  : Parents or guardians must create accounts on behalf of their
                  children. Users must provide accurate and complete information
                  during registration.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  •{' '}
                  <Text style={{textDecorationLine: 'underline'}}>
                    Security
                  </Text>
                  : Keep your account information secure. Tinytot is not
                  responsible for unauthorized access to your account.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>3. Privacy Policy</Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Data Collection: We collect personal information such as
                  name, age, and progress in the app to provide a personalized
                  learning experience.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Usage of Data: Data is used to enhance the app's
                  functionality, improve content, and provide feedback to
                  parents. We do not share personal data with third parties
                  without consent.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Parental Control: Parents can access and manage their
                  child's data through the account settings.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>4. Content</Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Educational Material: The app provides educational content
                  appropriate for children. We strive to ensure the material is
                  accurate and up-to-date.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • User Conduct: Users must use the app respectfully.
                  Inappropriate behavior or content sharing is prohibited.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>5. Contact Us</Text>
                {'\n'}
                For any questions or concerns about these terms, please contact
                us at sahamzashah19@gmail.com.{'\n'}
                {'\n'}
                <Text style={styles.sectionTitle}>Privacy Policy</Text>
                {'\n'}
                {'\n'}
                <Text style={styles.sectionHeader}>1. Introduction</Text>
                {'\n'}
                Tinytot is committed to protecting the privacy of children and
                their parents. This privacy policy outlines the types of
                information we collect, how it is used, and the measures we take
                to ensure it is protected.
                {'\n'}
                <Text style={styles.sectionHeader}>
                  2. Information Collection
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Personal Information: We collect information such as name,
                  age, and email address during account registration.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Usage Data: We collect data on how the app is used,
                  including progress, scores, and preferences.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>3. Use of Information</Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Personalization: Information is used to personalize the
                  learning experience and provide relevant content.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Improvements: Usage data helps us improve the app's
                  functionality and content.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Communication: We may use contact information to send
                  updates and important notices.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>4. Data Protection</Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Security Measures: We implement technical and organizational
                  measures to protect personal data from unauthorized access and
                  misuse.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Data Retention: Personal data is retained only as long as
                  necessary for the purposes outlined in this policy.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>5. Parental Rights</Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Access and Control: Parents can access and manage their
                  child's personal data through the account settings.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>
                  6. Third-Party Services
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • Service Providers: We may use third-party services to
                  support the app, such as hosting and analytics. These
                  providers have access to personal data only to perform
                  specific tasks and are obligated to protect it.
                </Text>
                {'\n'}
                <Text style={styles.bulletPoint}>
                  • External Links: The app may contain links to external
                  websites. We are not responsible for the privacy practices of
                  these sites.
                </Text>
                {'\n'}
                <Text style={styles.sectionHeader}>
                  7. Changes to this Policy
                </Text>
                {'\n'}
                We may update this privacy policy from time to time. Users will
                be notified of any significant changes through the app or via
                email.
                {'\n'}
                <Text style={styles.sectionHeader}>8. Contact Us</Text>
                {'\n'}
                If you have any questions or concerns about this privacy policy,
                please contact us at sahamzashah19@gmail.com.
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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

export default Menu;
