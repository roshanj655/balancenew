import React, { useState } from 'react';
function Slept(props) {
    var sleepTimeVar=0;
    const [sleptArray, setsleptArray] = useState([]);
    const [sleeptime, sleeptimes] = useState(0);
    const updatesleptArray = (check) => {
        var date = new Date(props.selectedDate);
        var oneBeforeDay = date.getTime() - (1 * 24 * 60 * 60 * 1000);
        var weekBeforeDay = date.getTime() - (7 * 24 * 60 * 60 * 1000);
        var monthBeforeDay = date.getTime() - (30 * 24 * 60 * 60 * 1000);
        // var weekBeforeDay = week.getDate();
        // var monthBeforeDay = month.getDate();
        props.sleep.forEach((element, index) => {
            let day = new Date(element.day).getTime();
            let currentDate = date.getTime();
            if (check == "day" && (day >= oneBeforeDay && day <= currentDate)) {
                sleepTimeVar=parseFloat(sleepTimeVar)+parseFloat(element.hours);
            }
            else if (check == "week" && (day >= weekBeforeDay && day <= currentDate)) {
                sleepTimeVar=parseFloat(sleepTimeVar)+parseFloat(element.hours);
            }
            else if (check == "month" && (day >= monthBeforeDay && day <= currentDate)) {
                sleepTimeVar=parseFloat(sleepTimeVar)+parseFloat(element.hours);
                
            }
        });
        sleeptimes(sleepTimeVar);
    }


    
    const [tabslept, settabslept] = useState("sleptDay");
    var sleepsTime=sleeptime.toString().split('.');
    return (
        <div className="slept">
            <h4>You Slept</h4>
            <ul className=" justify-content-end nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabslept == "sleptDay") ? "active" : "")}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onLoad={() => {
                            updatesleptArray("day")
                            settabslept("sleptDay")
                        }}
                        onClick={() => {
                            updatesleptArray("day")
                            settabslept("sleptDay")

                        }
                        }
                    >Day</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabslept == "sleptWeek") ? "active" : "")}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => {
                            updatesleptArray("week")
                            settabslept("sleptWeek")
                        }}
                    >Week</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabslept == "sleptMonth") ? "active" : "")}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => {
                            updatesleptArray("month")
                            settabslept("sleptMonth")
                        }}
                    >Month</a>
                </li>
            </ul>
            <div className="tab-content  h371" id="ex1-content">
                <div
                    className="flexbox tab-pane fade show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    <h2 className="flex-item">{sleepsTime[0]}hr {sleepsTime[1]||0}min</h2>
                    <p className="add btn">+  Add Sleep</p>
                </div>
                {/* <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                    7hr 
                </div>
                <div className="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                    Tab 3 content
                </div> */}
            </div>
        </div>
    );
}

export default Slept;