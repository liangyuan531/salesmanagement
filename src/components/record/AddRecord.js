import React from 'react'
import FormInput from './FormInput'
import { connect } from 'react-redux'
import { addRecord } from '../../redux/actions/recordsAction'

class AddRecord extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          itemInputs: ['item-0']
      }
    }
    appendInput = () => {
      var newInput = `item-${this.state.itemInputs.length}`;
      this.setState({
          itemInputs: [...this.state.itemInputs, newInput]
      })
    }

    deleteInput = (id) => {
      this.setState({
        itemInputs: this.state.itemInputs.filter(input=>{
          return input !== id;
        })
      })
    }
    
    handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const records = [...data.entries()];
      let record = this.constructInput(records);
      let result = this.props.addRecord(record);
      result.then(res=>{
        console.log("add...", res);
        if(res.success === true) {
          alert("add record successfully");
          this.props.history.push('/records');
        }
      })
      
    }

    constructInput = (records) => {
      let record = {};
      // process input data, extract data except items
      for(let i=0;i<5;i++) {
          record[records[i][0]] = records[i][1];
      }
      let items = [];
      let item = {};
      // process items, add them into an array
      for(let i=5;i<records.length;i++) {
          item[records[i][0]] = records[i][1];
          if(records[i][0] === 'amount'){
              items.push(item);
              item = {}
          }
      }
      // add items to record
      record['items'] = items;
      return record;
    }
    
    render() {
        return(
            <div className="add-record">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">User</label>
                    <div className="col-sm-10">
                      <input type="text" name="username" className="form-control" id="user" placeholder="User name" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Receiver</label>
                    <div className="col-sm-10">
                      <input type="text" name="receiver" className="form-control" id="receiver" placeholder="Receiver name" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Phone Number</label>
                    <div className="col-sm-10">
                      <input type="text" name="phone" className="form-control" id="phone" placeholder="Phone Number" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                      <input type="text" name="address" className="form-control" id="address" placeholder="Address" required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <legend className="col-form-label col-sm-2 pt-0">VIP</legend>
                    <div className="col-sm-10">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="isVip" id="isVip" value="yes"/>
                        <label className="form-check-label">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="isVip" id="notVip" value="no" defaultChecked />
                        <label className="form-check-label">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-form-label">Items</label>
                    <div className="col-sm-10">
                      {this.state.itemInputs.map((itemInput) => (
                          // pass itemInput to FormInput as props to determine which to delete
                          <FormInput key={itemInput} inputs={itemInput} delete={this.deleteInput}/>
                      ))}
                    </div>
                    <button id="addItemBtn" className="btn btn-primary" onClick={this.appendInput}>
                     Add Item
                    </button>
                  </div>         
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addRecord })(AddRecord);