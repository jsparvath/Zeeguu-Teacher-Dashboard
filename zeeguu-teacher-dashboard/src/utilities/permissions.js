import universalCookies from 'universal-cookie'
const getSession = () => {
  const cookies = new universalCookies()
  return cookies.get('sessionID')
}

const checkSession = () => {}

export { getSession }
// :
// """
// Main function to validate the user.
// :return: Returns a boolean on whether the session is ok.
// """
// if not 'sessionID' in session.keys():
//     session['sessionID'] = '0'

// permission_check = api_get('validate', raise_for_status=False).text

// if permission_check == "OK":
//     return True
// return False

// def has_session(func):
// """
// General decorator to check if the teacher is logged in.
// :param func: The function this decorator wraps.
// :return: Returns either a redirect to login, if the user is not logged in,
// or the passed function.
// """

// @wraps(func)
// def session_wrapper(*args, **kwargs):

//     if check_session():
//         return func(*args, **kwargs)
//     else:
//         return redirect("login")

// return session_wrapper
