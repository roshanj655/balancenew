





import React, { useState } from 'react';
function Activity(props) {
    let activitiesArray = [];
    const [activityArray, setActivityArray] = useState([]);
    const updateActivityArray = (check) => {
        var date = new Date();
        var oneBeforeDay = date.getTime() - (1 * 24 * 60 * 60 * 1000);
        var weekBeforeDay = date.getTime() - (7 * 24 * 60 * 60 * 1000);
        var monthBeforeDay = date.getTime() - (30 * 24 * 60 * 60 * 1000);
        // var weekBeforeDay = week.getDate();
        // var monthBeforeDay = month.getDate();
        props.activity.forEach((element, index) => {
            let day = new Date(element.day).getTime();
            let currentDate = new Date().getTime();
            if (check == "day" && (day >= oneBeforeDay && day <= currentDate)) {
                activitiesArray.push(element);
            }
            else if (check == "week" && (day >= weekBeforeDay && day <= currentDate)) {
                activitiesArray.push(element);
            }
            else if (check == "month" && (day >= monthBeforeDay && day <= currentDate)) {
                activitiesArray.push(element);
            }
            setActivityArray(activitiesArray);
        });
    }
    let activity1 = activityArray.map((item, index) => {
        let day=new Date(item.createdAt).getDate();
        let hours=new Date(item.createdAt).getHours();
        // if(day==6){
            if(hours>=0 && hours<3){
            return <div className=" activity-icon text-center"><img src={"assets/images/Activities/"+(item.type=='Goofy'?'silly':item.type)+".png"} alt="image" /></div>
        }
    })
    let activity2 = activityArray.map((item, index) => {
        let day=new Date(item.createdAt).getDate();
        let hours=new Date(item.createdAt).getHours();
        // if(day==6){
            if(hours>3 && hours<10){
            return <div className=" activity-icon text-center"><img src={"assets/images/Activities/"+(item.type=='Goofy'?'silly':item.type)+".png"} alt="image" /></div>
        }
    })
    let activity3 = activityArray.map((item, index) => {
        let day=new Date(item.createdAt).getDate();
        let hours=new Date(item.createdAt).getHours();
        // if(day==6){
            if(hours>10 && hours<12){
            return <div className=" activity-icon text-center"><img src={"assets/images/Activities/"+(item.type=='Goofy'?'silly':item.type)+".png"} alt="image" /></div>
        }
    })
    let activity4 = activityArray.map((item, index) => {
        let day=new Date(item.createdAt).getDate();
        let hours=new Date(item.createdAt).getHours();
        // if(day==6){
            if(hours>12 && hours<23){
            return <div className=" activity-icon text-center"><img src={"assets/images/Activities/"+(item.type=='Goofy'?'silly':item.type)+".png"} alt="image" /></div>
        }
    })
    const [tabActivity, setActivity] = useState("activityDay");
    return (
        <div className="slept">
            <h4>Your Activity</h4>
            <ul className=" justify-content-end nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link "+((tabActivity=="activityDay")?"active":"")}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onClick={() => {
                            setActivity("activityDay")
                            updateActivityArray("day");
                        }}
                    >Day</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link "+((tabActivity=="activityWeek")?"active":"")}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => {
                            setActivity("activityWeek")
                            updateActivityArray("week");
                        }}
                    >Week</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link "+((tabActivity=="activityMonth")?"active":"")}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => {
                            setActivity("activityMonth")
                            updateActivityArray("month");
                        }}
                    >Month</a>
                </li>
            </ul>
            <div className="tab-content" id="ex1-content">
                <div
                    className="tab-pane fade show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">

                    <div className="row h341">
                        <div className="col-md-3 activity-icon text-center">
                            {activity1}
                        </div>
                        <div className="col-md-3 activity-icon text-center">
                        {activity2}
                            
                        </div>
                        <div className="col-md-3">
                            {activity3}
                        </div>
                        <div className="col-md-3">
                            {activity4}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 text-center time-slider-text">2:25 am</div>
                        <div className="col-md-3 text-center time-slider-text">10:00 am</div>
                        <div className="col-md-3 text-center time-slider-text">12:00 am</div>
                        <div className="col-md-3 text-center time-slider-text">2:00 pm</div>
                    </div>
                </div>
            </div>
            {/* <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                7hr
            </div>
            <div className="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                Tab 3 content
            </div> */}
        </div>
    );
}

export default Activity;