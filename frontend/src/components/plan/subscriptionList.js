import axios from "axios";
import { Badge, Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import CreatePlan from "./createPlan";
import ViewPlan from "./viewPlan";
import ListPagination from "./pagination";
import { IoIosAddCircleOutline } from "react-icons/io";
import UpdatePlan from "./updatePlan";
import "../css/plan.css";
import PlanListItem from "./planListItem";

export default function SubscriptionList(props) {
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    pageSize: 5,
    totalElements: 0,
  });
  const [activePage, setActivePage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [refreshList, setRefreshList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});

  useEffect(() => {
    const pageParameters =
      "?pageNumber=" + activePage + "&pageSize=" + pagination.pageSize;
    const promise = axios.get(
      process.env.REACT_APP_PLAN_SERVER_URL +
        "/plan-management/plan/oldAndCurrentPlanDetails/userId1" +
        pageParameters
    );
    promise.then((response) => {
      console.log(response.data);
      setSubscriptionList(response.data.content);
      setPagination({
        ...pagination,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      });
    });
    promise.catch((error) => {
      console.log(error.message);
    });
  }, [activePage, pagination.pageSize, showModal, refreshList]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      {subscriptionList.map((subscription) => {
        if (
          (props.showCurrentSubscriptions &&
            subscription.status != "EXPIRED") ||
          props.showCurrentSubscriptions == undefined ||
          props.showCurrentSubscriptions == false
        ) {
          const { plan, ...subscriptionItem } = subscription;
          return (
            <PlanListItem
              plan={subscription.plan}
              setSelectedPlan={setSelectedPlan}
              setShowDetails={setShowDetails}
              setShowModal={setShowModal}
              subscription={subscriptionItem}
              showAllColumn={false}
              isPlanList={false}
              isAdmin={false}
              showBadge={props.showCurrentSubscriptions ? false : true}
            />
          );
        }
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
          ) : (
            <div></div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
