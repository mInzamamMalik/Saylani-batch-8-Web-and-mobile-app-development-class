

import React, { useState, useRef, useContext } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    FlatList,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import { Link } from 'react-router-native'
import { GlobalContext } from './../context/Context';


const UserList = () => {

    let { state, dispatch } = useContext(GlobalContext);

    const [queryText, setQueryText] = useState("");
    const [users, setUsers] = useState([
        {
            "_id": "63a3490bdb1e6bf081cc6b84",
            "firstName": "Inzamam Malik",
            "lastName": "Inzamam Malik",
            "email": "malik@sysborg.com",
            "me": true
        },
        {
            "_id": "63ae909344276d8c3943cb59",
            "firstName": "rafay",
            "lastName": "khan",
            "email": "admin@gmail.com"
        },
        {
            "_id": "63aeb70d58773a4411ba7911",
            "firstName": "sad",
            "lastName": "sad",
            "email": "asdmin@gmail.com"
        },
        {
            "_id": "63b2ec88cbf794faa4667a30",
            "firstName": "abc",
            "lastName": "abc",
            "email": "abc@gmail.com"
        },
        {
            "_id": "63cad067673d919e40b1d3e1",
            "firstName": "Awais",
            "lastName": "Awais",
            "email": "awais@gmail.com"
        },
        {
            "_id": "63cad06f673d919e40b1d3e5",
            "firstName": "anas",
            "lastName": "anas",
            "email": "anas@gmail.com"
        },
        {
            "_id": "63cad076200a775f7cf326dc",
            "firstName": "Ahmed Raza",
            "lastName": "Ahmed Raza",
            "email": "ahmedraza@gmail.com"
        },
        {
            "_id": "63cad0854026e93dde1ca387",
            "firstName": "jhon papa",
            "lastName": "jhon papa",
            "email": "dil@gmail.com"
        },
        {
            "_id": "63cad08d673d919e40b1d3ec",
            "firstName": "huzaifa",
            "lastName": "huzaifa",
            "email": "fake@gmail.com"
        },
        {
            "_id": "63cad094fc8dfd81422edd4e",
            "firstName": "Abdul",
            "lastName": "Abdul",
            "email": "abdulrehman1239091@gmail.com"
        },
        {
            "_id": "63cad09f200a775f7cf32708",
            "firstName": "haroon",
            "lastName": "haroon",
            "email": "123@gmail.com"
        },
        {
            "_id": "63cad0b8fc8dfd81422edd5b",
            "firstName": "saad",
            "lastName": "saad",
            "email": "saad@gmail.com"
        },
        {
            "_id": "63cad0c0200a775f7cf32736",
            "firstName": "Mairaj Khan",
            "lastName": "Mairaj Khan",
            "email": "mairaj@khan.com"
        },
        {
            "_id": "63cad0fde228d5071965fab0",
            "firstName": "ahmedraza",
            "lastName": "ahmedraza",
            "email": "ahmadraza.azt@gmail.com"
        },
        {
            "_id": "63cad53685a99eba0f6aa878",
            "firstName": "poiuyt",
            "lastName": "poiuyt",
            "email": "saaasads@gmail.com"
        },
        {
            "_id": "63cd0e81401141259995bfe6",
            "firstName": "Aahad",
            "lastName": "Aahad",
            "email": "aahadali@gmail.com"
        },
        {
            "_id": "63d170bfb50e76c3b602a8f2",
            "firstName": "Mosh",
            "lastName": "Mosh",
            "email": "mosh@gmail.com"
        },
        {
            "_id": "63d170ddb50e76c3b602a8f7",
            "firstName": "s",
            "lastName": "s",
            "email": "s@d"
        },
        {
            "_id": "63d1767a4cf114a14b6443f5",
            "firstName": "shehzad",
            "lastName": "shehzad",
            "email": "shehzad@gmail.com"
        },
        {
            "_id": "63d176c64cf114a14b6443ff",
            "firstName": "shehzad",
            "lastName": "shehzad",
            "email": "s@s.s"
        }
    ]);

    const [isLoading, setIsLoading] = useState(false);

    interface User {
        "_id": String,
        "firstName": String,
        "lastName": String,
        "email": String,
    }

    const Item = ({ user }: { user: User }) => (

        <View style={styles.item}>
            <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
            <Text>{user.email}</Text>
        </View>
    );
    const Hr = () => (
        <View style={styles.hr} />
    );



    const searchUser = async () => {
        try {
            setIsLoading(true)

            const resp = await axios.get(`${state?.baseUrl}/api/v1/users?q=${queryText}`,
                {
                    withCredentials: true
                })
            console.log("response: ", resp.data);
            // Alert.alert(resp.data.message)


            setIsLoading(false)

        } catch (e: any) {
            Alert.alert(`${e.response.data.message || "failed"}`);
            setIsLoading(false)
        }
    }

    return <View style={styles.container} >

        <Text style={styles.heading}>USERs</Text>

        <View style={styles.inputContainer}>
            {/* <Text style={styles.labels}>Enter you email</Text> */}
            <TextInput
                onChangeText={(text) => setQueryText(text)}
                autoFocus
                placeholder={"Search users"}
                style={styles.textInput}
                autoCorrect={false}
                placeholderTextColor={"#a8a5a5"}
                returnKeyType='done'
                onSubmitEditing={() => { searchUser() }}
            />

            {(isLoading) ?
                (<ActivityIndicator size='large' />) : null
            }
        </View>


        <FlatList
            data={users}
            renderItem={({ item }) => <Item user={item} />}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Hr />}
        />

    </View >

}

export default UserList;



export const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    item: {
        backgroundColor: '',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
    },
    title: {
        fontSize: 22,
    },
    hr: {
        height: 2,
        width: 200,
        color: 'gray'
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
        alignSelf: 'center',
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
