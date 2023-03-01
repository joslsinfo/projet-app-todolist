import constants from '../constants';
import AuthService from './auth-service';

class TodosService {

	// ==========================================================================================================================
	static adapterTodoFromApi(todo) {
		return {
			id: todo._id,
			title: todo.title,
			content: todo.content,
			done: todo.done,
			timeLimit: todo.timeLimit ? TodosService.formatDateForApi(new Date(todo.timeLimit)) : null,
			doneAt: todo.doneAt ? TodosService.formatDateForApi(new Date(todo.doneAt)) : null,
			createdAt: todo.createdAt ? TodosService.formatDateForApi(new Date(todo.createdAt)) : null,
			updatedAt: todo.updatedAt ? TodosService.formatDateForApi(new Date(todo.updatedAt)) : null,
			
		}
	}

	static adapterTodoForApi(todo) {
		const formattedTodo = {
		  _id: todo.id,
		  title: todo.title,
		  content: todo.content,
		  done: todo.done,
		  timeLimit: todo.timeLimit ? TodosService.formatDateForApi(new Date(todo.timeLimit)) : null,
		  doneAt: todo.doneAt ? TodosService.formatDateForApi(new Date(todo.doneAt)) : null,
		  createdAt: todo.createdAt ? TodosService.formatDateForApi(new Date(todo.createdAt)) : null,
		  updatedAt: todo.updatedAt ? TodosService.formatDateForApi(new Date(todo.updatedAt)) : null,
		
		};

		return formattedTodo;
	  }
	  
	  static formatDateForApi(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	  }
// =========================================================================================================================

	url = constants.apiUrl;
	apiKey = constants.apiKey;


	authServiceInstance =  AuthService.getInstance();



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
			return response.json();


		} catch (error) {
			console.error(error);
		}
	}

	async updateTodo(id, todo) {
		const endpoint = "todos";

		try {
			
			const response = await fetch(`${this.url}/${endpoint}/${id}`,  {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: this.apiKey,
				},
				body: JSON.stringify({id: id, input: todo} )
			
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
					body: JSON.stringify({_id: id })
				});

				if (!response.ok) {
					throw new Error(`Could not fetch ${this.endpoint}, received ${response.status}`);
				}

				const json = await response.json();

				if (json.success) {
					return TodosService.adapterTodoFromApi(json.data);
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
			console.log("Un test avant formatage:",json)

		
			const data = TodosService.adapterTodoFromApi(json.data);
			console.log("Un test pour un todo après formatage:", data)
			return data;

		} catch (error) {
			console.error(error);
			return {}
		}
	}


	async getTodos() {
		const endpoint = "todos/all";
		const id = this.authServiceInstance.getUserId();

		// if(!id) return [];   

		if (!id) throw new Error("User ID not found");

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
			// console.log(json)

			if (json.success) {
				return json.data.map(TodosService.adapterTodoFromApi);
				
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