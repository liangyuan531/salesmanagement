import React from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../../redux/actions/recordsAction'

class UpdateRecordItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          record: this.props.getRecordById(this.props.recordId),
          items: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const items = [...data.entries()];
        console.log(`items: ${items}`);


    }

    handleInputChange = (e) => {
        this.setState({
          
        })
    }
    render() {
        let items = this.props.record.items;
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                  {items ? items.map(item => (
                    <div key={item._id}>
                      <input type="hidden" name="itemId" value={item._id}/>
                      <div className="form-group">
                        <label className="col-sm-2 col-form-label">Item Name</label>
                        <div className="col-sm-10">
                          <input type="text" name="itemName" className="form-control" 
                                  id="itemName" value={item.itemName}
                                  onChange={this.handleInputChange}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 col-form-label">Purchase Price</label>
                        <div className="col-sm-10">
                          <input type="text" name="purchasePrice" className="form-control" 
                                  id="purchasePrice" value={item.purchasePrice}
                                  onChange={this.handleInputChange}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 col-form-label">Sale Price</label>
                        <div className="col-sm-10">
                          <input type="text" name="salePrice" className="form-control" 
                                  id="salePrice" value={item.salePrice}
                                  onChange={this.handleInputChange}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 col-form-label">Amount</label>
                        <div className="col-sm-10">
                          <input type="text" name="amount" className="form-control" 
                                  id="amount" value={item.amount}
                                  onChange={this.handleInputChange}/>
                        </div>
                      </div>        
                    </div>    
                  )) : <></>}
                  <button type="submit" className="btn btn-primary">Update Items</button> 
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    record: state.records.record
})


export default connect(mapStateToProps, {getRecordById})(UpdateRecordItems);