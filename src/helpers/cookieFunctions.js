// Object to handle all cookie related functionality
// Created in the event that future cookie events would be necessary
const CookieFunctions = {
  readCookie: (cookieName) => {
    var cookieValue = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');    
    return cookieValue ? cookieValue.pop() : '';
  }
}

export default CookieFunctions