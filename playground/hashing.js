const {SHA256}= require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var data={
//     id:10
// };

// var token=jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);
var password='12234dfkk#';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     } )
// })
var h='$2a$10$MXQrtm8T0WJQ56RK7TmrWustxDE8dAF2lidBdty4mdGaqYCC6ZNY2';

bcrypt.compare('12234dfkk', h, (err, res)=>{
    console.log(res);
})