export function asyncMW(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}
