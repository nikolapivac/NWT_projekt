import jwt from 'jsonwebtoken';

//when the user logs in, he gets a token. When he wants to do something
//(like, delete, edit a post), we need to check if his token is valid

const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]; 

      //the data we want to get from the token
      let decodedData;

      if(token){
          decodedData = jwt.verify(token, "test");
          req.userId = decodedData?.id;
      }

      //passing the action to something else
      next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;