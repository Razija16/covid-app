class FormApi{
    static BACKEND_URL = "http://localhost:4000/api";

    static async getSymptoms (){
        return fetch(`${this.BACKEND_URL}/profile/forms`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            }
        })
    }
    static async createCaseDay (obj){
        return fetch(`${this.BACKEND_URL}/caseday/createcd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" :`${localStorage.getItem('token')}`
            },
            body:JSON.stringify(obj)
        })
    }
  
}
export default FormApi