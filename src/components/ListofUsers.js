import {useState, useEffect} from "react";
import { userAPI } from "../rest-api/subscribers";




function ListOfUsers () {
    const [users, setUsers] = useState([]);

    //new
    const [newName, setNewName] = useState('');
    const [newSubStatus, setNewStatus] = useState('')

    //updates
    const [updatedName, setUpdatedName] = useState('');
    const [updatedSubStatus, setUpdatedSubStatus] = useState('');


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

    //UPDATE
    const updateUser = async (event, user, input, prevName) =>{
        event.preventDefault();
        try{
            const newSubStat = updatedSubStatus === "true"? true : false;
            const noNameUpdate = updatedName === ""? prevName : updatedName;
            const updatedUser = {
                ...user,
                fullName: noNameUpdate,
                subscriber: newSubStat
            }
            await userAPI.put(updatedUser);
            getUsers();

            //clean up Inputs
            document.getElementById(input).value = "";
            setUpdatedName('')
        }
        catch{
            console.log('No response from updateUser function of userAPI')
        }
    };

    //POST
    const postUser = async (event) => {
        event.preventDefault();
        try{
            let date = new Date();
            let dateJSON = date.toJSON();
            const newUserObj = {
                fullName: newName,
                subscriber: newSubStatus,
                joined: dateJSON
            };
            await userAPI.post(newUserObj);
            getUsers();
            document.getElementById('newNameInput').value = ''
        }
        catch{

        }
    };

    //DELETE
    const deleteUser = async (event,id) => {
        event.preventDefault();
        try{
            await userAPI.delete(id);
            getUsers();
        }
        catch{
            console.log('No response from deleteUser function of userAPI')
        }
    };

    const getDate = (date) => {
        const dateObj = new Date(date);

        const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
        });
    
        return formattedDate;
    };

    return (
        <div className="container-fluid">
            <div>
                {
                    <div className="New-User-Div card bg-body-tertiary">
                        <h3 className="card-header">New User</h3>
                        <form className="New-User-Form card-body">
                            <label className="form-label">User Name: </label>
                            <input className="form-control" id={'newNameInput'} onChange={(event) => setNewName(event.target.value)}></input><br></br>
                            <label className="form-label">Subscriber: </label>
                            <select className="form-select" onChange={(event) => setNewStatus(event.target.value)}>
                                    <option>No Change to Subscription</option>
                                    <option value={'true'}>Currently a Subscriber</option>
                                    <option value={'false'}>Not Currently a Subscriber</option>
                                </select><br></br>
                            <button className="btn btn-primary" onClick={(event) => postUser(event)}>Create New User</button>
                        </form>
                    </div>
                }
            </div>
            <div className="row row-cols-3 p-2" id="user-divs">
                {
                    users.map((user, index) => (
                        <div key={index} className="card col p-1">
                            <div className="card-header">
                                <b>Client Name:</b> {user.fullName}<br></br>
                                <b>Joined On:</b> {getDate(user.joined)}<br></br>
                                <b>Subscriber:</b> {user.subscriber ? 'Paid Subscriber' : 'Not a Paid Subscriber'}<br></br>
                                <button className="btn btn-outline-danger" onClick={(event) => deleteUser(event,user.id)}>Delete</button>
                            </div>
                            <form className="update-form card-body">
                                <label className="form-label">Update Client Name: </label>
                                <input className="form-control" id={`UpdateName-${index}`} onChange={(event) => event.target.value === ''? setUpdatedName(user.fullName) : setUpdatedName(event.target.value)}></input><br></br>
                                <label className="form-label">Update Subscriber Status: </label>
                                <select className="form-select" onChange={(event) => setUpdatedSubStatus(event.target.value)}>
                                    <option>No Change to Subscription</option>
                                    <option value={'true'}>Currently a Subscriber</option>
                                    <option value={'false'}>Not Currently a Subscriber</option>
                                </select><br></br>
                                <button className="btn btn-warning" onClick={(event) => updateUser(event,user,`UpdateName-${index}`, user.fullName)}>Update</button>
                            </form>
                        </div>
                    ))
                }
            </div>
        </div>
    );

};

export default ListOfUsers