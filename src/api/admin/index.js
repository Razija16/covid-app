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
}
export default AdminApi