export const useAuth = defineStore('auth', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      user: {},
      loggedIn: false,
      token: '',
      lastError: {}
    }
  },
  actions: {
    async fetchUser () {
      const { data: user, error } = await useFetchWithAuth('/api/auth/user', { method: 'GET' }, this.accessToken);

      if (error.value) {
        this.lastError.value = error.value
        throw this.lastError.value;
      }

      this.user = user.value;
      this.loggedIn = true;
    },

    async login (id, password) {
      const { data: accessToken, error } = await useFetch('/api/auth', { method: 'POST', body: { id, password } })

      if (error.value && !accessToken.value) {
        this.lastError.value = error.value
        throw error.value;
      }

      this.accessToken = accessToken.value.accessToken;

      await this.fetchUser();
    }
  }
})