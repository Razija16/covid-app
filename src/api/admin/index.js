class AdminApi {
    static BACKEND_URL = "http://localhost:4000/api/admin";

    static async getUsers() {
        return fetch(`${this.BACKEND_URL}/patients`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }
    static async getUser(id) {
        return fetch(`${this.BACKEND_URL}/patient/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }
    static async getTeams() {
        return fetch(`${this.BACKEND_URL}/teams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }
    static async createTeam(data) {
        return fetch(`${this.BACKEND_URL}/createteam`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(data)
        })
    }
}
export default AdminApi