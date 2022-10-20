export default function (query) {
  const now = () => {
    query("SELECT NOW() as now", [], (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  };

  return {
    now,
  };
}
