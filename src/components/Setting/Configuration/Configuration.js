import React from 'react'
import Header from '../../Common/Header/Header'
import Sidebar from '../../Common/Sidebar/Sidebar'
import MeetingHeader from '../../Common/Header/MeetingHeader'

const Configuration = () => {
  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="meeting-room-page">
          <div className="meeting-header-text">
            <h4>Configuration</h4>
          </div>
          <div className="mt-2 table-box">
            <form className="meeting-form">
              <div className="form-group box-border">
                <div className="alert-box amendment">
                  <p>
                    Allow MOM amendment requests within
                    <select>
                      <option>48</option>
                      <option>47</option>
                      <option>46</option>
                    </select>
                    hours of meeting MOM creation.
                  </p>
                </div>
              </div>
              <div className="form-group  box-border">
                <div className="alert-box amendment">
                  <p>
                    Allow acceptance or rejection of meeting minutes within
                    <select>
                      <option>45</option>
                      <option>47</option>
                      <option>46</option>
                    </select>
                    hours of meeting MOM creation.
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <button className="add-btn send-email Mom-btn">
                  <p>Save Minutes</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configuration