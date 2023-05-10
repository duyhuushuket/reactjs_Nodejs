import express from "express";
import homeController from "../controllers/homeController";
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

  return app.use("/", router);
};
module.exports = initWebRoutes;