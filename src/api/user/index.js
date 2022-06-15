class UserApi{
    static BACKEND_URL = "http://localhost:4000/api";

    static async getCaseDay (userId){
        return fetch(`${this.BACKEND_URL}/caseday/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async getIntervention (interventionId,casedayId){
        return fetch(`${this.BACKEND_URL}/intervention/${interventionId}/${casedayId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async requestIntervention (data){
        return fetch(`${this.BACKEND_URL}/intervention/createintervention`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            },
            body:JSON.stringify(data)
        })
    }
    static async getProfileInfo (userId){
        return fetch(`${this.BACKEND_URL}/profile/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
}
export default UserApi