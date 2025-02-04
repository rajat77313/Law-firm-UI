"use client";
import React, { useEffect } from "react";
import styles from "@/app/styles/userpage.module.css";
import { users } from "../../../public/userdata";
import { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useRouter } from "next/navigation";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import law from "../../../public/law.svg";

const UserHome = () => {
  const router = useRouter();
  const [useremail, setUserEmail] = useState(localStorage.getItem('useremail'))

  if(!useremail) {
    router.push('/')
  }


  const getUserHearingDetails = async () => {
    const url = "https:/law-firm-be.vercel.app/user/getuserhearingdata?email=" + useremail;
    try {
      const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        userSetFn(result)
      } else if (response.status === 401 || response.status === 500) {
        alert('Something went wrong.')
      }
    } catch (error) {
      alert('Something Went Wrong')
    }
  }

  useEffect(() => {
    getUserHearingDetails()
  }, [])

  const [userData, userSetFn] = useState({
    message: '', hearing_list: [], upcomingDate: ''
});
  const [showMoreText, showMoreTextFn] = useState(false);

  const hideShowText = (id) => {
    let _id = 0;
    _id = showMoreText == id ? 0 : id;
    showMoreTextFn(_id);
  };

  return (
    <>
      <div className={styles.user_details_box}>
        <div className={styles.title_box}>
          <h2>Welcome {userData.name}</h2>
          <br />
          <h4>Upcoming Date - {userData.upcomingDate}</h4>
        </div>

        <div className={styles.timeline_box}>
          <VerticalTimeline key={'1'} className={styles.verticaltimeline_} layout="1-column-left" lineColor="#383838">

            {userData.hearing_list.map((element) => {
              return (
                <VerticalTimelineElement
                  className="vertical-timeline-element"
                  contentStyle={{
                    background: "#F5ECD5",
                    color: "#383838",
                    display: "flex",
                    flexDirection: "column-reverse",
                    padding: "5px 20px",
                    boxShadow: "none",
                    borderBottom: "1px solid #578E7E",
                    borderRadius: "0px",
                  }}
                  contentArrowStyle={{ borderRight: "7px solid  #578E7E" }}
                  key={element._id}
                  date={element.hearing_date}
                  iconStyle={{ background: "#fff", color: "#fff" }}
                  icon={<Image src={law} alt="law" width={40} height={40} />}
                >
                  <div className={styles.timeline_item_text}>
                    <span>{element.court_order}</span>
                    <br />
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => hideShowText(element.id)}
                    >
                      {showMoreText === element.id ? "Hide" : "Read More"}
                    </button>
                    <br />
                    <br />
                    {showMoreText === element.id ? (
                      <>More Details to follow.</>
                    ) : (
                      <></>
                    )}
                  </div>
                </VerticalTimelineElement>
              );
            })}
            <VerticalTimelineElement
              iconStyle={{ background: "#578E7E", color: "#fff" }}
              icon="" date="Upcoming Date" className="vertical-timeline-element" contentArrowStyle={{ borderRight: "7px solid  #578E7E" }}
            />
          </VerticalTimeline>
        </div>
      </div>
    </>
  );
};

export default UserHome;
