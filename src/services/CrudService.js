import bcrypt from "bcrypt";
import db from '../models/index';
const salt = bcrypt.genSaltSync(15);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newPassword = await hashPassword(data.pwd);
      await db.User.create({
        email: data.email,
        password: newPassword,
        firstName: data.fname,
        lastName: data.lname,
        address: data.address,
        gender: data.gender === '1' ? true : false,
        roleId: data.role,
        phoneNumber: data.phone,
        positionId: data.position,
        image: null,
      });
      resolve('Added user successfully');
    } catch (error) {
      reject(error);
    }
  })
}
let getUsers = async () => {
  // Promise==> tao co cái can chay. Khi nào chạy xong thì chạy tiếp các bước khác
  return new Promise(async (resolve, reject) => {
    try {
      let dataUsers = await db.User.findAll({ raw: true });
      resolve(dataUsers);
    } catch (error) {
      reject(error);
    }
  })
}
let getInfoUserById = async (idUser) => {
  // Promise==> tao co cái can chay. Khi nào chạy xong thì chạy tiếp các bước khác
  return new Promise(async (resolve, reject) => {
    try {
      let dataUser = await db.User.findOne({ where: { id: idUser }, raw: true });
      if (dataUser) {
        resolve(dataUser);
      } else {
        resolve(null);
      }

    } catch (error) {
      reject(error);
    }
  })
}
let saveUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataUser = await db.User.findOne({ where: { id: data.userId }, raw: true });
      if (dataUser) {
        await db.User.update({
          firstName: data.fname,
          lastName: data.lname,
          address: data.address,
          gender: data.gender === '1' ? true : false,
          roleId: data.role,
          phoneNumber: data.phone,
          positionId: data.position,
        }, { where: { id: data.userId }, raw: true });
        let dataUsers = await db.User.findAll({ raw: true });
        resolve(dataUsers);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  })
}
let deleteUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataUser = await db.User.findOne({ where: { id: idUser }, raw: true });
      if (dataUser) {
        await db.User.destroy({
          where: {
            id: idUser //this will be your id that you want to delete
          }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
          if (rowDeleted === 1) {
            console.log('Deleted successfully');
          }
        }, function (err) {
          console.log(err);
        });
        let dataUsers = await db.User.findAll({ raw: true });
        resolve(dataUsers);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  })
}
let hashPassword = (pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(pass, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  })
}
module.exports = {
  createNewUser: createNewUser,
  getUsers: getUsers,
  getInfoUserById: getInfoUserById,
  saveUser: saveUser,
  deleteUser: deleteUser
};