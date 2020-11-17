export const logIn = async (state) => {
    try {
        let response = await fetch("url", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: 'login',
                isGoogle: false,
                user: {
                    email: state["email"],
                    password: state["password"]
                }
            })
        });
        let json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}

export const signUp = async (state) => {
    try {
        let response = await fetch("url", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: 'signup',
                isGoogle: false,
                user: {
                    email: state["email"],
                    password: state["password"]
                }
            })
        });
        let json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}


export const signInWithGoogle = async (state) => {
    try {
        let response = await fetch("url", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: 'login',
                isGoogle: true,
                user: state["user"]
            })
        });
        let json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}