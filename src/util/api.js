import axios from "axios";

const SERVER_URL = "http://localhost:8080/";

const instancia = axios.create({
  baseURL: SERVER_URL,
  timeout: 30000,
});

export default {
  async execute(method, resource, data, config) {
    return instancia({
      method: method,
      url: resource,
      data,
      /* headers: {
                Authorization: localStorage.getItem('token') === null?'':'Bearer ' + localStorage.getItem('token')
            }, */
      config,
    });
  },
  doGet(endPoint) {
    return this.execute("GET", endPoint, null, {
      transformResponse: [
        function(data) {
          return data;
        },
      ],
    });
  },
  doPost(endPoint, object) {
    return this.execute("POST", endPoint, object);
  },
  doPut(endPoint, object) {
    return this.execute("PUT", endPoint + object.id, object);
  },
  doDelete(endPoint) {
    return this.execute("DELETE", endPoint);
  },
};
