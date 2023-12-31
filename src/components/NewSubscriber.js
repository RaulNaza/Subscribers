import { useState } from "react"
import { userAPI } from "../rest-api/subscribers"


function NewSubscriber () {

    const [newName, setNewName] = useState('');
    const [newSubStatus, setNewStatus] = useState('');

    //postUser function will take in information saved in state and post to the API server
    const postUser = async (event) => {
        event.preventDefault();
        try{
            let date = new Date();
            let dateJSON = date.toJSON();
            const newUserObj = {
                fullName: newName,
                subscription: newSubStatus,
                joined: dateJSON
            };
            await userAPI.post(newUserObj);
            document.getElementById('newNameInput').value = ''
        }
        catch{
            console.log('Failed postUser function')
        }
    }

    return (
            <div>
                <div className="New-User-Div card bg-body-tertiary mt-5">
                    <h3 className="card-header">New User</h3>
                    <form className="New-User-Form card-body">
                        <label className="form-label">User Name: </label>
                        <input className="form-control" id="newNameInput" onChange={(event) => setNewName(event.target.value)}></input><br></br>
                        <label className="form-label">Subscription: </label>
                        <select defaultValue={'placeholder'} className="form-select" onChange={(event) => setNewStatus(event.target.value)}>
                                <option value={'placeholder'} disabled>Please Choose:</option>
                                <option value={'true'}>Unpaid Subscriber</option>
                                <option value={'false'}>Paid Subscriber</option>
                            </select><br></br>
                        <button className="btn btn-primary" onClick={(event) => postUser(event)}>Create New User</button>
                    </form>
                </div>
            </div>
    )
}

export default NewSubscriber