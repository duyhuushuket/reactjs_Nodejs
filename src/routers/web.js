import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about-us', (req, res) => {
    return res.send('About us');
  });
  router.get('/get-crud', homeController.getCrud);
  router.post('/add-user', homeController.addUser);
  router.get('/user', homeController.getUsers);
  router.get('/edit-user', homeController.getEditUser);
  router.post('/save-user', homeController.saveUser);
  router.get('/delete-user', homeController.deleteUser);
  router.post('/api/login', userController.loginUser);
  router.get('/api/list-user', userController.listUsers);

  return app.use("/", router);
};
module.exports = initWebRoutes;