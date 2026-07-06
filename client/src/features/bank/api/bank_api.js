import api from "../../../lib/axios"

export const Bank = {
  addBankDetails: (BankDetails) => api.post("/bank/addDetails", BankDetails),
};
