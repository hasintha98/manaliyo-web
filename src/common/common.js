export const extractUsernameFromEmail = (email) => {
  var str = email;
  var nameMatch = str.match(/^([^@]*)@/);
  var name = nameMatch ? nameMatch[1] : null;

  return name;
};

export function getNullOrUndefinedAttributes(data) {
  const nullOrUndefinedAttributes = [];
  for (const key in data) {
    if (
      data[key] === null ||
      data[key] === undefined ||
      data[key] === "" ||
      data[key] == 0
    ) {
      nullOrUndefinedAttributes.push(key);
    }
  }
  return nullOrUndefinedAttributes;
}

export function checkNullOrUndefinedAttributes(data) {
  const nullOrUndefinedAttributes = [];
  delete data.publishedAt;
  delete data.updatedAt;
  delete data.id;
  delete data.createdAt;

  for (const key in data) {
    if (
      data[key] != null &&
      data[key] != undefined &&
      data[key] != "" &&
      data[key] != 0
    ) {
      console.log(data[key]);
      return false;
    }
  }

  return true;
}

export function removeUndisfinedValuesInArray(selectArray) {
  const newData = selectArray.filter(function (element) {
    return element !== undefined;
  });

  return newData;
}

export const calculateAgeFromBday = (bday) => {
  const birthDate = new Date(bday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const randomNumberGen = () => {
  const min = 1;
  const max = 100;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return rand;
};

export const filterQueryMaker = (filters) => {
  let query = "";
  filters.forEach((filter) => {
    if (filter.query) query = query + filter.query;
    else if (!filter.table) {
      filter.value.forEach((value) => {
        query = query + `&filters[${filter.key}][${filter.operation}]=${value}`;
      });
    } else {
      filter.value.forEach((value) => {
        query =
          query +
          `&filters[${filter.table}][${filter.key}][${filter.operation}]=${value}`;
      });
    }
  });

  return query;
};

export function captalizeFirstChar(text) {
  if (text) return text.charAt(0).toUpperCase() + text.slice(1);

  return "";
}
