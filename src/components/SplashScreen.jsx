import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withSequence,
    withDelay,
    Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
    const logoOpacity = useSharedValue(0);
    const logoScale = useSharedValue(0.3);
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(20);

    useEffect(() => {
        // Logo Animation
        logoOpacity.value = withTiming(1, { duration: 1000 });
        logoScale.value = withSequence(
            withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.exp) }),
            withSpring(1, { damping: 10, stiffness: 100 })
        );

        // Text Animation (delayed)
        textOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
        textTranslateY.value = withDelay(800, withSpring(0));

        // Finish after animations
        const timeout = setTimeout(() => {
            if (onFinish) onFinish();
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const animatedLogoStyle = useAnimatedStyle(() => {
        return {
            opacity: logoOpacity.value,
            transform: [{ scale: logoScale.value }],
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
            transform: [{ translateY: textTranslateY.value }],
        };
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                // Professional gradient: subtle blue/purple to white or just white
                // Let's go with a clean white/light gray for a modern look
                colors={['#ffffff', '#f0f4f8']}
                style={styles.background}
            />

            <View style={styles.contentContainer}>
                <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                    <Image
                        source={require('../../assets/logo_2.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>

                <Animated.View style={[styles.textContainer, animatedTextStyle]}>
                    <Animated.Text style={styles.title}>Enjez</Animated.Text>
                    <Animated.Text style={styles.subtitle}>Fast & Reliable Services</Animated.Text>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logo: {
        width: width * 0.5, // 50% of screen width
        height: width * 0.5,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a', // Dark gray/black
        letterSpacing: 1,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666', // Medium gray
        letterSpacing: 0.5,
    },
});

export default SplashScreen;
