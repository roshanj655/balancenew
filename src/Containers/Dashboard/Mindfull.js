import React, { useState, useEffect } from 'react';
import { userService } from '../../Services/UserService';
function Mindfull(props) {
    const url = "http://zavius.in/balance/assets/images/";
    let mindsArray = [];
    useEffect(() => {
        updatemindArray("day");
        settabmind("mindDay");
      }, [props.selectedDate]);
    const [mindArray, setMindArray] = useState([]);
    const updatemindArray = (check) => {
        var date = new Date(props.selectedDate);
        
            if (check == "day") {
               userService.fetchMindfulnesses({'date':props.selectedDate}).then((data)=>{
                   setMindArray(data);
               })
            }
            else if (check == "week") {
                userService.fetchMindfulnessWeekGraph({'date':props.selectedDate}).then((data)=>{
                    setMindArray(data.mindfulnessWeekData);
                })
            }
        //     else if (check == "month" && (day >= monthBeforeDay && day <= currentDate)) {
        //         mindsArray.push(element);
        //     }
        //     setMindArray(mindsArray);
        // });
    }


    let minds1 = mindArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours >= 0 && hours < 3) {
            return <div className=" activity-icon text-center"><img src={url+"Mindfulness/" + (item.type == 'Cook/Bake' ? 'cook' : item.type=='Pet Time'?"playwithanimals": item.type.toLowerCase()) + ".png"} alt="image" /></div>
        }
        // }
    })
    let minds2 = mindsArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours > 3 && hours < 10) {
            return <div className=" activity-icon text-center"><img src={url+"Mindfulness/" + (item.type == 'Cook/Bake' ? 'cook' : item.type=='Pet Time'?"playwithanimals": item.type.toLowerCase()) + ".png"} alt="image" /></div>
        }
    })
    let minds3 = mindsArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours > 10 && hours < 12) {
            return <div className=" activity-icon text-center"><img src={url+"Mindfulness/" + (item.type == 'Cook/Bake' ? 'cook' : item.type=='Pet Time'?"playwithanimals": item.type.toLowerCase()) + ".png"} alt="image" /></div>
        }
    })
    let minds4 = mindArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours > 12 && hours < 23) {
            return <div className=" activity-icon text-center"><img src={url+"Mindfulness/" + (item.type == 'Cook/Bake' ? 'cook' : item.type=='Pet Time'?"playwithanimals": item.type.toLowerCase()) + ".png"} alt="image" /></div>
        }
    })
    const [tabmind, settabmind] = useState("mindDay");
    return (
        <div className="slept">
            <h4>You Mindfull Bonues</h4>
            <ul className=" justify-content-end nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabmind == "mindDay") ? "active" : "")}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onLoad={() => {
                            updatemindArray("day")
                            settabmind("mindDay")
                        }}
                        onClick={() => {
                            updatemindArray("day")
                            settabmind("mindDay")

                        }
                        }
                    >Day</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabmind == "mindWeek") ? "active" : "")}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => {
                            updatemindArray("week")
                            settabmind("mindWeek")
                        }}
                    >Week</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabmind == "mindMonth") ? "active" : "")}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => {
                            updatemindArray("month")
                            settabmind("mindMonth")
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
                        {!mindArray.length ?
                            <div
                                className="alert alert-danger"
                            >
                                No data found for this date
                                {/* <p className="add btn">+  Add Sleep</p> */}
                            </div>
                            : ""}
                    <div className="row h341">
                    
                        <div className="col-md-3 activity-icon text-center">
                            {minds1}
                        </div>
                        <div className="col-md-3 activity-icon text-center">
                            {minds2}

                        </div>
                        <div className="col-md-3">
                            {minds3}
                        </div>
                        <div className="col-md-3">
                            {minds4}
                        </div>


                    </div>

                    {mindArray.length ?
                    <div className="row">
                        <div className="col-md-3 text-center time-slider-text">2:25 am</div>
                        <div className="col-md-3 text-center time-slider-text">10:00 am</div>
                        <div className="col-md-3 text-center time-slider-text">12:00 am</div>
                        <div className="col-md-3 text-center time-slider-text">2:00 pm</div>
                    </div>
                    :""}
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

export default Mindfull;