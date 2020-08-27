// import authApi from '@/api/auth'
import Cookies from 'js-cookie'

const SessionKey = 'PHPSESSID'

const user = {
  state: {
    id: null
  },
  mutations: {
    SET_USERID (state, id) {
      state.id = id
    }
  },
  actions: {
    logout ({ commit }) {
      Cookies.remove(SessionKey)
      window.location.reload()
    }
  }
}

export default user
