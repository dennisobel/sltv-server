// Auto - Auto number
// TransactionType Varchar 40
// TransID  Varchar 40
// TransTime Varchar 40
// TransAmount double
// BusinessShortCode Varchar 15
// BillRefNumber Varchar 40
// InvoiceNumber Varchar 40
// ThirdPartyTransID Varchar 40
// MSISDN Varchar 20
// FirstName Varchar 60
// MiddleName Varchar 60
// LastName Varchar 60
// OrgAccountBalance Double 

var mongoose = require("mongoose")

mongoose.Promise = global.Promise;

var MpesaSchema = new mongoose.Schema({
	TransactionType: String,
	TransID: String,
	TransTime: String,
	TransAmount: String,
    BusinessShortCode: String,
    BillRefNumber: String,
    InvoiceNumber: String,
    ThirdPartyTransID: String,
    MSISDN: String,
    FirstName: String,
    MiddleName: String,
    LastName: String,
    OrgAccountBalance: String    
})

module.exports = mongoose.model("Mpesa", MpesaSchema)