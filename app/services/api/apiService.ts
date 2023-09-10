import server from "./axiosMiddleware";

export class ApiService {
    controller: string;
    constructor(controller: string) {
        this.controller = controller;
    }
    protected get(path = ""): Promise<any> {
        return new Promise((resolve, reject) => {
            server
                .get(`${this.controller}/${path}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    protected post(path = "", data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            server
                .post(`${this.controller}/${path}`, data)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    protected put(path = "", data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            server
                .put(`${this.controller}/${path}`, data)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    protected delete(path = ""): Promise<any> {
        return new Promise((resolve, reject) => {
            server
                .delete(`${this.controller}/${path}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
