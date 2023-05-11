import db from '../models/index';
import CrudService from '../services/CrudService';

let getHomePage = async (req, res) => {
  // return res.send('Home page');
  try {
    let data = await db.User.findAll();
    //console.log('----------------------------------------------------');
    //console.log(data);
    return res.render('home.ejs', { data: JSON.stringify(data) });
  } catch (err) {
    console.error(err);
  }
}
let getCrud = async (req, res) => {
  return res.render('crud.ejs');
}
let addUser = async (req, res) => {
  //console.log(req.body);
  let result = await CrudService.createNewUser(req.body);
  //console.log('----------------------------------------------------');
  //console.log(result);
  return res.send('Add User');
}
let getUsers = async (req, res) => {
  //console.log(req.body);
  let result = await CrudService.getUsers();
  //console.log('----------------------------------------------------');
  //console.log(result);
  return res.render('listUsers.ejs', { data: result });
}
let getEditUser = async (req, res) => {
  let idUser = req.query.id;
  if (idUser) {
    let infoUser = await CrudService.getInfoUserById(idUser);
    return res.render('editUser.ejs', { data: infoUser });
  } else {
    return res.send("Can't found user");
  }
}
let saveUser = async (req, res) => {
  let result = await CrudService.saveUser(req.body);
  if (result) {
    return res.render('listUsers.ejs', { data: result });
  }
  return res.send('Save User');
}
let deleteUser = async (req, res) => {
  let idUser = req.query.id;
  if (idUser) {
    let result = await CrudService.deleteUser(idUser);
    if (result) {
      return res.render('listUsers.ejs', { data: result });
    }
  } else {
    return res.send("Can't found user");
  }
}

/***
 * object {
 * key:value
 * }
 */
module.exports = {
  getHomePage: getHomePage,
  getCrud: getCrud,
  addUser: addUser,
  getUsers: getUsers,
  getEditUser: getEditUser,
  saveUser: saveUser,
  deleteUser: deleteUser
}