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
import React from "react";
import {
  Ethnicities,
  civilStatuses,
  educationLevels,
  foodPreferences,
  professions,
  regions,
  religions,
} from "../common/const";

function FilterOptions() {
  return (
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
      <CAccordionItem itemKey={2}>
        <CAccordionHeader>Region / District</CAccordionHeader>
        <CAccordionBody>
          <CRow>
            <CCol>
              {regions.map((region, key) => (
                <CFormCheck
                  key={key}
                  id="flexCheckDefault"
                  label={region}
                  value={region}
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
              {professions.map((profession, key) => (
                <CFormCheck
                  key={key}
                  id="flexCheckDefault"
                  label={profession}
                  value={profession}
                />
              ))}
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
              <CFormCheck id="flexCheckDefault" label={"Self"} value={"Self"} />
              <CFormCheck id="flexCheckDefault" label={"Parent"} value={"Parent"} />
            </CCol>
          </CRow>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  );
}

export default FilterOptions;
