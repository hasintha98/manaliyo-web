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

  if(obj == null) return obj

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

  const basicInfoCount = userData?.basic_information ? Object.keys(userData?.basic_information).length : 11;
  const contactInfoCount = userData?.contact_information ? Object.keys(userData?.contact_information).length : 5;
  const educationnfoCount = userData?.education ? Object.keys(userData?.education).length : 8;
  const familyInfoCount = userData?.family_background ? Object.keys(userData?.family_background).length : 12;
  const hobbieInfoCount = userData?.interests_and_hobbie ? Object.keys(userData?.interests_and_hobbie).length : 6;
  const lifestyleInfoCount = userData?.lifestyle_habit ? Object.keys(userData?.lifestyle_habit).length : 6;
  const locationInfoCount = userData?.location_information ? Object.keys(userData?.location_information).length : 9;
  const occupationInfoCount = userData?.occupation_and_finance ? Object.keys(
    userData?.occupation_and_finance
  ).length : 8;
  const personalInfoCount = userData?.personal_information ? Object.keys(userData?.personal_information).length : 8;
  const photoInfoCount = userData?.user_image ? Object.keys(userData?.user_image).length : 7;

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
    ((countEmptyAttributes(userData?.basic_information ) || 11) +
    (countEmptyAttributes(userData?.contact_information ) || 5 )+
    (countEmptyAttributes(userData?.education ) || 8)+
    (countEmptyAttributes(userData?.family_background) || 12 )+
    (countEmptyAttributes(userData?.interests_and_hobbie) || 6 )+
    (countEmptyAttributes(userData?.lifestyle_habit) || 6 )+
    (countEmptyAttributes(userData?.location_information) || 9 )+
    (countEmptyAttributes(userData?.personal_information) || 8 )+
    (countEmptyAttributes(userData?.occupation_and_finance) || 8 )+
    (countEmptyAttributes(userData?.user_image) || 7));

    return (completion / total) * 100
};
