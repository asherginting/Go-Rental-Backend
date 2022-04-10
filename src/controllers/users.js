const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const helperGet = require('../helpers/get');
const response = require('../helpers/response');
const upload = require('../helpers/upload').single('image');
const deleteImg = require('../helpers/deleteImg');
const check = require('../helpers/check');
const mail = require('../helpers/codeMail');

const { APP_EMAIL } = process.env;

const getUsers = (req, res) => {
  helperGet(req, res, userModel.getUsers, userModel.countUsers, 'users');
};

const getUser = (req, res) => {
  const { id } = req.params;
  userModel.getUser(id, (results) => {
    if (results.length > 0) {
      return response(req, res, `User with id ${id}`, results[0]);
    }
    return response(req, res, `User with id ${id} not found`, null, null, 404);
  });
};

// WITHOUT PHONENUMBER

// const addUser = (req, res) => {
//   const {
//     name, username, email, password,
//   } = req.body;
//   if (name && username && email && password) {
//     if (!check.checkEmail(email)) {
//       return response(req, res, 'Wrong email input', null, null, 400);
//     }
//     // if (!check.checkPhone(phone_number)) {
//     //   return response(req, res, 'Wrong phone number input', null, null, 400);
//     // }
//     if (!check.checkPassword(password)) {
//       return response(req, res, 'Password must be at least 6 characters must contain numeric lowercase and uppercase letter.', null, null, 400);
//     }
//     const dataCheck = {
//       username, email,
//     };
//     return userModel.checkUser(dataCheck, async (user) => {
//       if (user.length > 0) {
//         return response(req, res, 'User name or email has been registered', null, null, 400);
//       }
//       const randomCode = Math.round(Math.random() * (9999 - 1000) + 1000);
//       mail.sendMail({
//         from: APP_EMAIL,
//         to: email,
//         subject: 'Registration verification code | Vehicles Rent',
//         text: String(randomCode),
//         html: `<b>${randomCode}<b>`,
//       });
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(password, salt);
//       const data = {
//         name, username, email, password: hash, confirm: randomCode,
//       };
//       return userModel.addUser(data, (rslt) => {
//         if (rslt.affectedRows === 0) {
//           return response(req, res, 'Unexpected error', null, null, 500);
//         }
//         userModel.newUser(rslt.insertId, (results) => response(req, res, `Verification code has been sent to ${email}`, results[0]));
//       });
//     });
//   }
//   return response(req, res, 'Failed to create user, data must be filled', null, null, 400);
// };

// WITHOUT NAME

const addUser = (req, res) => {
  const {
    username, email, password, phone_number, name,
  } = req.body;
  if (username && email && password) {
    if (!check.checkEmail(email)) {
      return response(req, res, 'Wrong email input', null, null, 400);
    }
    if (!check.checkPassword(password)) {
      return response(req, res, 'Password must be at least 6 characters must contain numeric lowercase and uppercase letter.', null, null, 400);
    }
    const dataCheck = {
      username, email, phone_number,
    };
    return userModel.checkUser(dataCheck, async (user) => {
      if (user.length > 0) {
        return response(req, res, 'User name or phone or email has been registered', null, null, 400);
      }
      // const randomCode = Math.round(Math.random() * (9999 - 1000) + 1000);
      // mail.sendMail({
      //   from: APP_EMAIL,
      //   to: email,
      //   subject: 'Registration verification code | Vehicles Rent',
      //   text: String(randomCode),
      //   html: `<b>${randomCode}<b>`,
      // });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      let data = {
        username, email, password: hash, phone_number, confirm: false,
      };
      if (phone_number) {
        if (!check.checkPhone(phone_number)) {
          return response(req, res, 'Wrong phone number input', null, null, 400);
        }
        data = { ...data, phone_number };
      }
      if (name) {
        const randomCode = Math.round(Math.random() * (9999 - 1000) + 1000);
        mail.sendMail({
          from: APP_EMAIL,
          to: email,
          subject: 'Registration verification code | Vehicles Rent',
          text: String(randomCode),
          html: `<b>${randomCode}<b>`,
        });
        data = { ...data, name, confirm: randomCode };
      }
      return userModel.addUser(data, (rslt) => {
        if (rslt.affectedRows === 0) {
          return response(req, res, 'Unexpected error', null, null, 500);
        }
        userModel.newUser(rslt.insertId, (results) => response(req, res, `Verification code has been sent to ${email}`, results[0]));
      });
    });
  }
  return response(req, res, 'Failed to create user, data must be filled', null, null, 400);
};

// COMPLETE ADDUSER

