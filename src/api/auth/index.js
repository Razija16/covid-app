class AuthApi {
    static BACKEND_URL = "http://localhost:4000/api";

    static async login(data) {
        return fetch(`${this.BACKEND_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                console.log("Odgovor:",res)
                return res;
            })
    }
    static async signup(data) {
        return fetch(`${this.BACKEND_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                console.log("Odgovor:",res)
                if (res.ok) return res.json();

                throw new Error("Error signing in!");
            })
            .then((data) => {
                console.log("DATA:",data)
                //redirect?
                return data;
            });
    }
    static async getCurrentUser() {
        return fetch(`${this.BACKEND_URL}/profile/test`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
}

export default AuthApi;