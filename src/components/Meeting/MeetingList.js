import React from 'react'

const MeetingList = () => {
  return (
    <section className="otp-varify">
    <div className="container-fluid">
         <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="loginform-container"> 
               
                
                 <form>
                     
                     <div className="text">
                         <h4>Welcome to Meeting Plus</h4>
                         <p>Check your email for OTP</p>
                     </div>
    
                    <div className="form-group">
                        <label className="mb-1">Enter Your 6 Digit OTP <span>*</span></label>
                        <div className="pincode">
                            <div className="digit">
                                <input type="text" />
                            </div>
                            <div className="digit">
                                <input type="text" />
                            </div>
                            <div className="digit">
                                <input type="text" />
                            </div>
                            <div className="digit">
                                <input type="text" />
                            </div>
                            <div className="digit">
                                <input type="text" />
                            </div>
                            <div className="digit">
                                <input type="text"/>
                            </div>
                        </div>
                    </div>
        
                     
                     <a href="/meeting/meeting-list">
                        <button className="btn1"> Verify</button>
                     </a>
    
                     <div className="back-resend back-arrow">
                        <a href="">
                            <div className="back">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0b77e8" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg><span>Back to Sign In</span>
                            </div>
                        </a>
                        
                        <div className="resend">
                            <a href="">Resend OTP</a>
                        </div>
                    </div>
    
    
                 </form>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
             <div className="blue-box-cont">
                 <div className="blue-box">
                     <div className="slider-cont">
                         <h2>Meeting Plus</h2>
                         <h6>Where Meeting Become Meaningful</h6>
                         <div className="white-box">
                            
                         </div>
                     </div>
                 </div>
                 <p className="copyright">&copy; 2024 NTSPL All Rights Reserved</p>
             </div>
          </div>
 
        </div>
    </div>
     
 </section>
  )
}

export default MeetingList