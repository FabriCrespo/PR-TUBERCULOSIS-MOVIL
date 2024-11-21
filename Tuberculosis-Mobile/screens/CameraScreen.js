import {
    Image,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    StatusBar,
    SafeAreaView,
  } from "react-native";
  import * as MediaLibrary from "expo-media-library";
  import React, { useState, useRef } from "react";
  
  import { Camera, CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
  import { Audio } from "expo-av";
  import * as FileSystem from 'expo-file-system';
  import { API_URL } from '@env';
  
  function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
    const [videoPath, setVideoPath] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [type, setType] = React.useState("back");
    function toggleCameraFacing() {
      setType((current) => (current === "back" ? "front" : "back"));
    }
    const cameraRef = React.useRef(null); // Using React.useRef to create a ref
    const [isRecording, setIsRecording] = React.useState(false);
    const timerRef = useRef(null);
  
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    const sendVideoToApi = async (uri) => {
      try {
        // Leer el contenido del archivo como base64
        const videoBase64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        console.log("Archivo leído como base64");
  
        // Crear el cuerpo de la solicitud
        const payload = {
          nombre: "video.mov", // Nombre del archivo
          descripcion: "descripcion",
          video_base64: videoBase64, // Archivo en base64
          persona_idPersona: 1
        };
  
        // Enviar a la API
        const response = await fetch(`${API_URL}/videos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error(`Error en la API: ${response.statusText}`);
        }
  
        console.log("Video enviado con éxito:", await response.json());
      } catch (error) {
        console.error("Error al enviar el video a la API:"+ error);
      }
    };
  
    const startRecording = async () => {
      setVideoPath(null);
      if (cameraRef.current) {
        try {
          setRecordingTime(0);
          // Iniciar el temporizador
          timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1);
          }, 1000);
  
          setIsRecording(true);
          const data = await cameraRef.current.recordAsync({ quality: '480p' });
          console.log("Video grabado en:", data.uri);
  
          sendVideoToApi(data.uri);
  
        } catch (error) {
          console.error("Error recording video:", error);
        }
      }
    };
  
    const stopRecording = async () => {
      if (cameraRef.current && isRecording) {
        try {
          clearInterval(timerRef.current);
          await cameraRef.current.stopRecording();
          setIsRecording(false);
        } catch (error) {
          console.error('Error al pausar:', error);
        }
      }
    };
  
    //checkMediaLibraryPermissions();
  
    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            alignContent: "center",
            alignItems: "center",
  
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "white",
              fontWeight: "600",
            }}
          >
            We need your permission to show the camera
          </Text>
          <TouchableOpacity
            onPress={() => {
              Audio.requestPermissionsAsync();
              MediaLibrary.requestPermissionsAsync();
              requestPermission();
              requestMicrophonePermission();
            }}
            style={{
              textAlign: "center",
              alignSelf: "center",
              backgroundColor: "white",
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 23,
              paddingRight: 23,
              marginTop: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              grant permission
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          //CameraMode={"video"}
          mode="video"
          // videoQuality={"720p"}
          style={{ flex: 1 }}
          facing={type}
          // ratio={"16:9"}
          ref={cameraRef}
  
        >
          <StatusBar animated={true} backgroundColor="transparent" />
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                stopRecording();
                //navigation.goBack();
              }}
              style={{
                height: 26,
                width: 60,
                //paddingTop: StatusBar.currentHeight,
                paddingLeft: 30,
                backgroundColor: "transparent",
              }}
            >
              <Image
                source={require("../assets/arrow.png")}
                style={{
                  height: "100%",
                  width: "100%",
  
                  // padding: 50,
                  borderRadius: 18,
                }}
              />
            </TouchableOpacity>
  
            <View
              style={{
                alignSelf: "flex-end",
                alignContent: "flex-end",
                height: "95%",
  
                alignItems: "baseline",
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <TouchableOpacity onPress={toggleCameraFacing}>
                <Image
                  source={require("../assets/turn.png")}
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    right: 25,
                    height: 50,
                    width: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: "20%",
                backgroundColor: "transparent",
                zIndex: 4,
              }}
            >
              <Pressable
                onPress={isRecording ? stopRecording : startRecording}
                style={{
                  //backgroundColor: "red",
                  height: 72,
                  width: 72,
                  alignSelf: "center",
                  top: -70,
                  //backgroundColor: "red",
                }}
              >
                <Image
                  source={
                    isRecording
                      ? require("../assets/reccircle.png")
                      : require("../assets/circle.png")
                  }
                  //id RecordButton
                  style={{
                    alignSelf: "center",
                    alignItems: "baseline",
                    padding: 10,
  
                    height: 72,
                    width: 72,
                  }}
                ></Image>
  
                {(isRecording) && (
                  <View >
                    <Text>{formatTime(recordingTime)}</Text>
                  </View>
                )}
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    top: -100,
                    alignSelf: "center",
                  }}
                ></Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </CameraView>
      </View>
    );
  }
  export default CameraScreen;
  