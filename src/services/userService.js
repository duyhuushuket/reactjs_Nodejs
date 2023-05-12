import db from "../models/index";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(15);
let doUserLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataResult = {};
      let resultCheck = await checkUserEmail(username);
      if (resultCheck) {
        let user = await db.User.findOne({ attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'password'], where: { email: username }, raw: true });
        let passCheck = await checkPassword(password, user.password);
        delete user['password'];
        if (passCheck) {
          dataResult.message = 'Login successful';
          dataResult.resultCode = '0000';
          dataResult.userData = user;
          resolve(dataResult);
        } else {
          dataResult.message = 'Username or Password not correct';
          dataResult.resultCode = 'E002';
          resolve(dataResult);
        }
      } else {
        dataResult.message = 'Username or Password not correct';
        dataResult.resultCode = 'E002';
        resolve(dataResult);
      }
    } catch (error) {

    }
  });
}
let checkPassword = (password, userPass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rsPass = await bcrypt.compareSync(password, userPass);
      if (rsPass) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  })
}
let checkUserEmail = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: username }, raw: true });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  })
}
let listUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll();
      let dataResult = {};
      if (users) {
        dataResult.message = 'Get list users successful';
        dataResult.resultCode = '0000';
        dataResult.userData = users;
        resolve(dataResult);
      } else {
        dataResult.message = 'Users not found';
        dataResult.resultCode = 'U001';
        resolve(dataResult);
      }
    } catch (error) {
      reject(error);
    }
  })
}
module.exports = { doUserLogin: doUserLogin, listUsers: listUsers }