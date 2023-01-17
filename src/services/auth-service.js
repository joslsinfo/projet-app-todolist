import constants from '../constants';

class AuthService {
    url = `${constants.apiUrl}/users`;
    apiKey = constants.apiKey;
    tokenKey = "jwt-token";
    userIdKey = "user-id";

    getUserId() {
        return localStorage.getItem(this.userIdKey);
    }

    setUserId(userId) {
        return localStorage.setItem(this.userIdKey, userId);
    }

    clearUserId() {
        return localStorage.removeItem(this.userIdKey);
    }


    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token) {
        return localStorage.setItem(this.tokenKey, token);
    }

    clearToken() {
        return localStorage.removeItem(this.tokenKey);
    }


	async authenticate() {
		try {
			const token = this.getToken();
			const endpoint = "authenticate";

			if (!token) return null;

			const response = await fetch(`${this.url}/${endpoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": this.apiKey
				},
				body: JSON.stringify({ token }),
			});

			if (!response.ok) throw new Error(response.statusText);

			const json = await response.json();

			if (json.success) {
				this.setToken(json.data.token);
				this.setUserId(json.data.user._id);
			}

			return json;

		} catch (error) {
			console.error(error);
		}
	}



    async login(email, password) {
		const endpoint = "loginWithPassword";

		try {
			const response = await fetch(`${this.url}/${endpoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": this.apiKey
				},
				body: JSON.stringify({ email, password, username: email })
			});

			if (!response.ok) throw new Error(response.statusText);

			const json = await response.json();

			if (json.success) {
				const { token, user } = json.data;
				this.setToken(token);
				this.setUserId(user._id);
			}

			return json;

		} catch (e) {
			console.error(e)
		}
	}

    async register(email, password) {
		const endpoint = "signupWithPassword";

		try {
			const response = await fetch(`${this.url}/${endpoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": this.apiKey
				},
				body: JSON.stringify({ email, password, username: email })
			});

			if (!response.ok) throw new Error(response.statusText);

			const json = await response.json();

			if (json.success) {
				const { token, user } = json.data;
				this.setToken(token);
				this.setUserId(user._id);
			}

			return json;
		} catch (e) {
			console.error(e)
		}
	}

	logout() {
		this.clearToken();
		this.clearUserId();
	}


}

export default AuthService;