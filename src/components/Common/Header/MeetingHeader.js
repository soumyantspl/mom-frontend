import React from 'react'
import { useNavigate, Navigate, Link } from "react-router-dom";
const MeetingHeader = () => {
  return (
   
<section className="topbar">
    <div className="topbar-2 shadow-sm bg-white">
        <div className="topbar2-content">
            <ul>
                <li>
                    <div className="home"><Link to="meeting/meeting-list" style={{textDecoration: "none",color:"black"}}>
                            <div className="home-svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    className="bi bi-house-door" viewBox="0 0 16 16">
                                    <path
                                        d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                </svg>
                            </div>
                            <div className="home-text">Home</div>
                        </Link>
                    </div>
                </li>

                <li>
                    <div className="timeline"> <Link to="meeting/timeline" style={{textDecoration: "none",color:"black"}}>
                            <div className="home-svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    className="bi bi-clock" viewBox="0 0 16 16">
                                    <path
                                        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg>
                            </div>
                            <div className="timeline-text">Timeline</div>
                        </Link>
                    </div>
                </li>


            </ul>

        </div>
    </div>
</section>
  )
}

export default MeetingHeader


