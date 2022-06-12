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
            body: JSON.stringify(data)
        })
    }
    static async getTeam(id) {
        return fetch(`${this.BACKEND_URL}/team/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }
    static async addMember(data) {
        return fetch(`${this.BACKEND_URL}/addmember`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(data)
        })
    }
    static async deleteTeamMember(id) {
        return fetch(`${this.BACKEND_URL}/deletemember/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }
    static async deleteTeam(id) {
        return fetch(`${this.BACKEND_URL}/deleteteam/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }
}
export default AdminApi