const Joi = require('joi');

const subtitleSchema = Joi.object({
  filename: Joi.string().required(),
  filler: Joi.boolean().required(),
  episode: Joi.number().integer().required(),
  season: Joi.number().integer().required(),
  showName: Joi.string().required(),
  language: Joi.string().required(),
  releaseGroup: Joi.string().allow('', null)
});

const dialogSchema = Joi.object({
  subtitleId: Joi.string().required(),
  text: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  name: Joi.string().allow('', null)
});

const validateSubtitle = (req, res, next) => {
  const { error } = subtitleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateDialog = (req, res, next) => {
  const { error } = dialogSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateSubtitle, validateDialog };