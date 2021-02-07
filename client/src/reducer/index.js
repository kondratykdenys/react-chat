export default (state, { type, payload }) => {
  switch (type) {
    case 'IS_AUTH':
      return {
        ...state,
        isAuth: payload,
      }
    default:
      return {
        ...state,
      }
  }
}
