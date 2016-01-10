var mongoose = require('mongoose');  
var vpnSchema = new mongoose.Schema({  
  name: String,
  price: Number, 
  mac: Boolean, 
  windows: Boolean, 
  website: String,
});

mongoose.model('vpn', vpnSchema);