exports.errorHandler = (err, res) =>{
  console.log("error is",err)
  if (typeof err === "string") {
    console.log("err ", err)
    // custom application error
    return res.status(200).json({ err: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(200).json({ err: "Invalid Token" });
  }

  // default to 500 server error
  // console.log('err')
  return res.status(500).json({ err: err.message });
}
