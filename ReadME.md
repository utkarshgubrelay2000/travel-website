# Coaching
## Requirement
node js
git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone  https://github.com/utkarshgubrelay2000/EklavyaCoaching.git
cd Student.nodejs
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run start:dev
```

Open [http://localhost:4500](http://localhost:4500) and take a look around.
## Api's-->>>>>


  #### SignIn->
   ###### Request type-: Post,
   ##### Url:url/signin,
   ######  Details:  find email in UserSchema and then it  compare password with bcrypt.js..if password matchs then it send response as code:success and token which is generarted with   the help of jsonwebtoken.
   ######   Body-include-: {email:string,password:string,}
 ##### Response:{code:'signed in successfully',token:jwttoken,email,name}

  ##### important:validation applied 


   ####  SignUp->
   ###### Request type-: Post,
   ######  Url:url/signup,
   ######  Body-include-: {
   ###### name, email, mobile, password,  }
   ######  
  ###### Response:{student saved succesfully}
  ##### important:validation applied 

   ###  forgot password->
   ###### Request type-: Post,
   ######  Url:url/forgot,
   ######  Body-include-: {
   ######  email  }
   ######  
  ###### Response:{otp:otp}
 
  ####  verify-Otp->
   ###### Request type-: Post,
   ######  Url:url/verify-Otp,
   ######  Body-include-: {
   ###### otp  }
   ######  
  ###### Response:{resetToken}

 ####  reset-password->
   ###### Request type-: Post,
   ######  Url:url/reset-password,
   ######  Body-include-: {
   ###### resetToken,password  }
   ######  
  ###### Response:{"succes"}

  