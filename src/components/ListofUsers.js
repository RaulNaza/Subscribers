import {useState, useEffect} from "react";
import { userAPI } from "../rest-api/subscribers";
import UserCard from "./UserCard";




function ListOfUsers () {
    const [users, setUsers] = useState([]);

    //selected user
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        getUsers();
    }, []);

    //GET
    const getUsers = async () => {
        try{
            const resp = await userAPI.get();
            setUsers(resp);

        }
        catch{
            console.log('No response from getUser function of userAPI')
        }
    };

    const runOnClick = async (user) => {
        try{
            setSelectedUser(user);
            getUsers();
        }
        catch{
            console.log('runOnClick function failed')
        }
    }

    const handleChange = (status) => {
       console.log('success')
       if (status === true){
        getUsers();
        setSelectedUser('');
       }
    }

    return (
        <div className="container-fluid">
            <div id="parent-div">
                <div id="child-div-left">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Current Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(
                                    (user, index) => (
                                        <tr key={index}>
                                            <td onClick={() => runOnClick(user)}>{user.fullName}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div id="child-div-right">
                    <p>Card for selected contact should show on the right side.</p>
                    {
                        selectedUser === ''? <p>Please select a subscriber</p>:
                        <UserCard user={selectedUser} change={handleChange}/>
                    }
                </div>
            </div>
        </div>
    );

};

export default ListOfUsers