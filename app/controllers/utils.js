export function errHandler(res) {
  return (err) => {
    res.status(400).json(err);
  }
}

export function dataHandler(res) {
  return (data) => {
    res.json(data);
  }
}
