import React from 'react';
import PortfolioPage from './PortfolioPage';
import Signup from '../../Auth/Signup.jsx';
import Login from '../../Auth/Login.jsx';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Auth from '../../Auth/Auth.jsx';
import { Button, Modal } from 'react-bootstrap'

export default class PortfolioLanding extends React.Component {
  constructor() {
    super()
    this.Auth = new Auth;
    this.state = {
      portfolios: [],
      portfolioId: 0,
      token: localStorage.getItem('token'),
      showModal: false,
      name: ''
    }
    this.handleFetchData = this.handleFetchData.bind(this)
    this.createPort = this.createPort.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount() {
    this.handleFetchData()
  }

  handleFetchData(){
    let token = localStorage.getItem('token')
    axios.get('/api/getUserData', {headers: {authorization:token}})
    .then(reply => this.setState({portfolios: reply.data}))
    .catch(err => console.log(err, 'error'))
  }

  createPort(name) {
    let token = localStorage.getItem('token')
    axios.post('/api/createPortfolio', { name }, {headers: {authorization:token}})
      .then(result => {
        let portfolios = this.state.portfolios;
        portfolios.push(result.data)
        this.setState({ portfolios })
      })
      .catch(err => console.log(err))
  }

  close() {
    this.setState({ showModal: false })
  }

  open() {
    this.setState({ showModal: true })
  }

  handleChange(e) {
    let temp = e.target.name;
    this.setState({
      [temp]: e.target.value
    })
  }

  handleKeyPress(event) {
    if(event.key == 'Enter'){
      this.createPort(this.state.name)
      this.close()
    }
  }

  handleSubmit() {
    this.createPort(this.state.name)
    this.close()
  }
  
  render() {
    return (
      <div>
        <Signup fetch={this.handleFetchData}/>
        <Login fetch={this.handleFetchData}/>

        <div className="container text-center">
          <Button className="text-center" bsStyle="primary" bsSize="large" onClick={this.open}>&#43; Create Portfolio</Button>
        </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create portfolio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Portfolio name:</h4>
            <input name="name" onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" />
            
            <hr />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Submit</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <div className="container">
          <div className="row">
            {this.state.portfolios.map((item, index) => (
              <Link key={index} to={{pathname:`/simulator/${item.id}`, state: this.state.portfolios}} >
                <div className="col-xs-4 text-center port-list-div">
                  <button className="btn btn-default btn-lg port-list-btn">{item.name}</button>
                </div>
              </Link>
            ))}
          </div>
        </div>  
      </div>
    )
  }
}