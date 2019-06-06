import React from 'react';

function FormInput() {
    return(
        <div class="form-row" id="items">
          <div class="col-md-4 mb-3">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" required />
          </div>
          <div class="col-md-4 mb-3">
            <label for="saleprice">Sale Price</label>
            <input type="text" class="form-control" id="saleprice" name="saleprice" required />
          </div>
          <div class="col-md-4 mb-3">
            <label for="purchaseprice">Last name</label>
            <input type="text" class="form-control" id="purchaseprice" name="purchaseprice" required />
          </div>
          <div class="col-md-4 mb-3">
            <label for="amount">Amount</label>
            <input type="text" class="form-control" id="amount" name="amount" required />
          </div>
        </div>
    )
}

export default FormInput;