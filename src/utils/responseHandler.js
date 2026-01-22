export const sendSuccess = (res, data, message, status = 200) =>
  res.status(status).json({ success: true, message, data });

export const sendError = (res, message, status = 400) =>
  res.status(status).json({ success: false, message });
