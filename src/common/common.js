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
    if (filter.skip) return;
    if (!filter.value || filter?.value?.length == 0) return;
    if (filter.query) query = query + filter.query;
    else if (!filter.table) {
      filter.value.forEach((value) => {
        if (value?.length > 0) {
          filter.value.forEach((value) => {
            query =
              query + `&filters[${filter.key}][${filter.operation}]=${value}`;
          });
        } else {
          query =
            query + `&filters[${filter.key}][${filter.operation}]=${value}`;
        }
      });
    } else {
      filter.value.forEach((value) => {
        if (!value) return;
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

export function truncateTextWithEllipsis(text, maxWords) {
  const words = text.split(" ");

  if (words.length <= maxWords) {
    return text;
  }

  const truncatedText = words.slice(0, maxWords).join(" ") + "...";
  return truncatedText;
}

function countEmptyAttributes(obj) {
  let count = 0;

  // Iterate over the object's properties
  for (let key in obj) {
    // Check if the property value is empty
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      count++;
    }
  }

  return count;
}

export const CalculateProfileCompletion = (userData) => {
  const basicInfoCount = Object.keys(userData?.basic_information).length;
  const contactInfoCount = Object.keys(userData?.contact_information).length;
  const educationnfoCount = Object.keys(userData?.education).length;
  const familyInfoCount = Object.keys(userData?.family_background).length;
  const hobbieInfoCount = Object.keys(userData?.interests_and_hobbie).length;
  const lifestyleInfoCount = Object.keys(userData?.lifestyle_habit).length;
  const locationInfoCount = Object.keys(userData?.location_information).length;
  const occupationInfoCount = Object.keys(
    userData?.occupation_and_finance
  ).length;
  const personalInfoCount = Object.keys(userData?.personal_information).length;
  const photoInfoCount = Object.keys(userData?.user_image).length;

  const total =
    basicInfoCount +
    contactInfoCount +
    educationnfoCount +
    familyInfoCount +
    hobbieInfoCount +
    lifestyleInfoCount +
    locationInfoCount +
    occupationInfoCount +
    personalInfoCount +
    photoInfoCount;

  const completion =
    total -
    (countEmptyAttributes(userData?.basic_information) +
      countEmptyAttributes(userData?.contact_information) +
      countEmptyAttributes(userData?.education) +
      countEmptyAttributes(userData?.family_background) +
      countEmptyAttributes(userData?.interests_and_hobbie) +
      countEmptyAttributes(userData?.lifestyle_habit) +
      countEmptyAttributes(userData?.location_information) +
      countEmptyAttributes(userData?.personal_information) +
      countEmptyAttributes(userData?.occupation_and_finance) +
      countEmptyAttributes(userData?.user_image));

    return (completion / total) * 100
};
