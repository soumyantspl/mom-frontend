import React from 'react'
import noDataFound from "../../assets/images/No-data-found.svg";

const NoDataFound = () => {
  return (
    <div className="white-box">
              <img
                // @ts-ignore
                src={noDataFound}
                alt=""
              ></img>
            </div>
  )
}

export default NoDataFound