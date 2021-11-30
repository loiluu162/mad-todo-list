const { nanoid } = require('nanoid/async');

exports.generate = async () => await nanoid();
