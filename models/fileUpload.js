module.exports =(sequelize, dataTypes)=> {
    const fileUpload = sequelize.define("fileUpload", {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name:{
          type:dataTypes.STRING,
          allowNull:false,
      },
      size : {
        type: dataTypes.STRING,
        allowNull: false,
      },
    });
    return fileUpload
  }