enum gender {
  male = "male",
  female = "female",
}

export type userColumn = {
  gender: gender;
  first_name: string;
  last_name: string;
  prefix: string;
  picture: string;
  date_of_birth: Date;
  email: string;
  age: number;
};

export type pagination = {
  pageIndex: number,
  pageSize: number,
};

export type Users = Array<{
  gender: gender;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  dob: {
    date: Date;
    age: number;
  };
  login: {
    uuid: string;
    username: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}>;
