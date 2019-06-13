import React from 'react';

function FormInput() {
    return(
        <div class="form-row" id="items">
          <div class="col">
            <input type="text" class="form-control" id="itemName" name="itemName" placeholder="Name" required />
          </div>
          <div class="col">
            <input type="text" class="form-control" id="salePrice" name="salePrice" placeholder="Sale price" required />
          </div>
          <div class="col">
            <input type="text" class="form-control" id="purchasePrice" name="purchasePrice" placeholder="Purchase Price" required />
          </div>
          <div class="col">
            <input type="text" class="form-control" id="amount" name="amount" placeholder="Amount" required />
          </div>
        </div>
    )
}

export default FormInput;