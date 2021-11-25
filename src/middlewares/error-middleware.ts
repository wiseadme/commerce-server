export const errorMiddleware = (err, req, res) => {
  res.status(err.status).json(err)
}
