/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './components/Login';
import Signup from './components/Signup';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // let a = 5;
  // a = 0.5;

  // let b: Number = 0;
  // b = 5;

  // let c: String = 'car';
  // c = 'bus'

  // let d = "abc";

  // let arr: number[] = [1, 2, 3];

  // let obj: {
  //   name: string;
  //   class: string;
  //   roll: string;
  //   subject?: string;
  // } = {
  //   name: "abc",
  //   class: "abc",
  //   roll: "abc",
  // };

  // interface Student {
  //   name: string;
  //   class: string;
  //   roll: string;
  //   subject?: string;
  // }

  // let obj: Student = {
  //   name: "abc",
  //   class: "abc",
  //   roll: "abc",
  // };

  // obj.subject = "science";

  // const doSum = (num1: number, num2: number): number => {

  //   return num1 + num2;
  // }





  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />


      {/* <Login /> */}
      <Signup />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
