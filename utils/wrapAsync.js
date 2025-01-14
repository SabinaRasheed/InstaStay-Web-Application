module.exports = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next); // Passes the error to the next middleware
    };
};
