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
            window.scrollTo({top: 0, behavior: "smooth"})
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
        //The below splits the parent-div between two divs (left and right) the table list displays the current subscribers
        //and the right side a card is displayed based on the contact selected.
        <div className="container-fluid" id="master-div">
            <div id="parent-div">
                <div id="child-div-left">
                    <table className="table table-hover mt-4 rounded-table">
                        <thead>
                            <tr>
                                <th>Current Subscribers</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
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
                    {
                        selectedUser === ''? <p style={{fontFamily: 'cursive', fontSize: '35px'}}>Please select a subscriber</p>:
                        <UserCard user={selectedUser} change={handleChange}/>
                    }
                </div>
            </div>
        </div>
    );

};

export default ListOfUsers