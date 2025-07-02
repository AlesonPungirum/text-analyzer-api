exports.getHealthStatus = (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
};
