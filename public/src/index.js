import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

class List extends React.Component {
  state = {
    users: [],
    posts: [],
    tags: [],
  };

  componentDidMount() {
    axios.get('http://localhost:8000/api/users').then(response => {
      this.setState({ users: response.data });
    })
    axios.get('http://localhost:8000/api/posts').then(response => {
      this.setState({ posts: response.data });
    })
    axios.get('http://localhost:8000/api/tags').then(response => {
      this.setState({ tags: response.data });
    })
  }

  render() {
    return (
      <Fragment>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>{post.text}</li>
          ))}
        </ul>
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag.id}>{tag.tag}</li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

ReactDOM.render(<List />, document.getElementById('root'));
registerServiceWorker();
