import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


const callGithubAPI = async (userName, repoName) => {
    const endpoint = `https://api.github.com/users/${userName}/repos`
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    if (!Array.isArray(jsonResponse)) {
      return <div></div>
    } else {
      return <div>
        {jsonResponse.map((elem) => {
          return <div>
            <RepoInfo name={elem.name} url={elem.languages_url}/>
            </div>
        })}
      </div>
    }
};

const RepoInfo = (props) => {

  const [languages, setLanguages] = useState('')
  const [visible, setVisible] = useState(false)

  const endpoint = props.url

  const response = fetch(endpoint).then((data) => data.json()).then((jsonData) => setLanguages(JSON.stringify(jsonData)))

  return <div>
    <p onClick={() => setVisible(!visible)}>{visible ?
      <p className="show" onClick={() => setVisible(!visible)}>
        {visible ? "hide " + languages : ""}
      </p> : props.name}
    </p>
  </div>

}


function App() {
 const [submitCount, setSubmitCount] = useState(0);
 const [userName, setUserName] = useState('');
 const [apiResponse, setApiResponse] = useState("now loading repo statistics. . .");

  useEffect(() => {
      callGithubAPI(userName, "angular-snake-app").then(
          result => setApiResponse(result));
  },[submitCount]);


const handleInputChange = (e) => {
    setUserName(e.target.value.trim())
};

const handleSubmit = (e) => {
  e.preventDefault()
  setSubmitCount(submitCount + 1);
}

  return(
      <div>
          <h1 className="center">Github user search</h1>
          <div className="center">
            <input name="username" onChange={handleInputChange} placeholder="insert github user name" />
            <button onClick={handleSubmit}> Submit </button>
            </div>
            <p className="user">Repositories of user: <b>{userName}</b></p>
            <div>
                <p>{apiResponse}</p>
            </div>
      </div>
  );
};

ReactDOM.render(
      <App/>,
    document.querySelector('#root')
);