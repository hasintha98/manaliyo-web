import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCol,
  CFormCheck,
  CFormInput,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  Ethnicities,
  civilStatuses,
  districts,
  educationLevels,
  foodPreferences,
  professions,
  profileTypes,
  regions,
  religions,
} from "../common/const";
import { COLORS } from "../common/colors";

function FilterOptions({ title = "", onSearch }) {
  const [filters, setFilters] = useState([]);

  const [age, setAge] = useState([0, 100]);
  const [height, setHeight] = useState([null, null]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedReligions, setSelectedReligions] = useState([]);
  const [selectedCivilStatus, setSelectedCivilStatus] = useState([]);
  const [profession, setProfession] = useState("");
  const [selectedProfileType, setSelectedProfileType] = useState([]);

  const [selectedDrinking, setSelectedDrinking] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedEducationLevel, setSelectedEducationLevel] = useState([]);

  const handleCivilStatusSelection = (civilStatus) => {
    if (selectedCivilStatus.includes(civilStatus)) {
      setSelectedCivilStatus(
        selectedCivilStatus.filter((r) => r !== civilStatus)
      );
    } else {
      setSelectedCivilStatus([...selectedCivilStatus, civilStatus]);
    }
  };

  const handleRegionSelection = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const handleReligionSelection = (religion) => {
    if (selectedReligions.includes(religion)) {
      setSelectedReligions(selectedReligions.filter((r) => r !== religion));
    } else {
      setSelectedReligions([...selectedReligions, religion]);
    }
  };

  const handleProfileType = (profileType) => {
    if (selectedProfileType.includes(profileType)) {
      setSelectedProfileType(
        selectedProfileType.filter((r) => r !== profileType)
      );
    } else {
      setSelectedProfileType([...selectedProfileType, profileType]);
    }
  };

  const handleEducationLevelSelection = (level) => {
    if (selectedEducationLevel.includes(level)) {
      setSelectedEducationLevel(
        selectedEducationLevel.filter((r) => r !== level)
      );
    } else {
      setSelectedEducationLevel([...selectedEducationLevel, level]);
    }
  };

  console.log(selectedRegions);

  useEffect(() => {
    setFilters([
      {
        key: "height",
        operation: "between",
        query: `&filters[personal_information][height][$between]=${height[0]}&filters[personal_information][height][$between]=${height[1]}`,
        value: height,
        skip: height[0] || height[1] ? false : true
      },
      {
        key: "Age",
        operation: "between",
        query: `&filters[basic_information][age][$between]=${age[0]}&filters[basic_information][age][$between]=${age[1]}`,
        value: age,
      },
      {
        key: "location",
        table: null,
        operation: "$eq",
        value: selectedRegions,
      },
      {
        key: "religion",
        table: "basic_information",
        operation: "$eq",
        value: selectedReligions,
      },
      {
        key: "maritalStatus",
        table: "basic_information",
        operation: "$eq",
        value: selectedCivilStatus,
      },
      {
        key: "highestQualification",
        table: "education",
        operation: "$eq",
        value: selectedEducationLevel,
      },
      {
        key: "profileType",
        table: null,
        operation: "$eq",
        value: selectedProfileType,
      },
      {
        key: "drinking",
        table: "lifestyle_habit",
        operation: "$eq",
        value: selectedDrinking,
      },
      {
        key: "occupation",
        table: "occupation_and_finance",
        operation: "$contains",
        value: [selectedProfession],
      },
    ]);
  }, [
    age,
    height,
    selectedRegions,
    selectedReligions,
    selectedCivilStatus,
    selectedProfileType,
    selectedProfession,
    selectedDrinking,
    selectedEducationLevel,
  ]);

  const searchNow = () => {
    onSearch(filters);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <p
          className="px-3 pt-3"
          style={{ textAlign: "end", color: "GrayText", cursor: "pointer" }}
          onClick={() => window.location.reload(false)}
        >
          Reset Filters
        </p>
        <p
          className="px-3 pt-3"
          style={{ textAlign: "end", color: COLORS.PRIMARY, cursor: "pointer" }}
          onClick={() => onSearch(filters)}
        >
          Search
        </p>
      </div>

      <CAccordion flush className="p-2 ">
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>Age</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                }}
              >
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  floatingLabel="Min"
                  placeholder="Min"
                  onChange={(e) => setAge([e.target.value, age[1]])}
                  value={age[0]}
                />
                <span style={{ marginTop: "15px" }}>To</span>
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  floatingLabel="Max"
                  placeholder="Max"
                  onChange={(e) => setAge([age[0], e.target.value])}
                  value={age[1]}
                />
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>Region / District</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                {districts.map((region, key) => (
                  <CFormCheck
                    key={key}
                    id={`region-${key}`}
                    label={region.label}
                    value={region.value}
                    checked={selectedRegions.includes(region.value)} // Set checked state based on selection
                    onChange={() => handleRegionSelection(region.value)}
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        {/* <CAccordionItem itemKey={3}>
          <CAccordionHeader>Ethnicity</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                {Ethnicities.map((Ethnicity, key) => (
                  <CFormCheck
                    key={key}
                    id="flexCheckDefault"
                    label={Ethnicity}
                    value={Ethnicity}
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem> */}
        <CAccordionItem itemKey={4}>
          <CAccordionHeader>Religion</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                {religions.map((religion, key) => (
                  <CFormCheck
                    key={key}
                    id="flexCheckDefault"
                    label={religion}
                    value={religion}
                    checked={selectedReligions.includes(religion)} // Set checked state based on selection
                    onChange={() => handleReligionSelection(religion)} // Handle selection change
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={5}>
          <CAccordionHeader>Civil Status</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                {civilStatuses.map((civilStatus, key) => (
                  <CFormCheck
                    key={key}
                    id="flexCheckDefault"
                    label={civilStatus}
                    value={civilStatus}
                    checked={selectedCivilStatus.includes(civilStatus)} // Set checked state based on selection
                    onChange={() => handleCivilStatusSelection(civilStatus)}
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={6}>
          <CAccordionHeader>Profession</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                <CFormInput
                  placeholder="Enter Profession"
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                ></CFormInput>
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={7}>
          <CAccordionHeader>Min Education Level</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                {educationLevels.map((educationLevel, key) => (
                  <CFormCheck
                    key={key}
                    id="flexCheckDefault"
                    label={educationLevel}
                    value={educationLevel}
                    checked={selectedEducationLevel.includes(educationLevel)} // Set checked state based on selection
                    onChange={() =>
                      handleEducationLevelSelection(educationLevel)
                    }
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={8}>
          <CAccordionHeader>Height</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                }}
              >
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  floatingLabel="Min"
                  placeholder="Min"
                  onChange={(e) => setHeight([e.target.value, height[1]])}
                  value={height[0]}
                />
                <span style={{ marginTop: "15px" }}>To</span>
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  floatingLabel="Max"
                  placeholder="Max"
                  onChange={(e) => setHeight([height[0], e.target.value])}
                  value={height[1]}
                />
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={9}>
          <CAccordionHeader>Food Preference</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                {foodPreferences.map((foodPreference, key) => (
                  <CFormCheck
                    key={key}
                    id="flexCheckDefault"
                    label={foodPreference}
                    value={foodPreference}
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={10}>
          <CAccordionHeader>Drinking</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                <CFormCheck id="flexCheckDefault" label={"Yes"} value={true} />
                <CFormCheck id="flexCheckDefault" label={"No"} value={false} />
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={11}>
          <CAccordionHeader>Smoking</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                <CFormCheck id="flexCheckDefault" label={"Yes"} value={true} />
                <CFormCheck id="flexCheckDefault" label={"No"} value={false} />
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        {/* <CAccordionItem itemKey={12}>
          <CAccordionHeader>ID verified</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                <CFormCheck id="flexCheckDefault" label={"Yes"} value={true} />
                <CFormCheck id="flexCheckDefault" label={"No"} value={false} />
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem> */}
        <CAccordionItem itemKey={13}>
          <CAccordionHeader>Account Created by</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                {profileTypes.map((type, key) => (
                  <CFormCheck
                    key={key}
                    id="flexCheckDefault"
                    label={type.label}
                    value={type.value}
                    checked={selectedProfileType.includes(type.value)} // Set checked state based on selection
                    onChange={() => handleProfileType(type.value)}
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </>
  );
}

export default FilterOptions;
