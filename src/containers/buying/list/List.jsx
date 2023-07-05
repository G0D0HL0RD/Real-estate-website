import React, { useRef, useState } from "react";
import buildingData from "../../../assets/dummyData/buildingData";
import bed from "../../../assets/icons/bed.png";
import tub from "../../../assets/icons/tub.png";
import area from "../../../assets/icons/area.png";
import "./List.css";
// import arrowUp from "../../../assets/icons/arrowUp.png";
import arrowDown from "../../../assets/icons/arrowDown.png";
import { Backdrop } from "@mui/material";
import PropertyDetail from "../property/PropertyDetail";

const List = (props) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const backdropRef = useRef(null);
  const handleClose = (event) => {
    if (backdropRef.current && !backdropRef.current.contains(event.target)) {
      setOpenBackdrop(false);
    }
  };
  const handleOpen = (property) => {
    if (property) {
      setSelectedProperty(property);
      setOpenBackdrop(true);
    }
  };
  const [sortColumn, setSortColumn] = useState("price");

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortBuildingData = () => {
    if (sortColumn === "price") {
      return buildingData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    } else if (sortColumn === "bed") {
      return buildingData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.bed - b.bed;
        } else {
          return b.bed - a.bed;
        }
      });
    } else if (sortColumn === "tub") {
      return buildingData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.tub - b.tub;
        } else {
          return b.tub - a.tub;
        }
      });
    } else if (sortColumn === "area") {
      return buildingData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.area - b.area;
        } else {
          return b.area - a.area;
        }
      });
    } else {
      return buildingData;
    }
  };

  const filteredBuildingData = buildingData.filter((item) =>
    item.address.toLowerCase().includes(props.keyword.toLowerCase())
  );

  const sortedBuildingData = sortBuildingData();
  return (
    <div className="list-container">
      {/* List */}
      <div className="list">
        <table>
          <thead>
            <tr>
              <th className="table-header">
                <div className="list-col-site ">Site</div>
                <div
                  className={`list-col-price ${
                    sortColumn === "price" ? "active" : "inactive"
                  }`}
                >
                  <button
                    className="col-button"
                    onClick={() => handleSort("price")}
                  >
                    <div className="button-content">
                      Price
                      {sortColumn === "price" && (
                        <img
                          // src={sortOrder === "asc" ? arrowUp : arrowDown}
                          src={arrowDown}
                          alt="Sort Arrow"
                          className={`sort-icon ${
                            sortOrder === "asc" ? "rotated" : ""
                          }`}
                          style={{
                            height: "22px",
                            width: "auto",
                            marginLeft: "5px",
                          }}
                        />
                      )}
                    </div>
                  </button>
                </div>
                <div className="list-col-address">Address</div>
                <div className="list-col-icons">
                  <div
                    className={`list-col-bed ${
                      sortColumn === "bed" ? "active" : "inactive"
                    }`}
                  >
                    <button
                      className="col-button"
                      onClick={() => handleSort("bed")}
                    >
                      <div className="button-content">
                        Bed
                        {sortColumn === "bed" && (
                          <img
                            // src={sortOrder === "asc" ? arrowUp : arrowDown}

                            src={arrowDown}
                            alt="Sort Arrow"
                            className={`sort-icon ${
                              sortOrder === "asc" ? "rotated" : ""
                            }`}
                            style={{
                              height: "22px",
                              width: "auto",
                              marginLeft: "5px",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  </div>
                  <div
                    className={`list-col-tub ${
                      sortColumn === "tub" ? "active" : "inactive"
                    }`}
                  >
                    <button
                      className="col-button"
                      onClick={() => handleSort("tub")}
                    >
                      <div className="button-content">
                        Tub
                        {sortColumn === "tub" && (
                          <img
                            // src={sortOrder === "asc" ? arrowUp : arrowDown}
                            src={arrowDown}
                            alt="Sort Arrow"
                            className={`sort-icon ${
                              sortOrder === "asc" ? "rotated" : ""
                            }`}
                            style={{
                              height: "22px",
                              width: "auto",
                              marginLeft: "5px",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  </div>
                  <div
                    className={`list-col-area ${
                      sortColumn === "area" ? "active" : "inactive"
                    }`}
                  >
                    <button
                      className="col-button"
                      onClick={() => handleSort("area")}
                    >
                      <div className="button-content">
                        Area
                        {sortColumn === "area" && (
                          <img
                            // src={sortOrder === "asc" ? arrowUp : arrowDown}
                            src={arrowDown}
                            alt="Sort Arrow"
                            className={`sort-icon ${
                              sortOrder === "asc" ? "rotated" : ""
                            }`}
                            style={{
                              height: "22px",
                              width: "auto",
                              marginLeft: "5px",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBuildingData.map((item, index) => (
              <tr
                className="listRow"
                key={index}
                onClick={() => handleOpen(item)}
              >
                <td className="listRow-image">
                  <img src={item.img} alt="image" />
                </td>
                <td className="listRow-price">{item.price}</td>
                <td className="listRow-address">{item.address}</td>
                <td className="listRow-icons">
                  <div className="listRow-bed">
                    <div className="listRow-bed-icon">
                      <img src={bed} alt="bed icon" />
                    </div>
                    <div className="listRow-bed-num">{item.bed}</div>
                  </div>
                  <div className="listRow-tub">
                    <div className="listRow-tub-icon">
                      <img src={tub} alt="tub icon" />
                    </div>
                    <div className="listRow-tub-num">{item.tub}</div>
                  </div>
                  <div className="listRow-area">
                    <div className="listRow-area-icon">
                      <img src={area} alt="area icon" />
                    </div>
                    <div className="listRow-area-num">{item.area}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Backdrop
          sx={{
            color: "var(--color-dark)",
            zIndex: "90",
          }}
          open={openBackdrop}
          onClick={handleClose}
        >
          <div className="buy-backdrop" ref={backdropRef}>
            {selectedProperty && <PropertyDetail building={selectedProperty} />}
          </div>
        </Backdrop>
      </div>
    </div>
  );
};

export default List;
