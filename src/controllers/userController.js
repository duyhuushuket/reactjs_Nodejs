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
module.exports = {
  loginUser: loginUser
}