import React, {useState} from 'react';
import {Image, Modal, View} from 'react-native';
import ImageComponent from './Image';
import styles from '../styles';
const Photos = ({images, handleDelete}) => {
  const [imageModal, setImageModal] = useState(null);
  return (
    <>
      <View style={styles.photosImages}>
        {images &&
          images.map((item, index) => (
            <ImageComponent
              key={index}
              setImageModal={setImageModal}
              item={item}
              index={index}
              handleDelete={handleDelete}
            />
          ))}
      </View>
      <Modal
        style={styles.modalImage}
        animationType="fade"
        visible={imageModal === 0 || !!imageModal}
        onRequestClose={() => {
          setImageModal(null);
        }}>
        <Image
          style={styles.imageInModal}
          source={{
            uri: images[imageModal]?.url,
          }}
        />
      </Modal>
    </>
  );
};

export default Photos;
