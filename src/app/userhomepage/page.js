"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/userpage.module.css";
import { useRouter } from "next/navigation";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import law from "../../../public/law.svg";
import { url_prefix } from "../utils/constants";

const UserHome = () => {
  const router = useRouter();
  const [useremail, setUserEmail] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [userData, userSetFn] = useState({
    message: "",
    hearing_list: [],
    upcomingDate: "",
  });

  useEffect(() => {
    setIsClient(true); // Ensure we are on the client before accessing localStorage
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const val = typeof window !== "undefined" ? localStorage.getItem("useremail") : null;
    
    if (!val) {
      router.push("/");
    } else {
      setUserEmail(val);
    }
  }, [isClient, router]);

  useEffect(() => {
    if (useremail) {
      getUserHearingDetails();
    }
  }, [useremail]);

  const getUserHearingDetails = async () => {
    if (!useremail) return;

    const url = `${url_prefix}/user/getuserhearingdata?email=${useremail}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (response.ok) {
        userSetFn(result);
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Something Went Wrong");
    }
  };

  const [showMoreText, showMoreTextFn] = useState(false);

  const hideShowText = (id) => {
    showMoreTextFn(showMoreText === id ? 0 : id);
  };

  if (!isClient) {
    return null; // Prevent rendering during server-side execution
  }

  return (
    <div className={styles.user_details_box}>
      <div className={styles.title_box}>
        <h2>Welcome {userData.name}</h2>
        <br />
        <h4>Upcoming Date - {userData.upcomingDate}</h4>
      </div>

      <div className={styles.timeline_box}>
        <VerticalTimeline key={"1"} className={styles.verticaltimeline_} layout="1-column-left" lineColor="#383838">
          {userData.hearing_list.map((element) => (
            <VerticalTimelineElement
              key={element._id}
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
              date={element.hearing_date}
              iconStyle={{ background: "#fff", color: "#fff" }}
              icon={<Image src={law} alt="law" width={40} height={40} />}
            >
              <div className={styles.timeline_item_text}>
                <span>{element.court_order}</span>
                <br />
                <button style={{ cursor: "pointer" }} onClick={() => hideShowText(element.id)}>
                  {showMoreText === element.id ? "Hide" : "Read More"}
                </button>
                <br />
                <br />
                {showMoreText === element.id && <>More Details to follow.</>}
              </div>
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{ background: "#578E7E", color: "#fff" }}
            icon=""
            date="Upcoming Date"
            className="vertical-timeline-element"
            contentArrowStyle={{ borderRight: "7px solid  #578E7E" }}
          />
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default UserHome;
