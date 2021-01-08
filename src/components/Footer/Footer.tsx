import React, { Component } from 'react';

export default class extends Component {
  render = () => (
    <>
      <footer className="footer_area">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <aside className="f_widget ab_widget">
                  <img src="img/Coupondapp-logo-blue.png" width="180" alt="" />
                  <p>Coupon Dapp is an initiative of Team Era Swap – So, the community can simply share Era Swap in a few simple steps, quickly and efficiently... </p>

                </aside>
              </div>
              <div className="col-lg-6 col-sm-6">
                <aside className="f_widget link_widget">
                  <div className="f_title">
                    <h3>Useful Links</h3>
                    <span></span>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <ul className="nav flex-column">
                          <li><a className="" href="#works" >How it Works </a></li>
                          <li><a className="" href="#aboutus" >About</a></li>
                          <li><a className="" href="#gifts">Gift ES Tokens</a></li>
                         </ul>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                          <ul className="nav flex-column">
                            <li><a href="http://eraswaptoken.io/pdf/era-swap-howey-test-letter-august7-2018.pdf"
                              target="_blank" rel="noopener noreferrer">Howey Test</a></li>
                            <li><a href="https://eraswaptoken.io/pdf/es-statuary-warning.pdf" target="_blank" rel="noopener noreferrer">Statuary Warning</a></li>
                            <li><a href="http://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank" rel="noopener noreferrer">ES White
                                Paper </a></li>
                                
                            <li><a href="https://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf"
                              target="_blank" rel="noopener noreferrer">Era Swap Terms & Conditions</a></li>
                            <li><a href="pdf/coupon-terms-conditions.pdf" target="_blank">Terms & Conditions</a></li>
                            <li><a href="pdf/privacy_policy_coupondapp.pdf" target="_blank">Privacy Policy</a></li>
                           </ul>
                  </div>
                  </div>
                </aside>
              </div>
              <div className="col-lg-3 col-sm-6">
                <aside className="f_widget news_widget">
                  <div className="f_title">
                    <h3>Social Links</h3>
                    <span></span>
                  </div>

                  <ul className="nav">
                    
                      <li><a href="https://www.facebook.com/eraswap" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></a></li>
                      <li><a href="https://www.linkedin.com/company/eraswap/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" /></a></li>
                      <li><a href="https://www.instagram.com/eraswap/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" /></a> </li>
                      <li><a href="https://twitter.com/EraSwapTech" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" /></a>
                      </li>
                      <li><a href="https://medium.com/@eraswap" target="_blank" rel="noopener noreferrer"><i className="fa fa-medium" /></a>
                      </li>
                      <li><a href="https://eraswap.tumblr.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-tumblr" /></a>
                      </li>
                      <li><a href="https://t.me/eraswap" target="_blank" rel="noopener noreferrer"><i className="fa fa-telegram" /></a>
                      </li>
                      <li> <a href="https://github.com/KMPARDS" target="_blank" rel="noopener noreferrer"><i className="fa fa-github" /></a>
                      </li>
                      <li><a href="https://www.reddit.com/user/EraSwap" target="_blank" rel="noopener noreferrer"><i className="fa fa-reddit" /></a> </li>
                      <li><a href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube" /></a></li>
                    
                  </ul>

                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <div className="justify-content-between d-flex">
              <div className="left">
                <p>© Copyright   <script>document.write(new Date().getFullYear());</script> . All right reserved.</p>
              </div>
              <div className="right">
                <p>Created by <a href="https://www.eraswap.info">Eraswap</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="search_area zoom-anim-dialog mfp-hide" id="test-search">
        <div className="search_box_inner">
          <h3>Search</h3>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter search keywords" />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button"><i className="icon icon-Search"></i></button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
