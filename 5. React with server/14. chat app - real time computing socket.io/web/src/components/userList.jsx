import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from './../context/Context';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import "./userList.css"

function Home() {

    let { state, dispatch } = useContext(GlobalContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState(null);

    useEffect(() => {

        getUsers();

    }, [])

    const getUsers = async (e) => {
        if (e) e.preventDefault();

        try {
            const response = await axios.get(`${state.baseUrl}/users?q=${searchTerm}`)
            console.log("response: ", response.data);
            setUsers(response.data)

        } catch (error) {
            console.log("error in getting all tweets", error);
            // setUsers([])
        }
    }


    return (
        <div>
            <h1>Search user to start chat</h1>

            <form onSubmit={getUsers}>
                <input type="search" placeholder='type user name' onChange={(e) => [
                    setSearchTerm(e.target.value)
                ]} />
                <button type="submit">Search</button>
            </form>

            {(users?.length) ?
                users?.map((eachUser, index) => {
                    return <div className='userListItem' key={index}>
                        <h2>{eachUser.firstName} {eachUser.lastName}</h2>
                        <span>{eachUser.email}</span>

                        {(eachUser?.me) ? <span><br />this is me</span> : null}
                    </div>
                })
                : null
            }
            {(users?.length === 0 ? "No users found" : null)}
            {(users === null ? "Loading..." : null)}

        </div>
    );
}

export default Home;
