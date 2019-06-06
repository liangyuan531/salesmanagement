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
                  <div class="form-group">
                    <label for="user">User</label>
                    <input type="text" name="user" class="form-control" id="user" placeholder="User name" />
                  </div>
                  <div class="form-group">
                    <label for="receiver">Receiver</label>
                    <input type="text" name="receiver" class="form-control" id="receiver" placeholder="Receiver name" />
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" name="phone" class="form-control" id="phone" placeholder="Phone Number" />
                  </div>
                  <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" name="address" class="form-control" id="address" placeholder="Address" />
                  </div>
                  <div class="form-group">
                    <label for="items">Items</label>
                    {this.state.itemInputs.map(itemInput => {
                        <FormInput />
                    })}
                  </div>
                  <button onClick={this.appendInput}>
                   CLICK ME TO ADD AN INPUT
                  </button>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddRecord;