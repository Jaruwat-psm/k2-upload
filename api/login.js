export const CheckLogin = async (user, password) => {

    const formdata = new FormData();
    formdata.append("username", user);
    formdata.append("password", password);
    
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    
    const response = await fetch(`https://intranet.psm.tu.ac.th/it_process/login`, requestOptions);
    const data = await response.json();
    return data;
}