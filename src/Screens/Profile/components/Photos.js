import React, {useCallback, useState} from 'react';
import {Image, Modal, View} from 'react-native';
import styles from '../styles';
import ImageComponent from './Image';
const mockImages = [
  {
    id: 1,
    url: 'https://randomwordgenerator.com/img/picture-generator/53e9d1454a54b10ff3d8992cc12c30771037dbf85254784a70287ed39345_640.jpg',
  },
  {
    id: 2,
    url: 'https://randomwordgenerator.com/img/picture-generator/53e9d1454a54b10ff3d8992cc12c30771037dbf85254784a70287ed39345_640.jpg',
  },
  {
    id: 3,
    url: 'https://randomwordgenerator.com/img/picture-generator/55e7dd454256a914f1dc8460962e33791c3ad6e04e50744172297bd5914ac6_640.jpg',
  },
  {
    id: 4,
    url: 'https://randomwordgenerator.com/img/picture-generator/55e1d2404e53a514f1dc8460962e33791c3ad6e04e507440762879dd9548c7_640.jpg',
  },
  {
    id: 5,
    url: 'https://randomwordgenerator.com/img/picture-generator/55e4d74b495bb10ff3d8992cc12c30771037dbf85254794e72267add944a_640.jpg',
  },
  {
    id: 6,
    url: 'https://randomwordgenerator.com/img/picture-generator/53e9d1454a54b10ff3d8992cc12c30771037dbf85254784a70287ed39345_640.jpg',
  },
  {
    id: 7,
    url: 'https://randomwordgenerator.com/img/picture-generator/55e7dd454256a914f1dc8460962e33791c3ad6e04e50744172297bd5914ac6_640.jpg',
  },
  {
    id: 8,
    url: 'https://randomwordgenerator.com/img/picture-generator/55e1d2404e53a514f1dc8460962e33791c3ad6e04e507440762879dd9548c7_640.jpg',
  },
  {
    id: 9,
    url: 'https://randomwordgenerator.com/img/picture-generator/55e1d2404e53a514f1dc8460962e33791c3ad6e04e507440762879dd9548c7_640.jpg',
  },
];
const Photos = () => {
  const [images, setImages] = useState(mockImages);
  const handleDelete = useCallback(
    id => {
      let index = -1;
      const imagesClone = [...images];
      imagesClone.forEach((item, ind) => {
        if (item.id === id) {
          index = ind;
          return;
        }
      });
      imagesClone.splice(index, 1);
      console.log(imagesClone);
      setImages(imagesClone);
    },
    [images.length],
  );
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
