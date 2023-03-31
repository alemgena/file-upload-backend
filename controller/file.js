
const expressJ = require("express-jwt");
const _ = require("lodash");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const db = require("../models");
const uploadFile=require('../helper/uploadImage')
const { result } = require("lodash");
const {
  errorHandler,
  sendData,
  notifyUser,
  omitNullValues,
  omitNullValuesObj,
} = require("../_helper");

/**
 *  user auth
 */
exports.fileUpload = async (req, res) => {
  try {
    await uploadFile(req, res);
    await db.fileUpload
      .create({
        name:req.file.originalname,
        size:req.file.size
      })
      .then((result) => {
        let { dataValues } = result;
        sendData({ file: omitNullValuesObj(dataValues) }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.deleteFile = async (req, res) => {
    try {
      let { id } = req.params;
      await db.fileUpload
        .findOne({
          where: {
            id: id,
          },
        })
        .then((file) => {
          return file.destroy();
        })
        .then(() => {
          notifyUser("deletion was successful!", res);
        });
    } catch (err) {
      errorHandler("deletion was unsuccessful!", res);
    }
  };
  exports.listFiles = async (req, res) => {
    try {
      await db.fileUpload
        .findAll({
          order: [["createdAt", "DESC"]],
        })
        .then(async (files) => {
          files = omitNullValues(files);
          sendData({ files: files }, res);
        })
        .catch((err) => {
          errorHandler(err, res);
        });
    } catch (err) {
      errorHandler(err, res);
    }
  };