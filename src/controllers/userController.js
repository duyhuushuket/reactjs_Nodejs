import db from '../models/index';
import userService from '../services/userService';
let loginUser = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return res.status(500).json({
      message: 'Missing username or password',
      resultCode: 'E001',
    });
  }
  let user = await userService.doUserLogin(username, password);
  return res.status(200).json({
    resultCode: user.resultCode,
    message: user.message,
    userData: user.userData ? user.userData : ''
  });
}
let listUsers = async (req, res) => {
  let user = await userService.listUsers();
  console.log(user);
  return res.status(200).json({
    resultCode: user.resultCode,
    message: user.message,
    data: user.userData ? user.userData : ''
  });
}
module.exports = {
  loginUser: loginUser,
  listUsers: listUsers
}