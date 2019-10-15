'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var statusService = require('../services/status.service');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////
const { Estatus } = require('../models'); // Sequelize

// Module Name
const MODULE_NAME = '[Status Controller]';

// Error Messages
const ST_CT_ERR_STATUS_NOT_FOUND = 'Status not found';

// Success Messages
const ST_CT_ERR_DELETED_SUCCESSFULLY = 'Status deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getStatus(req, res) {
  try {
    console.log("getStatus...");
    console.log(Estatus);
    Estatus.findAll({
    /*include: [{
    model: orderstatus
    }]
    include: [{ all: true, nested: true }]*/
    })
    .then((consoles) => {
    console.log(consoles);
    res.status(200).send(consoles);
    //utils.writeJson(res, consoles);
    }, (error) => {
    res.status(500).send(error);
    });
    } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getStatus.name, error, res);
  }
}

function createStatus(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allowstatus-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  try {
  console.log("params : ");
  var mystatus = req.body;
  console.log("createStatus ... " + mystatus);
  return Estatus
  .create({
  id_estatus: mystatus.id_estatus,
  descripcionEstatus: mystatus.descripcionEstatus,
  }, {
  /* include: [{
  model: order_detail,
  as: 'orderdetail'
  }] */
  })
  .then((mystatus) => {
  res.status(201).send(mystatus);
  })
  .catch((error) => res.status(400).send(error));
  } catch (error) {
  console.log("Was an error");
  controllerHelper.handleErrorResponse(MODULE_NAME, createStatus.name, error, res);
  }
}

function getStatusById(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {
    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
    console.log("getStatusById by id..." + id);
    //console.log(status);

    Estatus.findByPk(id)
    .then(mystatus => {
      console.log(mystatus);
      res.status(200).send(mystatus);
    })
  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getStatusById.name, error,res);
  }
}

function updateStatus(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
    console.log("params : " + id);
    var myupdatestatus = req.body;
    console.log("update status ... " + myupdatestatus.name + " " +
    myupdatestatus.descripcion);
    Estatus.findByPk(id)
    .then(mystatus => {
    console.log("Result of findById: " + mystatus);
    if (!mystatus) {
      res.status(401).send(({}));
    }
    return mystatus
    .update({
    id_estatus: myupdatestatus.id_estatus,
    descripcionEstatus: myupdatestatus.descripcionEstatus
    })
    .then(() => res.status(200).send(mystatus) )
    .catch(error => res.status(403).send(mystatus));
    })
    .catch(error => {
    console.log("There was an error: " + error);
    //resolve(error);
    });
  } catch (error) {
  console.log("Was an error");
  controllerHelper.handleErrorResponse(MODULE_NAME, updateStatus.name, error, res);
  }
}

function deleteStatus(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
    Estatus.findByPk(id)
    .then(mystatus => {
    console.log("Result of findById: " + mystatus);
    if (!mystatus) {
    res.status(200).send({"success": 0, "description":"not found !"});
    }
    else {
      return mystatus
      .destroy()
      .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
      .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
    console.log("There was an error: " + error);
  });
}

module.exports = {
  getStatus,
  createStatus,
  getStatusById,
  updateStatus,
  deleteStatus,
  ST_CT_ERR_STATUS_NOT_FOUND,
  ST_CT_ERR_DELETED_SUCCESSFULLY,
  MODULE_NAME
}