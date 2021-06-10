import React, {useRef, useState} from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {List} from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function SetImage({setImage, style}) {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(-100)).current;
  const fadeIn = () =>
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    });
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.wrapperIcon, style]}
        onPress={() => {
          setVisible(true);
          fadeIn().start();
        }}>
        <FontAwesome name="camera" size={15} />
      </TouchableOpacity>
      <Modal animationType="fade" visible={visible} transparent={true}>
        <GestureRecognizer
          onSwipeDown={() => {
            setVisible(false);
            fadeIn().reset();
          }}
          style={{flex: 1}}>
          <Pressable
            style={styles.background}
            onPress={() => {
              setVisible(false);
              fadeIn().reset();
            }}>
            <Animated.View style={[styles.container, {bottom: fadeAnim}]}>
              <List.Section>
                <List.Item
                  title="Camera"
                  left={() => <FontAwesome name="camera" size={25} />}
                  onPress={() => {
                    setVisible(false);
                    launchCamera({mediaType: 'photo'}, props => {
                      if (props.type === 'image/jpeg') {
                        setImage(props);
                      }
                    });
                  }}
                />
                <List.Item
                  title="Library"
                  left={() => <FontAwesome5 name="images" size={25} />}
                  onPress={() => {
                    setVisible(false);
                    launchImageLibrary({mediaType: 'photo'}, props => {
                      if (props.type === 'image/jpeg') {
                        setImage(props);
                      }
                    });
                  }}
                />
                <List.Item
                  title="camera"
                  left={() => <FontAwesome name="camera" size={25} />}
                  onPress={() => setVisible(false)}
                />
              </List.Section>
            </Animated.View>
          </Pressable>
        </GestureRecognizer>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrapperIcon: {
    position: 'absolute',
    bottom: 10,
    right: -5,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 8,
    paddingLeft: 8,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
