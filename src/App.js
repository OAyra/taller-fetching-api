import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      idUsuario: '',
      dataUsuario: {}
    }
    this.handlerChange = this.handlerChange.bind(this)
  }

  componentDidMount(){
    this.handlerFetchFunction()
  }

  handlerFetchFunction(){ 
    const url = `https://jsonplaceholder.typicode.com/todos/${this.state.idUsuario}`
    fetch(url)
      .then((response) => {
        return response.json();
      }).then(function (resultado) {
        this.setState({
          dataUsuario: resultado
        })
      }.bind(this))
      .catch(error => {
        alert('error', error);
      });
  }

  handlerChange(event){
    const { value } = event.target;
    this.setState({
      idUsuario: value
    }, () => this.handlerFetchFunction());
  }


  render() {
    const { dataUsuario } = this.state;

    return (
      <div className="App">
        <input
          name="idUsuario"
          value={this.state.idUsuario}
          onChange={this.handlerChange}
          type="number"
        />
        <div className="table-wraper">
          { dataUsuario ? 
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>user id</th>
                  <th>title</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dataUsuario.id}</td>
                  <td>{dataUsuario.userId}</td>
                  <td>{dataUsuario.title}</td>
                  <td>{dataUsuario.completed}</td>
                </tr>
              </tbody>
            </table>
            :
            <p>No se encontraron coincidencias.</p>
          }
        </div>
      </div>
    );
  }
}

export default App;
