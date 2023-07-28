export const getUsers = async (page = 1, result = 10) => {
  //   debugger;
  const data = await fetch(
    `https://randomuser.me/api/?results=${result}&page=${page}&seed=abc`
  )
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
  return data;
};
