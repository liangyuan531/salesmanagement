import React from 'react'
import FormInput from './FormInput'

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
    handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.targer);
      console.log(data); 
    }
    render() {
        return(
            <div className="addRecord">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label for="user" className="col-sm-2 col-form-label">User</label>
                    <div className="col-sm-10">
                      <input type="text" name="username" className="form-control" id="user" placeholder="User name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="receiver" className="col-sm-2 col-form-label">Receiver</label>
                    <div className="col-sm-10">
                      <input type="text" name="receiver" className="form-control" id="receiver" placeholder="Receiver name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="phone" className="col-sm-2 col-form-label">Phone Number</label>
                    <div className="col-sm-10">
                      <input type="text" name="phone" className="form-control" id="phone" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="address" className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                      <input type="text" name="address" className="form-control" id="address" placeholder="Address" />
                    </div>
                  </div>
                  <div className="form-group">
                    <legend class="col-form-label col-sm-2 pt-0">VIP</legend>
                    <div className="col-sm-10">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="isVip" id="isVip" defaultChecked />
                        <label className="form-check-label" for="isVip">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="isVip" id="notVip" defaultChecked />
                        <label className="form-check-label" for="notVip">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="items" className="col-sm-2 col-form-label">Items</label>
                    <div className="col-sm-10">
                      {this.state.itemInputs.map(() => (
                          <FormInput />
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

export default AddRecord;