const addUserComplete = (req, res) => {
  const {
    name, username, email, password, phone_number,
  } = req.body;
  if (name && username && email && password && phone_number) {
    if (!check.checkEmail(email)) {
      return response(req, res, 'Wrong email input', null, null, 400);
    }
    if (!check.checkPhone(phone_number)) {
      return response(req, res, 'Wrong phone number input', null, null, 400);
    }
    if (!check.checkPassword(password)) {
      return response(req, res, 'Password must be at least 6 characters must contain numeric lowercase and uppercase letter.', null, null, 400);
    }
    const dataCheck = {
      username, email, phone_number,
    };
    return userModel.checkUser(dataCheck, async (user) => {
      if (user.length > 0) {
        return response(req, res, 'User name or phone or email has been registered', null, null, 400);
      }
      const randomCode = Math.round(Math.random() * (9999 - 1000) + 1000);
      mail.sendMail({
        from: APP_EMAIL,
        to: email,
        subject: 'Registration verification code | Vehicles Rent',
        text: String(randomCode),
        html: `<b>${randomCode}<b>`,
      });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const data = {
        name, username, email, password: hash, phone_number, confirm: randomCode,
      };
      return userModel.addUser(data, (rslt) => {
        if (rslt.affectedRows === 0) {
          return response(req, res, 'Unexpected error', null, null, 500);
        }
        userModel.newUser(rslt.insertId, (results) => response(req, res, `Verification code has been sent to ${email}`, results[0]));
      });
    });
  }
  return response(req, res, 'Failed to create user, data must be filled', null, null, 400);
};

const editAllDataUser = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return response(req, res, err.message, null, null, 400);
    }
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    if (user.length !== 1) {
      return response(req, res, 'User not available', null, null, 404);
    }
    const {
      name, username, email, phone_number, address, birthdate,
    } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    if (image === undefined) {
      return response(req, res, 'Image not selected', null, null, 400);
    }

    if (name && username && image && email && phone_number && address && birthdate) {
      if (check.checkPhone(phone_number)) {
        if (check.checkEmail(email)) {
          if (check.checkDate(birthdate)) {
            const resImage = image.replace(/\\/g, '/');
            const data = {
              name, username, image, email: resImage, phone_number, address, birthdate,
            };
            const pastUser = await userModel.getUserById(id);
            return userModel.editUser(data, id, (results) => {
              if (results.affectedRows > 0) {
                deleteImg.rm(pastUser);
                return userModel.getUser(id, (rslt) => response(req, res, 'Successfully updated user', rslt[0]));
              }
              return response(req, res, 'Unexpected error', null, null, 500);
            });
          }
          return response(req, res, 'Wrong birthdate input. Format birthdate YYYY-MM-DD', null, null, 400);
        }
        return response(req, res, 'Wrong email input', null, null, 400);
      }
      return response(req, res, 'Wrong phone number input', null, null, 400);
    }
    return response(req, res, `Failed to edit user with id ${id}. Some data is empty.`, null, null, 400);
  });
};

const editUser = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return response(req, res, err.message, null, null, 400);
    }
    // const { id } = req.params;
    const { id } = req.user;
    const user = await userModel.getUserById(id);
    if (user.length !== 1) {
      return response(req, res, 'User not available', null, null, 404);
    }
    let image;
    if (req.file) {
      image = req.file.path.replace(/\\/g, '/');
    }
    const {
      name, username, email, phone_number, address, birthdate, gender,
    } = req.body;

    let data = {
      name: name || user[0].name,
      username: user[0].username,
      image: image || user[0].image,
      email: user[0].email,
      phone_number: user[0].phone_number,
      address: address || user[0].address,
      birthdate: birthdate || user[0].birthdate,
      gender: gender || user[0].gender,
    };

    // if (req.file) {
    //   data.image = req.file.path.replace(/\\/g, '/');
    // }
    if (username) {
      const result = await userModel.checkUserAsync({ username });
      if (result.length > 0) {
        return response(req, res, 'User name has been used', null, null, 400);
      }
      data.username = username;
    }
    if (email) {
      if (!check.checkEmail(email)) {
        return response(req, res, 'Wrong email input', null, null, 400);
      }
      const result = await userModel.checkUserAsync({ email });
      if (result.length > 0) {
        return response(req, res, 'Email has been used', null, null, 400);
      }
      data.email = email;
    }
    if (phone_number) {
      if (!check.checkPhone(phone_number)) {
        return response(req, res, 'Wrong phone number input', null, null, 400);
      }
      const result = await userModel.checkUserAsync({ phone_number });
      if (result.length > 0) {
        return response(req, res, 'phone number has been used', null, null, 400);
      }
      data.phone_number = phone_number;
    }
    if (birthdate) {
      if (!check.checkDate(birthdate)) {
        return response(req, res, 'Wrong birthdate input. Format birthdate YYYY-MM-DD', null, null, 400);
      }
      data.phone_number = phone_number;
    }
    return userModel.editUser(data, id, async (edited) => {
      if (edited.affectedRows > 0) {
        if (req.file) {
          deleteImg.rm(user);
        }
        const results = await userModel.getUserById(id);
        return response(req, res, 'Data user', results);
      }
      return response(req, res, 'Unexpected error', null, null, 500);
    });
    // console.log(id);
    // res.json('test');
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.getUser(id, (rslt) => {
    userModel.deleteUser(id, (results) => {
      if (results.affectedRows > 0) {
        return response(req, res, `User with id ${id} successfully deleted`, rslt[0]);
      }
      return response(req, res, `Failed to delete user with id ${id}`, null, null, 400);
    });
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  addUserComplete,
  editAllDataUser,
  editUser,
  deleteUser,
};
