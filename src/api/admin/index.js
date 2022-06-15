class AdminApi {
    static BACKEND_URL = "http://localhost:4000/api/admin";

    static async getUsers() {
        return fetch(`${this.BACKEND_URL}/patients`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async getUser(id) {
        return fetch(`${this.BACKEND_URL}/patient/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async deleteUser(id) {
        return fetch(`${this.BACKEND_URL}/deletepatient/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async getTeam(id) {
        return fetch(`${this.BACKEND_URL}/team/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async getTeams() {
        return fetch(`${this.BACKEND_URL}/teams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async assignTeam(data) {
        return fetch(`${this.BACKEND_URL}/intervention/assign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            },
            body:JSON.stringify(data)
        })
    }
    static async getCovidTeams() {
        return fetch(`${this.BACKEND_URL}/intervention/assignform`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async getInterventions(active) {
        return fetch(`${this.BACKEND_URL}/interventions/${active}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async getIntervention(id,casedayId) {
        return fetch(`${this.BACKEND_URL}/intervention/${id}/${casedayId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async deleteIntervention(id) {
        return fetch(`${this.BACKEND_URL}/deleteintervention/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async createTeam(data) {
        return fetch(`${this.BACKEND_URL}/createteam`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            },
            body:JSON.stringify(data)
        })
    }
    static async addMember(data) {
        return fetch(`${this.BACKEND_URL}/addmember`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            },
            body:JSON.stringify(data)
        })
    }
    static async deleteTeamMember(id) {
        return fetch(`${this.BACKEND_URL}/deletemember/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async deleteTeam(id) {
        return fetch(`${this.BACKEND_URL}/deleteteam/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }

}
export default AdminApi