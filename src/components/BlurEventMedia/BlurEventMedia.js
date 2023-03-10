import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {BlurView} from '@react-native-community/blur';
import Colors from '../../constants/Colors';
import {
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  Gesture,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  SlideInDown,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
  timing,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const BlurEventMedia = ({imageUrl, closeBlur, isBlurOpen}) => {
  //   const [isBlurOpen, setIsBlurOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const [viewRef, setViewRef] = useState(null);
  const [blurType, setBlurType] = useState('light');

  const tintColor = ['#ffffff', '#000000'];
  if (blurType === 'xlight') {
    tintColor.reverse();
  }

  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });
  return (
    <TouchableWithoutFeedback onPress={closeBlur}>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isBlurOpen}
        onRequestClose={closeBlur}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeBlur}
          style={{flex: 1}}>
          <BlurView
            viewRef={viewRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            blurRadius={1}
            blurType={blurType}

            // Additional available on Android
            // blurRadius={20}
            // downsampleFactor={10}
            // overlayColor={'rgba(0, 0, 255, .6)'}
          >
            {/* <TouchableWithoutFeedback> */}
            {imageUrl === '' ? (
              <View style={{marginTop: 15}}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            ) : (
              <PinchGestureHandler onGestureEvent={pinchHandler}>
                <Animated.View style={{flex: 1}}>
                  <AnimatedImage
                    resizeMode="contain"
                    style={[
                      {
                        // minHeight: 300,
                        width: width,
                        flex: 1,
                      },
                      rStyle,
                    ]}
                    source={{uri: imageUrl}}
                  />
                  {/* <Animated.View style={[styles.focalPoint, focalPointStyle]} /> */}
                </Animated.View>
              </PinchGestureHandler>
            )}
            {/* </TouchableWithoutFeedback> */}
          </BlurView>
        </TouchableOpacity>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default BlurEventMedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
