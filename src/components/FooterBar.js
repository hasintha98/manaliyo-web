import { CCol, CContainer, CFooter, CImage, CLink, CRow } from "@coreui/react";
import React from "react";
import "../scss/footer.css";
import LOGOWHITE from "../assets/test-logo-nobg.png";

function FooterBar() {
  return (
    <CFooter className="footer-section">
      <div class="container">
        <div id="contact" class="footer-cta  pb-5">
          <div class="row">
            <div class="col-xl-4 col-md-4 mb-30 pt-5">
              <div class="single-cta">
                <span className="icon material-symbols-outlined" style={{backgroundColor: 'white', borderRadius: '50%', padding: '10px'}}>
                  location_on
                </span>
                <div class="cta-text">
                  <h4>Find us</h4>
                  <span>1010 Avenue, sw 54321, chandigarh</span>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-4 mb-30 pt-5">
              <div class="single-cta">
                <span className="icon material-symbols-outlined">phone</span>
                <div class="cta-text">
                  <h4>Call us</h4>
                  <span>9876543210 0</span>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-4 mb-30 pt-5">
              <div class="single-cta">
                <span className="icon material-symbols-outlined">mail</span>
                <div class="cta-text">
                  <h4>Mail us</h4>
                  <span>mail@info.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-content pt-5 pb-5">
          <div class="row">
            <div class=" mb-50" style={{ textAlign: "center" }}>
              <div class="footer-widget">
                <div class="footer-logo">
                  <a href="index.html">
                    <CImage src={LOGOWHITE} class="img-fluid" alt="logo" />
                  </a>
                </div>
                <div class="footer-text">
                  <p>MANALIYO.LK</p>
                  <p>Your journey To A Soulmate Starts Here</p>

                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                    sed do eiusmod tempor incididuntut consec tetur adipisicing
                    elit,Lorem ipsum dolor sit amet.
                  </p>
                  <p>Follow Us On</p>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      justifyContent: "center",
                    }}
                  >
                    <CImage
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      }
                      style={{ height: "40px" }}
                      class="img-fluid"
                      alt="logo"
                    />
                    <CImage
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      }
                      style={{ height: "40px" }}
                      class="img-fluid"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright-area">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 text-lg-left">
              <div class="copyright-text">
                <p>
                  Copyright &copy; 2024, All Right Reserved{" "}
                  <a href="https://algorixmo.com">Algorixmo</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CFooter>
  );
}

export default FooterBar;
