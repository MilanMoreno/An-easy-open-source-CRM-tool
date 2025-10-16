/**
 * API Client for Join Application
 * Replaces Firebase with PostgreSQL backend API
 */

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : `${window.location.protocol}//${window.location.hostname}:3000/api`;

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  /**
   * Get authorization headers
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  /**
   * Save authentication token
   */
  saveToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  // ========== AUTH METHODS ==========

  /**
   * Sign up a new user
   */
  async signup(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await this.handleResponse(response);
    this.saveToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  }

  /**
   * Login user
   */
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password })
    });
    
    const data = await this.handleResponse(response);
    this.saveToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  }

  /**
   * Logout user
   */
  logout() {
    this.clearToken();
  }

  // ========== CONTACTS METHODS ==========

  /**
   * Get all contacts
   */
  async getContacts() {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create a new contact
   */
  async createContact(contactData) {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(contactData)
    });
    return this.handleResponse(response);
  }

  /**
   * Update a contact
   */
  async updateContact(id, contactData) {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(contactData)
    });
    return this.handleResponse(response);
  }

  /**
   * Delete a contact
   */
  async deleteContact(id) {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ========== TASKS METHODS ==========

  /**
   * Get all tasks
   */
  async getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get a single task
   */
  async getTask(id) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create a new task
   */
  async createTask(taskData) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData)
    });
    return this.handleResponse(response);
  }

  /**
   * Update a task
   */
  async updateTask(id, taskData) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData)
    });
    return this.handleResponse(response);
  }

  /**
   * Update task status (for drag and drop)
   */
  async updateTaskStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status })
    });
    return this.handleResponse(response);
  }

  /**
   * Delete a task
   */
  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ========== SUMMARY METHODS ==========

  /**
   * Get summary metrics
   */
  async getSummaryMetrics() {
    const response = await fetch(`${API_BASE_URL}/summary/metrics`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }
}

// Create global API client instance
const api = new ApiClient();

// Compatibility functions for existing code
async function fetchData(path) {
  console.warn('fetchData is deprecated, use api methods instead');
  if (path === 'users') {
    // Not supported in new API for security reasons
    throw new Error('Direct user fetch not supported');
  }
  return {};
}

async function submitData(path, data) {
  console.warn('submitData is deprecated, use api methods instead');
  if (path === 'users') {
    return await api.signup(data.name, data.mail, data.password);
  }
  return {};
}

async function getData(path) {
  console.warn('getData is deprecated, use api methods instead');
  if (path === 'contact') {
    return await api.getContacts();
  }
  return {};
}

async function postData(path, data) {
  console.warn('postData is deprecated, use api methods instead');
  if (path === 'contact') {
    return await api.createContact(data);
  }
  return {};
}

async function putData(path, data) {
  console.warn('putData is deprecated, use api methods instead');
  const parts = path.split('/');
  if (parts[0] === 'contact') {
    return await api.updateContact(parts[1], data);
  }
  return {};
}

async function deleteDate(path) {
  console.warn('deleteDate is deprecated, use api methods instead');
  const parts = path.split('/');
  if (parts[0] === 'contact') {
    return await api.deleteContact(parts[1]);
  }
  return {};
}
