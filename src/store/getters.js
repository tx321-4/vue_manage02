const getters = {
  title: state => state.sys.title,
  hasUserInfo: (state) => {
    return state.user.id != null
  }
}
export default getters
