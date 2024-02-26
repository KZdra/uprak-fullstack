'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);
    app.route('/tampil')
    .get(jsonku.tampil);
    app.route('/tampil/:id')
    .get(jsonku.tampilId);
    app.route('/tambah')
    .post(jsonku.tambahData);
    app.route('/edit/:id')
    .put(jsonku.editData);
    app.route('/patch/:id')
    .patch(jsonku.patchData);
    app.route('/delete/:id')
    .delete(jsonku.deleteData);
  app.route("/register").post(jsonku.register);
  app.route("/login").post(jsonku.login);

}
