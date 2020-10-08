  
  let headerOptions = {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token"),
  };
  
  export function updateHeaderOptions () {
    console.log("updating token for API requests"); //called on login
  
    headerOptions = {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token"),
    }
  };
  
  //User Api Calls
  export async function login(userDetails) {
    const result = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: headerOptions,
    });
    if(result.status > 299) {
        return Promise.reject('Unable to login');
    }
    return result.headers.get("token");
  }

  export async function register(data) {
    const result = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log('result', result);

    if(result.status > 299) {
        return Promise.reject('Unable to create user');
    }
    return result.json();
}

  //Product Api Calls

  export async function getProducts() {
    const result = await fetch(`http://localhost:3000/product/`, {
        headers: {}
    });

    if(result.status > 299) {
        return Promise.reject('not authorised');
    }

    return await result.json();
}

export async function postProduct(data) {
    const result = await fetch(`http://localhost:3000/product/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log('result', result);

    if(result.status > 299) {
        return Promise.reject('Unable to create product');
    }
    return result.json();
}
