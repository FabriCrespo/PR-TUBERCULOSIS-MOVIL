import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const Tutorial = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/Tutorial.mp4')} // URL del video
        style={styles.video}
        controls={true} // Muestra los controles del reproductor
        resizeMode="cover" // Ajusta el video para llenar la pantalla
      />
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
  video: {
    width: '100%',
    height: 300, 
  },
});

export default Tutorial;
