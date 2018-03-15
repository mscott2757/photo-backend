export function errHandler(res) {
  return (err) => {
    res.json(err);
  }
}

export function dataHandler(res) {
  return (data) => {
    res.json(data);
  }
}
