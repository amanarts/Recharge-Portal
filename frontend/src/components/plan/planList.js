import axios from "axios";
import { Badge, Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CreatePlan from "./createPlan";
import ViewPlan from "./viewPlan";
import ListPagination from "./pagination";
import { IoIosAddCircleOutline } from "react-icons/io";
import UpdatePlan from "./updatePlan";
import "../css/plan.css";
import PlanListItem from "./planListItem";

export default function PlanList(props) {
  const [planList, setPlanList] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    pageSize: 5,
    totalElements: 0,
  });
  const [activePage, setActivePage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [refreshList, setRefreshList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});

  useEffect(() => {
    const pageParameters =
      "?pageNumber=" + activePage + "&pageSize=" + pagination.pageSize;
    const promise = axios.get(
      process.env.REACT_APP_PLAN_SERVER_URL +
        "/plan-management/plan/paged" +
        pageParameters
    );
    promise.then((response) => {
      console.log(response.data.content);
      setPlanList(response.data.content);
      setPagination({
        ...pagination,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      });
    });
  }, [activePage, pagination.pageSize, showModal, refreshList]);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div className="row">
        <div className="col-lg-9 col-md-9 col-8 px-auto">
          <b>
            <h1 style={{ marginLeft: "5%", marginTop: "10px" }}>Plans</h1>
          </b>
        </div>
        <div className="col-lg-3 col-md-3 col-4 px-1 text-end">
          <button
            className="btn btn-dark col-lg-4 col-md-6 col-7 px-0 button-add-plan"
            onClick={() => {
              setShowModal(true);
              setShowDetails(false);
              setShowCreateForm(true);
            }}
          >
            Add Plan <IoIosAddCircleOutline style={{ fontSize: "120%" }} />
          </button>
        </div>
      </div>
      {planList.map((plan) => {
        return (
          <PlanListItem
            plan={plan}
            setSelectedPlan={setSelectedPlan}
            setShowCreateForm={setShowCreateForm}
            setShowDetails={setShowDetails}
            setShowModal={setShowModal}
            setRefreshList={setRefreshList}
            showAllColumn={false}
            isPlanList={true}
            isAdmin={true}
            showBadge={true}
          />
        );
      })}
      <ListPagination
        totalPages={pagination.totalPages}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <Modal
        size={showDetails ? "md" : "lg"}
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Body className="pt-0 px-0">
          {showDetails ? (
            <ViewPlan handleCloseModal={handleCloseModal} plan={selectedPlan} />
          ) : showCreateForm ? (
            <CreatePlan handleCloseModal={handleCloseModal} />
          ) : (
            <UpdatePlan
              handleCloseModal={handleCloseModal}
              plan={{
                ...selectedPlan,
                validity: selectedPlan.validity + "",
                price: selectedPlan.price + "",
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
