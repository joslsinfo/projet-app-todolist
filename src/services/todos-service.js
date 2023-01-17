import constants from '../constants';
import AuthService from './auth-service';

class TodosService {
	url = constants.apiUrl;
	apiKey = constants.apiKey;
	authService = new AuthService();


	async createTodo(todo) {
		const endpoint = "todos";

		try {
			const response = await fetch(`${this.url}/${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: this.apiKey,
				},
				body: JSON.stringify({ input: todo })
			});

			if (!response.ok) {
				throw new Error(`Could not fetch ${this.endpoint}, received ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	async updateTodo(id, todo) {
		const endpoint = "todos";

		try {
			const response = await fetch(`${this.url}/${endpoint}/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: this.apiKey,
				},
				body: JSON.stringify({ _id: id, input: todo })
			});

			if (!response.ok) {
				throw new Error(`Could not fetch ${this.endpoint}, received ${response.message}`);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}


	async deleteTodo(id) {
		if (confirm("Êtes-vous sûr de vouloir supprimer ce todo ?")) {
			const endpoint = "todos";
			try {
				const response = await fetch(`${this.url}/${endpoint}/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: this.apiKey,
					},
					body: JSON.stringify({ _id: id })
				});

				if (!response.ok) {
					throw new Error(`Could not fetch ${this.endpoint}, received ${response.status}`);
				}

				const json = await response.json();

				if (json.success) {
					return json.data;
				} else {
					throw new Error(`Could not fetch ${this.endpoint}, received ${json.message}`);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			return
		}
	}

	
	

	async getTodo(id) {
		const endpoint = "todos";

		try {
			const response = await fetch(`${this.url}/${endpoint}/${id}`);

			if (!response.ok) {
				throw new Error(`Could not fetch ${this.endpoint}, received ${response.status}`);
			}

			const json = await response.json();

			return json;
		} catch (error) {
			console.error(error);
		}
	}


	async getTodos() {
		const endpoint = "todos/all";
		const id = this.authService.getUserId();

		// if(!id) return [];   

		if(!id) throw new Error("User ID not found");

		try {
			const response = await fetch(`${this.url}/${endpoint}/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: this.apiKey,
				}
			});

			if (!response.ok) {
				throw new Error(`Could not fetch ${this.endpoint}, received ${response.status}`);
			}

			const json = await response.json();

			if (json.success) {
				return json.data;
			} else {
				throw new Error(`Could not fetch ${this.endpoint}, received ${json.message}`);
			}
		} catch (error) {
			console.error(error);

			return [];
		}
	}
}

export default TodosService;