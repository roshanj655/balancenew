import React, { useState, useEffect } from 'react';
function Felt(props) {
    let moodsArray = [];
    useEffect(() => {
        updateMoodArray("month");
        settabMood("moodMonth");
      }, [props.selectedDate]);
    const [moodArray, setMoodArray] = useState([]);
    const updateMoodArray = (check) => {
        var date = new Date(props.selectedDate);
        var oneBeforeDay = date.getTime() - (1 * 24 * 60 * 60 * 1000);
        var weekBeforeDay = date.getTime() - (7 * 24 * 60 * 60 * 1000);
        var monthBeforeDay = date.getTime() - (30 * 24 * 60 * 60 * 1000);
        // var weekBeforeDay = week.getDate();
        // var monthBeforeDay = month.getDate();
        props.moods.forEach((element, index) => {
            let day = new Date(element.day).getTime();
            let currentDate = date.getTime();
            if (check == "day" && (day >= oneBeforeDay && day <= currentDate)) {
                moodsArray.push(element);
            }
            else if (check == "week" && (day >= weekBeforeDay && day <= currentDate)) {
                moodsArray.push(element);
            }
            else if (check == "month" && (day >= monthBeforeDay && day <= currentDate)) {
                moodsArray.push(element);
            }
            setMoodArray(moodsArray);
        });
    }


    let moods1 = moodArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours >= 0 && hours < 3) {
            return <div className=" activity-icon text-center"><img src={"assets/images/Moods/" + (item.type == 'Goofy' ? 'silly' : item.type) + ".png"} alt="image" /></div>
        }
        // }
    })
    let moods2 = moodsArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours > 3 && hours < 10) {
            return <div className=" activity-icon text-center"><img src={"assets/images/Moods/" + (item.type == 'Goofy' ? 'silly' : item.type) + ".png"} alt="image" /></div>
        }
    })
    let moods3 = moodsArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours > 10 && hours < 12) {
            return <div className=" activity-icon text-center"><img src={"assets/images/Moods/" + (item.type == 'Goofy' ? 'silly' : item.type) + ".png"} alt="image" /></div>
        }
    })
    let moods4 = moodArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
        if (hours > 12 && hours < 23) {
            return <div className=" activity-icon text-center"><img src={"assets/images/Moods/" + (item.type == 'Goofy' ? 'silly' : item.type) + ".png"} alt="image" /></div>
        }
    })
    const [tabMood, settabMood] = useState("moodDay");
    return (
        <div className="slept">
            <h4>Your Felt</h4>
            <ul className=" justify-content-end nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabMood == "moodDay") ? "active" : "")}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onLoad={() => {
                            updateMoodArray("day")
                            settabMood("moodDay")
                        }}
                        onClick={() => {
                            updateMoodArray("day")
                            settabMood("moodDay")

                        }
                        }
                    >Day</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabMood == "moodWeek") ? "active" : "")}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => {
                            updateMoodArray("week")
                            settabMood("moodWeek")
                        }}
                    >Week</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabMood == "moodMonth") ? "active" : "")}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => {
                            updateMoodArray("month")
                            settabMood("moodMonth")
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
                            {moods1}
                        </div>
                        <div className="col-md-3 activity-icon text-center">
                            {moods2}

                        </div>
                        <div className="col-md-3">
                            {moods3}
                        </div>
                        <div className="col-md-3">
                            {moods4}
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

export default Felt;