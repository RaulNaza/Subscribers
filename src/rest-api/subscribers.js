
const USERS_API = 'https://65453b3e5a0b4b04436dd924.mockapi.io/users';



class USERSAPI {

    get = async () => {
        try {
            const resp = await fetch(USERS_API)
            const data = resp.json();
            return data
        }
        catch{
            console.log('Something went wrong and GET call failed')
        }
    };
    
    put = async (userObject) => {
        try{
            const resp = await fetch(`${USERS_API}/${userObject.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userObject)
            });
            return resp;
        }
        catch{
            console.log("Your PUT call has failed.")
        }

    };

    post = async (userObject) => {
        try{
            const resp = await fetch(USERS_API, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body : JSON.stringify(userObject)
            })
            return resp;
        }
        catch{
            console.log('Your POST call has failed')
        }
    };

    delete = async (id) => {
        try{
            const resp = await fetch(`${USERS_API}/${id}`, {
                method: 'DELETE'
            })
            return resp;
        }
        catch{
            console.log('Your DELETE call failed')
        }
    };

}

export const userAPI = new USERSAPI();