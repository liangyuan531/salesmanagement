import React from 'react';

function FormInput() {
    return(
        <div class="form-row" id="items">
          <div class="col-md-4 mb-3">
            <label for="itemName">Name</label>
            <input type="text" class="form-control" id="itemName" name="itemName" required />
          </div>
          <div class="col-md-4 mb-3">
            <label for="salePrice">Sale Price</label>
            <input type="text" class="form-control" id="salePrice" name="salePrice" required />
          </div>
          <div class="col-md-4 mb-3">
            <label for="purchasePrice">Last name</label>
            <input type="text" class="form-control" id="purchasePrice" name="purchasePrice" required />
          </div>
          <div class="col-md-4 mb-3">
            <label for="amount">Amount</label>
            <input type="text" class="form-control" id="amount" name="amount" required />
          </div>
        </div>
    )
}

export default FormInput;