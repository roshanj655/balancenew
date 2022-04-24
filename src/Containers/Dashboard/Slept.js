import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { userService } from '../../Services/UserService';
function Slept(props) {
    var sleepTimeVar = 0;
    let data = [];
    useEffect(() => {
        updatesleptArray("day");
        settabslept("sleptDay");
    }, [props.newChange]);
    useEffect(() => {
        updatesleptArray("day");
        settabslept("sleptDay");
    }, [props.selectedDate]);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [sleptArray, setsleptArray] = useState([]);
    const [sleeptime, sleeptimes] = useState(0);
    const [sleepData, setSleepData] = useState([]);
    const updatesleptArray = (check) => {
        setSleepData([]);
        var date = new Date(props.selectedDate);
        var oneBeforeDay = date.getTime() - (1 * 24 * 60 * 60 * 1000);
        var weekBeforeDay = date.getTime() - (7 * 24 * 60 * 60 * 1000);
        var monthBeforeDay = date.getTime() - (30 * 24 * 60 * 60 * 1000);
        
        // props.sleep.map((element, index) => {
        //     let day = new Date(element.day).getTime();
        //     let currentDate = date.getTime();
            if (check == "day") {
                userService.fetchSleeps({'date':props.selectedDate}).then((sleep)=>{
                    sleeptimes(sleep[0].hours)
                })
            }
            else if (check == "week") {
                userService.fetchSleepWeek({'date':props.selectedDate}).then((sleep)=>{
                    console.log("sleeeeep",sleep);
                    // sleeptimes(sleep[0].hours)
                })
            }
            // else if (check == "month" && (day >= monthBeforeDay && day <= currentDate)) {
            //     chartData(element); sleepTimeVar = parseFloat(sleepTimeVar) + parseFloat(element.hours);
            //     chartData(element);
            // }
        // });
        // sleeptimes(sleepTimeVar);
    }

    function chartData(element) {
        let day = new Date(element.day);
        let obj = {
            name: day.getDate() + " " + month[day.getUTCMonth()],
            time: element.hours
        }
        data.push(obj);
        setSleepData(data);
        console.log("slept", data);
    }

    const [tabslept, settabslept] = useState("sleptDay");
    var sleepsTime = sleeptime.toString().split('.');
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
                {sleeptime<=0 ?
                    <div
                        className="alert alert-danger"
                    >
                        No data found for this date
                        {/* <p className="add btn">+  Add Sleep</p> */}
                    </div>
                    :
                    <div
                        className="flexbox tab-pane fade show active"
                        id="ex1-tabs-1"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-1">
                        <h2 className="flex-item">{sleepsTime[0]}hr {sleepsTime[1] || 0}min</h2>
                        {/* <p className="add btn">+  Add Sleep</p> */}
                    </div>
                }
                {(tabslept == "sleptWeek" || tabslept == "sleptMonth") && sleeptime<=0 ?
                    <LineChart
                        width={385}
                        height={296}
                        data={sleepData}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="time"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                    : ""}


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