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

    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label for="user">User</label>
                    <input type="text" name="username" className="form-control" id="user" placeholder="User name" />
                  </div>
                  <div className="form-group">
                    <label for="receiver">Receiver</label>
                    <input type="text" name="receiver" className="form-control" id="receiver" placeholder="Receiver name" />
                  </div>
                  <div className="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" name="phone" className="form-control" id="phone" placeholder="Phone Number" />
                  </div>
                  <div className="form-group">
                    <label for="address">Address</label>
                    <input type="text" name="address" className="form-control" id="address" placeholder="Address" />
                  </div>
                  <div className="form-group">
                    <label for="address">VIP</label>
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
                  <div className="form-group">
                    <label for="items">Items</label>
                    {this.state.itemInputs.map(itemInput => {
                        return <FormInput />
                    })}
                  </div>
                  <button onClick={this.appendInput}>
                   Add Item
                  </button>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddRecord;