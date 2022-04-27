import * as axios from 'axios';

export default class MainService {
  path = '/';

  async fetchAll(params = {}) {
    return await axios.get(this.#buildUrl(), { params });
  }

  async fetchOne(id) {
    return await axios.get(`${this.#buildUrl()}/${id}`);
  }

  async create(data = {}) {
    return await axios.post(this.#buildUrl(), data);
  }

  async update(id, data = {}) {
    return await axios.put(`${this.#buildUrl()}/${id}`, data);
  }

  async delete(id) {
    return await axios.delete(`${this.#buildUrl()}/${id}`);
  }

  #buildUrl() {
    return `https://api.spacexdata.com/v3${this.path}`
  }
}
