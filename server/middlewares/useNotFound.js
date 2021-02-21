module.exports = function useNotFound(request, response, next) {
  if (request.method === 'OPTIONS') {
    return next();
  }

  return response.status(404).format({
    html: function() {
      return response.end();
    },
    json: function() {
      return response.json({ success: false, errors: `Method [${request.method} ${request.path}] is not supported` });
    },
    default: function() {
      return response.status(406).send('Not Acceptable');
    },
  });
};
