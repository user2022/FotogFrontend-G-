export default function ({store, redirect, error}) {
    if (store.state.auth.user.role.power <= 9 || store.state.auth.user.loggedIn === false) {
        return error({statusCode: 403, message: 'You do not have permission to access this page'});
    }
}
