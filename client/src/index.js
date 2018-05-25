import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class List extends React.Component {
  state = {
    expandedUser: null,
    users: [],
    userQuotes: null,
  };

  componentDidMount() {
    axios.get('http://localhost:8000/api/users').then(response => {
      this.setState({ users: response.data });
    });
    axios.get('http://localhost:8000/api/posts').then(response => {
      this.setState({ posts: response.data });
    });
    axios.get('http://localhost:8000/api/tags').then(response => {
      this.setState({ tags: response.data });
    });
  }

  getPosts(id) {
    axios.get(`http://localhost:8000/api/users/${id}/posts`).then(response => {
      this.setState({
        userQuotes: response.data,
        expandedUser: id,
      });
    });
  }

  photos = {
    'Frodo Baggings': 'http://middle-earthencyclopedia.weebly.com/uploads/3/8/2/9/3829140/1560779.png?318',
    'Samwise Gamgee': 'http://www-images.theonering.org/torwp/wp-content/uploads/2013/05/samwise-gamgee-300x184.jpg',
    'Meriadoc Brandybuck': 'https://i.pinimg.com/originals/1e/53/ee/1e53eeea02819531453539bdf3b1d16f.jpg',
    'Peregrin Took': 'data:image/jpeg;base64,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',
    'Mithrandir': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFBcqL6liBY9xyYU3iick63g50OEw9pJGSeUnsxqceKwYVMkAEQ',
    'Boromir': 'https://vignette.wikia.nocookie.net/factpile/images/6/66/Lotr-boromir-1280jpg-b6a4d5_1280w.jpg/revision/latest?cb=20160331232305',
    'Legolas': 'http://archery360.com/wp-content/uploads/2014/01/Legolas-Photo-Squidoo.jpg',
    'Gimly': 'https://vignette.wikia.nocookie.net/lotr/images/e/ec/Gimli_-_FOTR.png/revision/latest?cb=20121008105956',
    'Aragorn': 'https://imgix.bustle.com/rehost/2016/9/13/f1debc8e-02c6-4ba3-814e-e573734e9e4b.png?w=970&h=582&fit=crop&crop=faces&auto=format&q=70'
  };

  render() {
    return (
      <Fragment>
        <ul className="user-list">
          {this.state.users.map(user => (
            <li key={user.id} onClick={() => this.getPosts(user.id)}>
              <h4 className="user-name">{user.name}</h4>
            </li>
          ))}
        </ul>

        {this.state.userQuotes &&
          <div className="quotes-section">
            <div>
              <h2>{this.state.userQuotes[0].postedBy}</h2>
              {this.state.userQuotes.map(quotes => (
                <div className="quotes" key={quotes.id}>"{quotes.text}"</div>
              ))}
            </div>
            <img height={300} src={this.photos[this.state.userQuotes[0].postedBy]} alt={this.state.userQuotes[0].postedBy} />
          </div>
        }
      </Fragment>
    )
  }
}

ReactDOM.render(<List />, document.getElementById('root'));
registerServiceWorker();
