

import React, { useState, useRef, useContext } from "react";
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
    ActivityIndicator
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import { Link } from "react-router-native";
import { NavLink } from "react-router-dom";

import { GlobalContext } from './../context/Context';



const Login = () => {

    let { state, dispatch } = useContext(GlobalContext);


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const passwordInputRef: any = useRef("");

    const handleSubmit = async () => {

        try {
            setIsLoading(true)
            const resp = await axios.post(`${state?.baseUrl}/api/v1/login`, {
                email: userName,
                password: password
            },
                {
                    withCredentials: true
                })
            console.log("response: ", resp);
            Alert.alert(resp.data.message)
            setIsLoading(false)

        } catch (e: any) {
            Alert.alert(`${e.response.data.message || "failed"}`);
            setIsLoading(false)

        }
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
                returnKeyType='next'
                onSubmitEditing={() => { passwordInputRef.current.focus() }}
            />

            {/* <Text style={styles.labels}>Enter you Password</Text> */}
            <TextInput
                ref={passwordInputRef}
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                placeholder={"Password"}
                placeholderTextColor={"#a8a5a5"}
                secureTextEntry={true}
                // returnKeyType='done'
                returnKeyLabel="submit"
                onSubmitEditing={() => handleSubmit()}
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

            {(isLoading) ?
                (<ActivityIndicator size='large' />) :

                (<TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>)
            }






        </View>
        <TouchableOpacity>
            <Link to={'/signup'} underlayColor={'transparent'}>
                <Text style={styles.footerText}>
                    Don't have an account yet? Signup
                </Text>
            </Link>
        </TouchableOpacity>
        {/* </ScrollView> */}
    </View>

}

let activeStyle = {
    textDecoration: "underline",
};
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
        color: "gray",
        fontWeight: '300',
    },
    labels2: {},
    labels3: {},
});
