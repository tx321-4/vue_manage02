import Cookies from 'js-cookie'
const SessionKey = 'PHPSESSID'

const getters = {
  title: state => state.sys.title,
  company: state => state.sys.company,
  hasUserInfo: (state) => {
    return state.user.id != null
  },
  hasSession: (state) => {
    return Cookies.get(SessionKey)
  }
}
export default getters
