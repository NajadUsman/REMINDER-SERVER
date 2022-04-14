const { use } = require("express/lib/application");
const { status } = require("express/lib/response");
// import jsonwebtoken
const jwt = require("jsonwebtoken");

// import User model

const db = require("./db");


// register definition

const register = (uid, password, uname) => {
  // asynchronous

  return db.User.findOne({ uid }).then((user) => {
    if (user) {
      return {
        statusCode: 422,
        status: false,
        message: "already exist !!! please log in",
      };
    } else {
      const newUser = new db.User({
        uid,
        uname,
        password,
        record: [],
      });
      newUser.save();
      return {
        statusCode: 200,
        status: true,
        message: "successfully registered",
      };
    }
  });
};

// login definition
const login=(uid,password)=>{
    return db.User.findOne({uid,password}).then((user)=>{
        if(user){
          cUid=uid
          // console.log(user);
          currentUser=user.uname

          // token generation
          const token=jwt.sign({
            cUid:uid
          },'privatekey123')
            return {
                statusCode: 200,
                status: true ,
                message: "login successfully",
                cUid,
                currentUser,
                token
              };

        }
        else {
            return {
              statusCode: 422,
              status: false,
              message: "incorect password or User Id",
            };
          }

    })
 }


 const addEvent=(uid,date,desc)=>{
  //  asynchronous
  return db.User.findOne({uid})
  .then(user=>{
    if(user){
      user.record.push({
        date,
        desc
      })
      user.save()
      return{
        
        statusCode: 200,
        status: true ,
        message: "Event Added successfully",

      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "incorect password or User Id",
      };
    }
  })
 }




 const history=(uid)=>{
   return db.User.findOne({uid})
   .then(user=>{
     if(user){   return{
        
      statusCode: 200,
      status: true ,
      history:user.record,

    }


     }
     else {
      return {
        statusCode: 422,
        status: false,
        message: "user doesnot exist",
      };
    }
   })
 }



module.exports = {
    register,
    login,
    addEvent,
    history
}
