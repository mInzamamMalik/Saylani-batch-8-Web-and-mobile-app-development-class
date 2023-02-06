

import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';


const baseUrl = 'http://172.16.22.165:5001';

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {

        const resp = await axios.post(`${baseUrl}/api/v1/login`, {
            email: userName,
            password: password
        },
            {
                withCredentials: true
            })
        console.log("response: ", resp);

        Alert.alert(resp.data.message)
    };

    return <View style={styles.container}>
        {/* <View> */}
        {/* </View> */}
        {/* <ScrollView contentInsetAdjustmentBehavior="automatic"> */}
        <Text style={styles.heading}>SMIT CHAT</Text>
        <Text style={styles.subHeading}>Welcome back! Let's Login</Text>

        <View style={styles.inputContainer}>
            {/* <Text style={styles.labels}>Enter you email</Text> */}
            <TextInput
                value={userName}
                onChangeText={(text) => setUserName(text)}
                autoFocus
                placeholder={"Email"}
                keyboardType="email-address"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={"#a8a5a5"}
            />

            {/* <Text style={styles.labels}>Enter you Password</Text> */}
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder={"Password"}
                keyboardType="visible-password"
                placeholderTextColor={"#a8a5a5"}
            // blurOnSubmit={false}
            // multiline={false}
            // onChangeText={password => updateState({password})}
            // right={
            //   <TextInput.Icon
            //     name="eye"
            //     onPress={() => setHidePass(!hidePass)}
            //   />
            // }
            />
            <TouchableOpacity>
                <Text
                    style={{
                        textAlign: "right",
                        paddingRight: 18,
                        color: "black",
                        fontWeight: "300",
                        fontFamily: 'serif',
                    }}
                >
                    Forget Password?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Text style={styles.footerText}>
                Don't have an account yet? Signup
            </Text>
        </TouchableOpacity>
        {/* </ScrollView> */}
    </View>

}

export default Login;



export const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: "100%",
        color: "yellow",
    },

    heading: {
        fontFamily: 'serif',
        fontSize: 34,
        color: "black",
        fontWeight: "600",
        // marginTop: 8,
    },
    subHeading: {
        fontFamily: 'serif',
        fontWeight: "700",
        color: "black",
    },
    textInput: {
        fontFamily: 'serif',
        margin: 15,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.3)",
        borderRadius: 10,
        color: "black",
        fontSize: 18,
        // backgroundColor: "black",
    },
    button: {
        // color:'black',
        margin: 15,
        padding: 15,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.3)",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#5DFF43",
    },
    buttonText: {
        fontFamily: 'serif',
        fontWeight: '600',
        color: "#474747",
    },
    // labels: {
    //   color: "black",
    // },
    footerText: {
        fontFamily: 'serif',
        marginTop: 20,
        textAlign: "center",
        color: "black",
        fontWeight: '300',
    },
    labels2: {},
    labels3: {},
});
