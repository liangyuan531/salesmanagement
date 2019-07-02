import React from 'react';

class FormInput extends React.Component {
  deleteInput = () => {
    this.props.delete(this.props.key);
  }
  render(){
    return(
      <div className="form-row" id="items">
        <div className="col">
          <input type="text" className="form-control" id="itemName" name="itemName" placeholder="Name" required />
        </div>
        <div className="col">
          <input type="text" className="form-control" id="salePrice" name="salePrice" placeholder="Sale price" required />
        </div>
        <div className="col">
          <input type="text" className="form-control" id="purchasePrice" name="purchasePrice" placeholder="Purchase Price" required />
        </div>
        <div className="col">
          <input type="text" className="form-control" id="amount" name="amount" placeholder="Amount" required />
        </div>
        <div className="col-sm-1">
          <button id="deleteInput" onClick={this.deleteInput}><img src="../source/x-circle.svg"></img></button>
        </div>
      </div>
    )
  }  
}

export default FormInput;