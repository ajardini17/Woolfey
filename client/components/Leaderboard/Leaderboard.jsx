import React from 'react'
import LeaderboardEntry from './LeaderboardEntry.jsx'
import Navbar from '../Navbar.js'
import axios from 'axios'
<<<<<<< f011ac7dcb56a8bc879e0b6e224cada06df9d331
import {Tab, Tabs} from 'react-bootstrap'
=======
import {Modal, Button} from 'react-bootstrap'
>>>>>>> added delete portfolio button, can click portfolio in leaderboard for more info, transactionHistory routes coming together

export default class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = {
      entries: []
    }
    this.fetchLeaderboards = this.fetchLeaderboards.bind(this)

  }

  componentWillMount() {
    this.fetchLeaderboards();
  }

  fetchLeaderboards(){
    axios.get('/api/fetchCurrentLeaderboard')
    .then(reply => {
      this.setState({
        entries: reply.data
      })
    })
  }
  
 
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <Navbar />
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <h1 style={{'marginTop':'100px'}} className='text-center'>Leaderboards</h1>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              
              <Tab eventKey={1} title="Total Value">
                <table className='table-responsive table-hover leaderboardTable' style={{'marginTop':'10px'}}>
                  <tbody>
                    <tr>
                      <th style={{ 'textAlign':'center' }}>Rank</th>
                      <th style={{ 'textAlign':'center' }}>Username</th>
                      <th style={{ 'textAlign':'center' }}>portfolio name</th>
                      <th style={{ 'textAlign':'center' }}>Value</th>
                    </tr>

                    {this.state.entries.length > 0 ?
                    this.state.entries.map((item, index) => (
                      <LeaderboardEntry item={item} key={index} index={index}  /> 
                    ))
                    :
                    null
                    }
                  </tbody>
                </table>
              </Tab>
              <Tab eventKey={2} title="Hourly Gain">
                
              </Tab>
              <Tab eventKey={3} title='Monthly Gain'>

              </Tab>

            </Tabs>
            
          </div>
        </div>
      </div>

    )
  }
}

