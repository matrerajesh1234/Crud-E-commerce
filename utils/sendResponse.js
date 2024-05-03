export function sendResponse(res, statusCode, message, data) {
  if (statusCode >= 300) {
    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }

  if (!data) {
    return res.status(statusCode).json({
      success: true,
      message: message,
    });
  }

  return res.status(statusCode).json({
    success: true,
    message: message,
    data,
  });
}
