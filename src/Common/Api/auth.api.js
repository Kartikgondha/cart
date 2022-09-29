import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
    signInWithPopup
  } from "firebase/auth";
import { auth } from "../../Firebase";

  export const signupApi = (values) => {
    console.log("signupApi", values);
  
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
  
          onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user.emailVerified) {
              resolve({ payload: "email registerd" });
            } else {
              sendEmailVerification(user)
                .then(() => {
                  resolve({ payload: "please verified email" });
                })
                .catch((e) => { 
                })
              
            }
          });
        })
        // .then((user) => {
        //   onAuthStateChanged(auth, (user) => {
        //     if (user.emailVerified) {
        //       resolve({ payload: "email registerd" });
        //     } else {
        //       resolve({ payload: "please verified email" });
        //     }
        //   });
        // })
  
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
            reject({ payload: "already use email" });
          } else {
            reject({ payload: errorCode });
          }
        });
    });
  };
  
  export const signinApi = (values) => {
    console.log("signinApi", values);
  
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            resolve({ payload: user});
          } else {
            reject({ payload: "First Verified email" });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode.localeCompare("auth/user-not-found") === 0) {
            reject({ payload: "Do not match email & password" });
          } else {
            reject({ payload: errorCode });
          }
        });
    });
  };
  
  export const logoutApi = () => {
    return new Promise((resolve, reject)=>{
      signOut(auth)
      .then(()=>{
        resolve({ payload: "Logged out successfully" });
      })
      .catch((error)=>{
        reject({ payload: error.errorCode});
      })
    })
  }
  
  export const GoogleLoginApi = ()=>{
    return new Promise((resolve, reject)=>{
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
     
      const user = result.user;
  
      resolve({ payload: user });
     
    }).catch((error) => {
     
      const errorCode = error.code;
      const errorMessage = error.message;
     
      const email = error.customData.email;
    
      const credential = GoogleAuthProvider.credentialFromError(error);
  
      reject({ payload : errorCode})
    
    });
    })
  }
  
  export const ForgotPassswordApi=(values)=>{
    console.log("ForgotPassswordApi", values)
    return new Promise((resolve, reject)=>{
      sendPasswordResetEmail(auth, values.email)
    .then(() => {
      resolve({payload: "please check your email"})
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      reject({payload : errorCode})
    });
    })
  }