const User = require('./user.model');
const fs = require('fs');

function writeFileAsync(filename, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('data.txt', 'abc', function (err) {
            if (err) {
                return reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
    return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @property {string} req.body.gender - The gender of user.
 * @property {string} req.body.phone - The phone of user.
 * @property {string} req.body.dateOfBirth - The dateOfBirth of user.
 * @returns {User}
 */

async function create(req, res, next) {

    let result = {
        status: 'success'
    }

    try {
        // let user = await User.findOne({
        //     username: req.body.username
        // });

        // if (user) {
        //     result.status = 'error';
        //     result.msg = 'email user '
        // }
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            result.status = 'error';
            result.msg = 'user existed';
        }
        else {
            try {
                let user = await User.findOne({
                    email: req.body.email
                });

                if (user) {
                    result.status = 'error';
                    result.msg = 'email existed';
                } else {
                    user = new User({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        // firstName: req.body.firstName,
                        // lastName: req.body.lastName,
                        // gender: req.body.gender,
                        // phone: req.body.phone,
                        // dateOfBirth: req.body.dateOfBirth
                    });
                    await user.save();
                    result.data = user;

                    await writeFileAsync('userData.txt', JSON.stringify(user));
                }
            } catch (e) {
                console.log('create error', e);
                result.status = 'error'
            }


        }
    }
    catch (e) {
        console.log('create error', e);
        result.status = 'error'
    }
    finally {
        res.json(result);
    }
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @property {string} req.body.gender - The gender of user.
 * @property {string} req.body.phone - The phone of user.
 * @property {string} req.body.dateOfBirth - The dateOfBirth of user.
 * @returns {User}
 */

async function update(req, res, next) {

    let result = {
        status: 'success'
    }

    try {
        console.log(req.params)
        let user = await User.findOne({
            _id: req.params.userId
        });

        console.log(user);

        if (!user) {
            result.status = 'error';
            result.msg = 'user does not exist';
        }
        else {
            user = req.user;
            // user.email = user.email;
            // user.password = req.body.password;
            // user.fullname = req.body.fullname;
            // user.gender = req.body.gender;
            
            user.username = user.username;
            user.password = req.body.password;
            user.email= req.body.email;
            user.firstName= req.body.firstName;
            user.lastName= req.body.lastName;
            user.gender= req.body.gender;
            user.phone= req.body.phone;
            user.dateOfBirth = req.body.dateOfBirth;

            await user.save();
            result.data = {
                username,
                email,
                fullname
            };
        }
    }
    catch (e) {
        console.log('update error', e);
        result.status = 'error'
    }
    finally {
        res.json(result);
    }
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

async function listNameUser(req, res, nex) {
    let result = {
        status: 'success'
    }
    try {
        let user = await User.find({}, 'username');
        res.json(user);
    } catch {
        result.status = 'error';
    }
}

async function listUserGender(req, res, nex) {
    let result = {
        status: 'success'
    }
    try {
        let user = await User.find({ 
            gender: 'Nam'
         });
        res.json(user);
    } catch {
        result.status = 'error';
    }
}
/**
 * Delete user.
 * @returns {User}
 */
async function remove(req, res, next) {

    let result = {
        status: 'success'
    }

    try {
        console.log(req.params)
        let user = await User.findOne({
            _id: req.params.userId
        });

        console.log(user);

        if (!user) {
            result.status = 'error';
            result.msg = 'user does not exist';
        }
        else {
            await user.remove();
        }
    }
    catch (e) {
        console.log('Delete error', e);
        result.status = 'error'
    }
    finally {
        res.json(result);
    }
}

module.exports = { load, get, create, update, listNameUser, listUserGender, list, remove };
