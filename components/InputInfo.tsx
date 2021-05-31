import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function InputInfo({ path }: { path: string }) {
    return (
        <View>
            <View style={styles.getStartedContainer}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                />
            </View>

            <View style={styles.helpContainer}>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
});