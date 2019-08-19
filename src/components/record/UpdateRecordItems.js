import React from 'react'
import FormInput from './FormInput'
import { connect } from 'react-redux'
import { getRecordById, updateItems } from '../../redux/actions/recordsAction'
import { withRouter } from 'react-router-dom'

class UpdateRecordItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          record: this.props.getRecordById(this.props.recordId),
          items: [],
          itemInputs: []
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
        const items = [...data.entries()];
        let result = this.props.updateItems(this.props.recordId, items);
        result.then(res=>{
          console.log("update items: ", res);
          if(res.success === true) {
            alert("update record items successfully");
          }
        })
        this.props.history.push('records');
    }

    render() {
        let items = this.props.record.items;
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                  {items ? 
                    (<React.Fragment>
                      {items.map(item => (
                      <div key={item._id}>
                        <input type="hidden" name="itemId" value={item._id}/>
                        <div className="form-row">
                          <div className="col">
                            <label className="col-form-label">Item Name</label>
                            <div className="">
                              <input type="text" name="itemName" className="form-control" 
                                      id="itemName" defaultValue={item.itemName}
                                      onChange={this.handleInputChange}/>
                            </div>
                          </div>
                          <div className="col">
                            <label className="col-form-label">Purchase Price</label>
                            <div className="">
                              <input type="text" name="purchasePrice" className="form-control" 
                                      id="purchasePrice" defaultValue={item.purchasePrice}
                                      onChange={this.handleInputChange}/>
                            </div>
                          </div>
                          <div className="col">
                            <label className="col-form-label">Sale Price</label>
                            <div className="">
                              <input type="text" name="salePrice" className="form-control" 
                                      id="salePrice" defaultValue={item.salePrice}
                                      onChange={this.handleInputChange}/>
                            </div>
                          </div>
                          <div className="col">
                            <label className="col-form-label">Amount</label>
                            <div className="">
                              <input type="text" name="amount" className="form-control" 
                                      id="amount" defaultValue={item.amount}
                                      onChange={this.handleInputChange}/>
                            </div>
                          </div> 
                        </div>       
                      </div>    
                    ))}
                    {/* {this.state.itemInputs.map((itemInput) => (
                          // pass itemInput to FormInput as props to determine which to delete
                          <FormInput key={itemInput} inputs={itemInput} delete={this.deleteInput}/>
                      ))}
                    <button id="addItemBtn" className="btn btn-primary" onClick={this.appendInput}>
                       Add Item
                    </button><br/><br/> */}
                    <button type="submit" className="btn btn-primary">Update Items</button>
                  </React.Fragment>)
                  : 
                  <></>}
                  </form>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    record: state.records.record
})


export default withRouter( connect(mapStateToProps, {getRecordById, updateItems})(UpdateRecordItems) );