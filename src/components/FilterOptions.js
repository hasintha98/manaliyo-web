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
  educationLevels,
  foodPreferences,
  professions,
  profileTypes,
  regions,
  religions,
} from "../common/const";
import { COLORS } from "../common/colors";

function FilterOptions ({ title="", onSearch }) {
  const [filters, setFilters] = useState([]);

  const [age, setAge] = useState([0, 100]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedReligions, setSelectedReligions] = useState([]);
  const [selectedCivilStatus, setSelectedCivilStatus] = useState([]);
  const [profession, setProfession] = useState("");
  const [selectedProfileType, setSelectedProfileType] = useState([])

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
      setSelectedProfileType(selectedProfileType.filter((r) => r !== profileType));
    } else {
      setSelectedProfileType([...selectedProfileType, profileType]);
    }
  };

  useEffect(() => {
    setFilters([
      {
        key: "Age",
        operation: "between",
        query: `&filters[basic_information][age][$between]=${age[0]}&filters[basic_information][age][$between]=${age[1]}`,
        value: age,
      },
      {
        key: "Region",
        table: "basic_information",
        operation: "$eq",
        value: selectedRegions,
      },
      {
        key: "Religion",
        table: "basic_information",
        operation: "$eq",
        value: selectedReligions,
      },
      {
        key: "profileType",
        table: null,
        operation: '$eq',
        value: selectedProfileType,
      },
      
    ]);
    
  }, [age, selectedRegions, selectedReligions, selectedProfileType]);

  const searchNow = () => {
    onSearch(filters);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <p
          className="px-3 pt-3"
          style={{ textAlign: "end", color: "GrayText" }}
        >
          Reset Filters
        </p>
        <p
          className="px-3 pt-3"
          style={{ textAlign: "end", color: COLORS.PRIMARY, cursor: 'pointer' }}
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
                {regions.map((region, key) => (
                  <CFormCheck
                    key={key}
                    id={`region-${key}`}
                    label={region}
                    value={region}
                    checked={selectedRegions.includes(region)} // Set checked state based on selection
                    onChange={() => handleRegionSelection(region)}
                  />
                ))}
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={3}>
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
        </CAccordionItem>
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
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
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
                />
                <span style={{ marginTop: "15px" }}>To</span>
                <CFormInput
                  type="number"
                  id="exampleFormControlInput1"
                  floatingLabel="Max"
                  placeholder="Max"
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
        <CAccordionItem itemKey={12}>
          <CAccordionHeader>ID verified</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CCol>
                <CFormCheck id="flexCheckDefault" label={"Yes"} value={true} />
                <CFormCheck id="flexCheckDefault" label={"No"} value={false} />
              </CCol>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
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
